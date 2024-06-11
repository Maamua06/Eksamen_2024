const {Router} = require('express');

// Controller functions
const {loginUser, signupUser} = require('../controller/userController');

const router = Router();

router.post('/sign-up', signupUser);

router.post('/sign-in', loginUser);

module.exports = router;