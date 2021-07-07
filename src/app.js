const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

// Create application instance
const app = express();

// Parse incoming JSON request
app.use(express.json());

// User users routers
app.use(userRouter);

// User tasks routers
app.use(taskRouter);

module.exports = app;