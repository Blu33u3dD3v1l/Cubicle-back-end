const router = require('express').Router();

router.get('/login', (req, res) => {
    res.render('login/loginPage');
});

router.get('/register', (req, res) => {
    res.render('login/registerPage');
});



module.exports = router;