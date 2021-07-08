const express = require('express');
const Task = require('../models/task');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();

// Add new task
router.post('/tasks', auth, async (req, res) => {

    // Create new task
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });

    try {

        // Save task
        await task.save();

        // Set the status and send response
        res.status(201).send(task);

    } catch (error) {
        res.status(400).send(error);
    }
})

// Get all tasks of current user
router.get('/tasks', auth, async (req, res) => {

    // Create objects
    const match = {};
    const sort = {}

    // Check the completed field
    if (req.query.completed) {
        match.completed = req.query.completed === 'true';
    }

    // Fill the sort obj
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    try {

        // Populating data
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate();

        // Send the response
        res.send(req.user.tasks);
    } catch (e) {
        res.status(500).send(e);
    }
})

// Get a specific task
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {

        // Find task
        const task = await Task.findOne({ _id, owner: req.user._id })

        // Validate task
        if (!task) {
            return res.status(404).send();
        }

        // Send the response
        res.send(task);

    } catch (e) {
        res.status(500).send(e);
    }
})

// Update the specific task
router.patch('/tasks/:id', auth, async (req, res) => {

    // Update fields
    const updates = Object.keys(req.body);

    // Fields allowed to update
    const allowedUpdates = ['description', 'completed'];

    // Validating operation
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    // Send error
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {

        // Find task 
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

        // Send 404 status
        if (!task) {
            return res.status(404).send();
        }

        // Update the fields
        updates.forEach(update => task[update] = req.body[update]);

        // Save a task
        await task.save();

        // Send a response
        res.send(task)

    } catch (e) {
        res.status(400).send(e);
    }
})

// Delete a specific task
router.delete('/tasks/:id', auth, async (req, res) => {

    try {

        // Find task
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

        // Validate task
        if (!task) {
            return res.status(404).send();
        }

        // Send the response
        res.send(task);
        
    } catch (e) {
        res.status(500).send();
    }
})

module.exports = router;