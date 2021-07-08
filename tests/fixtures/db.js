const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

// Create new ID for userOne
const userOneId = new mongoose.Types.ObjectId()

// Create userOne
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: '56what!!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

// Create new ID for userTwo
const userTwoId = new mongoose.Types.ObjectId()

// Create userTwo
const userTwo = {
    _id: userTwoId,
    name: 'Jess',
    email: 'jess@example.com',
    password: 'myhouse099@@',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
}

// Create a wrong user one
const wrongUserOne = {
    name: {},
    email: 'unexistingemail',
    password: '123f'
}

// Create first task
const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'First task',
    completed: false,
    owner: userOne._id
}

// Create second task
const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Second task',
    completed: true,
    owner: userOne._id
}

// Create third task
const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Third task',
    completed: true,
    owner: userTwo._id
}

// Create fourth task
const wrongTask = {
    description: [],
    completed: 42,
    owner: userOne._id
}

const setupDatabase = async () => {

    // Delete all users
    await User.deleteMany()
    await Task.deleteMany()
    
    // Add new users
    await new User(userOne).save()
    await new User(userTwo).save()

    // Add new tasks
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    wrongUserOne,
    wrongTask,
    setupDatabase
}