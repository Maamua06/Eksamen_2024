const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Create token
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'});
}

// login the user
const loginUser = async function(req, res) {
    const {username, password} = req.body

    try {
        const user = await User.login(username, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({username, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

// signup the user
const signupUser = async (req, res) => {
    const {username, password} = req.body

    try {
        const user = await User.signup(username, password)

        // create a token 
        const token = createToken(user._id)

        res.status(200).json({ username, token})
    } catch (error) {
        res.status(400).json({ error: error.message})
    }
};

module.exports = {
    loginUser,
    signupUser
}