const router = require('express').Router();


const cubeManager = require('../managers/cubeManagers');
const accessoryManager = require('../managers/accessoryManager');

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
   const cube = await cubeManager.getCubeWithAccessories(req.params.cubeId).lean();
         res.render('details', { cube });
});

router.get('/:cubeId/attach-accessory',  async (req, res) => {
   const cube = await cubeManager.getOne(req.params.cubeId).lean();
   const accessories = await accessoryManager.getRest(cube.accessories).lean();

   const hasAccessories = accessories.length > 0;
         res.render('accessory/attach', { cube, accessories, hasAccessories });
});

router.post('/:cubeId/attach-accessory',  async (req, res) => {
   const { accessory: accessoryId } = req.body;
   const cubeId = req.params.cubeId;

   await cubeManager.attachAccessory(cubeId, accessoryId);

   res.redirect(`/cubes/${cubeId}/details`);

});

router.get('/:cubeId/delete', async (req, res) => {
   const cube = await cubeManager.getOne(req.params.cubeId).lean();
   res.render('cube/delete', { cube });
});

router.get('/:cubeId/edit', async (req, res) => {
   const cube = await cubeManager.getOne(req.params.cubeId).lean();

   res.render('cube/edit', { cube });
});

router.post('/:cubeId/delete', async (req, res) => {
   await cubeManager.delete(req.params.cubeId);   
  
   res.redirect('/');
});

router.post('/:cubeId/edit', async (req, res) => {
   const cubeData = req.body;

   await cubeManager.update(req.params.cubeId, cubeData);   
  
   res.redirect(`/cubes/${req.params.cubeId}/details`);
});

module.exports = router;