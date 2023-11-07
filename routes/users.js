const express = require('express');

const userController = require('../controllers/users');
const router = express.Router();

// Creating a route
router.post('/register', userController.signUp);

module.exports = router;