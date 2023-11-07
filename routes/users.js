const express = require('express');

const userController = require('../controllers/users');
const router = express.Router();

// Creating a task
router.post('/', userController.signUp);

module.exports = router;