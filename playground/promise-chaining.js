require('../src/db/mongoose');
const User = require('../src/models/user');

// 60a55abcd352d70c603e34d6

// User.findByIdAndUpdate('60a557d45a043833c097c65b', { age: 1 }).then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 1 });
// }).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e);
// });

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ age });

    return count;
}

updateAgeAndCount('60a557d45a043833c097c65b', 2).then(count => {
    console.log(count);
}).catch(e => {
    console.log(e);
})