const Cube = require('../models/Cube');

const cubes = [];

exports.getAll = async (search, from, to) => {

       let result = await Cube.find().lean();

       if(search){
            result = result.filter(cube => cube.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
       }

       if(from){
             result = result.filter(cube => cube.difficultyLevel >= Number(from));
       }
       
       if(to){
        result = result.filter(cube => cube.difficultyLevel <= Number(to));
  }
       return result;
};
exports.getOne = (cubeId) => Cube.findById(cubeId).lean();
exports.getCubeWithAccessories = (cubeId) => this.getOne(cubeId).populate('accessories');
    
exports.create = async (cubeData) => {
             
        const cube = new Cube(cubeData);
        await cube.save();
     
        return cube;
};

exports.delete = (cubeId) => Cube.findByIdAndDelete(cubeId);
exports.update = (cubeId, cubeData) => Cube.findByIdAndUpdate(cubeId, cubeData);

exports.attachAccessory = async (cubeId, accessoryId) => {
      const cube = await Cube.findById(cubeId);
      cube.accessories.push(accessoryId);

      return cube.save();
};