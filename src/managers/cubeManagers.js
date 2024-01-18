const cubes = [

{
    id: '1nfdfdkf33gfdg55gkj',
    name: 'Mirror Cube',
    imageUrl: 'https://media.istockphoto.com/id/473622694/photo/rubiks-cube.jpg?s=612x612&w=0&k=20&c=jG8vgbrd8jsLPYwzNTgoALf86E20dbTBC30S77QjyhY=',
    description: "This is the best cube!",
    difficultyLevel: 4,


}

];

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