const router = require('express').Router();

const userManager = require('../managers/userManager');

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async (req, res) => {
      const {username, password, repeatPassword} = req.body;

      await userManager.register({ username, password, repeatPassword });

      console.log(req.body);

      res.redirect('/users/login');
});



module.exports = router;