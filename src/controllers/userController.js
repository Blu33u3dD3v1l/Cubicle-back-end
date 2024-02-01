const router = require('express').Router();

const userManager = require('../managers/userManager');

router.get('/login', (req, res) => {
    res.render('users/login');
});


router.post('/login', async (req, res) => {
    const {username, password} = req.body;

   const user = await userManager.login(username, password);

   console.log(user);

   res.cookie('username', user.username);

   const token = await userManager.login(username, password);

   console.log(token);

   res.redirect('/');
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

router.get('/edit', (req, res) => {
    res.render('/users/edit');
});


module.exports = router;