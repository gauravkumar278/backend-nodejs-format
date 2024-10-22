const express = require('express');
const router = express.Router();

const userValidator = require('./validators/user.validation');
const userController = require('./controllers/userController');

router.post('/signup', userValidator.createUser, userController.createUser);

module.exports = router;