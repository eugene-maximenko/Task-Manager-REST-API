const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/user');
const auth = require('../middleware/auth');
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account');
const router = new express.Router();

// Sign up new user
router.post('/users', async (req, res) => {

    // Create new user
    const user = new User(req.body);

    try {

        // Save user
        await user.save();
        console.log(user.email, user.name)

        // Send welcome email
        sendWelcomeEmail(user.email, user.name);

        // Generate and add to user document new auth token
        const token = await user.generateAuthToken();

        // Send status and response
        res.status(201).send({ user, token });

    } catch (e) {
        res.status(400).send(e);
    }

})

// Login existing user
router.post('/users/login', async (req, res) => {
    try {

        // Find user
        const user = await User.findByCredentials(req.body.email, req.body.password);

        // Generate and add to user document new auth token
        const token = await user.generateAuthToken();

        // Send response
        res.send({ user, token });
    } catch (e) {
        res.status(400).send();
    }
})

// Logout current user
router.post('/users/logout', auth, async (req, res) => {
    try {

        // Remove current token from user's document
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token;
        })

        // Save user
        await req.user.save();

        // Send response
        res.send();

    } catch (e) {
        res.status(500).send();
    }
})

// Close all sessions for current user
router.post('/users/logoutAll', auth, async (req, res) => {
    try {

        // Replace authentication tokens array in user document
        req.user.tokens = [];
        await req.user.save();

        // Send response
        res.send()

    } catch (e) {
        res.status(500).send(e);
    }
})

// Get current user profile
router.get('/users/me', auth, async (req, res) => {

    // Send response
    res.send(req.user);
})

// Update current user profile
router.patch('/users/me', auth, async (req, res) => {

    // Get requet body
    const updates = Object.keys(req.body);

    // Document fileds allowed to update
    const allowedUpdates = ['name', 'email', 'password', 'age'];

    // Check if every field is allowed
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    // Validate the fields to update
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {

        // Update the fields
        updates.forEach(update => req.user[update] = req.body[update]);

        // Save user
        await req.user.save();

        // Send response
        res.send(req.user);

    } catch (e) {
        res.status(400).send(e);
    }
})

// Delete current user
router.delete('/users/me', auth, async (req, res) => {
    try {

        // Remove user 
        await req.user.remove();

        // Send cancelation email
        sendCancelationEmail(req.user.email, req.user.name);

        // Send response
        res.send(req.user);
    } catch (e) {
        res.status(500).send();
    }
})

// Configurate multer
const upload = multer({

    // Size limit
    limits: {
        fileSize: 1000000
    },

    // Filtering uploaded file
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'));
        }

        cb(undefined, true);
    }
});

// Pose avatar
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    
    // Format avatar
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();

    // Updating the avatar filed
    req.user.avatar = buffer;
    await req.user.save();

    // Send response
    res.send();

}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});

// Delete avatar
router.delete('/users/me/avatar', auth, async (req, res) => {

    // Delete the avatar value
    req.user.avatar = undefined;
    await req.user.save();

    // Send response
    res.send();
})

// Get the avatar
router.get('/users/:id/avatar', async (req, res) => {
    try {

        // Find user 
        const user = await User.findById(req.params.id);

        // Validate data
        if (!user || !user.avatar) {
            throw new Error()
        }

        // Set response content type
        res.set('Content-Type', 'image/png');

        // Send response
        res.send(user.avatar)

    } catch (e) {
        res.status(404).send();
    }
})

module.exports = router;

