require('../src/db/mongoose');
const Task = require('../src/models/task');
const User = require('../src/models/user');

// Task.findByIdAndDelete('60aaae31729372086451586b').then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
// }).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e);
// })

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({ completed: false });
    
    return count;
}

deleteTaskAndCount('60a55bffe41a992958f4b4ad').then(count => {
    console.log(count);
}).catch(e => {
    console.log(e);
})