const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const userScheme = new mongoose.Schema({
         username: String,
         password: {
            type: String,
         },
               
});


userScheme.virtual('repeatPassword')
.set(function(value){
     if(value !== this.password){
        throw new mongoose.MongooseError('Password missmach');
     }
})

userScheme.pre('save', async function() {
     const hash = await bcrypt.hash(this.password, 10);

     this.password = hash;

});


const User = mongoose.model('User', userScheme);

module.exports = User;
