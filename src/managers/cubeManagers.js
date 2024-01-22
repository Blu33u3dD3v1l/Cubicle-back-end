const cubes = [];

exports.getAll = (search, from, to) => {

       let result = cubes.slice();

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
exports.getOne = (cubeId) => cubes.find(x => x.id == cubeId);
    
exports.create = (cubeData) => {
            const newCube = {
                id: cubes.length + 1,
                ...cubeData,

            };
          
            cubes.push(newCube);

            return newCube;
};