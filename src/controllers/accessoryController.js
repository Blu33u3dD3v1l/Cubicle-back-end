const  route  = require('./homeController');

const router = require('express').Router();


route.get('/create', (req, res) => {
        res.render('accessory/create');
});

module.exports = route;