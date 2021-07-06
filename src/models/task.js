const mongoose = require('mongoose');
const validator = require('validator');

// Create task schema
const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

// Create task model with using schema
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;