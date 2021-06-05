const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const app = express();
const port = process.env.port || 3000;

// app.use((req, res, next) => {
//     if (req.method === "GET") {
//         res.send('GET requests are disabled');
//     } else {
//         next();
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('The site is under maintenance, please try back soon.');
// }) 

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});


const main = async () => {
    // const task = await Task.findById('60bb0d2326944e161402be74');
    // await task.populate('owner').execPopulate();
    // console.log(task.owner);

    const user = await User.findById('60bb0d0526944e161402be72');
    await user.populate('tasks').execPopulate();
    console.log(user.tasks);
}

main();