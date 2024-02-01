const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');



const userScheme = new mongoose.Schema({
         username: {
           type: String,
           require: true,
           minLength: 5,
           match: /^[A-Za-z0-9]+$/,
           unique: true,

         },

         password: {
            type: String,
            require: true,
            minLength: 8,
            match: /^[A-Za-z0-9]+$/,

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
