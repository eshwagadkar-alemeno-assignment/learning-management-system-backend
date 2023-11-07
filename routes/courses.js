const express = require('express');

const courseController = require('../controllers/course');
const router = express.Router();

// Creating a task
router.post('/', courseController.createCourse);

module.exports = router;