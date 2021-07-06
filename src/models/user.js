const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

// Create user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        trim: true,

        // Validate the password
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('You can\'t use a word "password" in your password');
            }
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,

        // Validate the email
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    age: {
        type: Number,
        default: 0,

        // Validate the age
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    },

    // Array for auth tokens
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],

    // User avatar
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
});

// Configurate relationship between tasks and users
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

// Sanitize the data for response
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject()

    // Delete excess user data
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject;
}

// Create a methos for generating auth token
userSchema.methods.generateAuthToken = async function () {
    const user = this;

    // Signing a token
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

    // Update the tokens array with new token
    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
}

// Create new method to find the user by his credentials 
userSchema.statics.findByCredentials = async (email, password) => {

    // Find the user by the email
    const user = await User.findOne({ email });

    // Validate user
    if (!user) {
        throw new Error('Unable to login');
    }

    // Matching the request password with password in the database 
    const isMatch = await bcrypt.compare(password, user.password);

    // Validate the match
    if (!isMatch) {
        throw new Error('Unable to login');
    }

    return user;
}

// Hash the plain text password
userSchema.pre('save', async function (next) {
    const user = this;

    // Update user password if it was podified
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
})

// Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user = this;
    await Task.deleteMany({ owner: user._id })
    next()
})

// Create task model using schema
const User = mongoose.model('User', userSchema);

module.exports = User;