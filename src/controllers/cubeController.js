const router = require('express').Router();


const cubeManager = require('../managers/cubeManagers');

router.get('/create', (req, res) => {
    console.log(cubeManager.getAll());
    res.render('create');
});

router.post('/create', async (req, res) => {
     const{
        name,
        description,
        imageUrl,
        difficultyLevel
     } = req.body;

    await cubeManager.create({
        name,
        description,
        imageUrl,
        difficultyLevel: Number(difficultyLevel),
     });
     
     res.redirect('/');
});

router.get('/:cubeId/details', async (req, res) => {
   const cube = await cubeManager.getOne(req.params.cubeId).lean();
         res.render('details', { cube });
});

module.exports = router;