const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Create async middleware
const auth = async (req, res, next) => {
    try {
        // Get authorization token from header
        const token = req.header('Authorization').replace('Bearer ', '');

        // Decode the token with secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Parse the document to find the user with that token
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        // Validate data
        if (!user) {
            throw new Error();
        }

        // Set the request parameters
        req.token = token;
        req.user = user;

        // Continue the execution
        next();

    } catch (e) {

        console.log(e);

        // Change response status
        res.status(401).send({ error: 'Please authenticate.' });
    }
}

module.exports = auth;