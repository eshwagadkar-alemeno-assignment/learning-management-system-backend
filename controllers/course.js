const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

// Import Custom Error Model
const HttpError = require('../models/http-error'); 

// Import Models
const Course = require('../models/course');

// Create a Course
const createCourse = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const error = new HttpError('Please fill in the required fields', 422, false);
        return next(error);  
    }

    const { name, instructor, description, enrollmentStatus, thumbnail, duration, schedule, location, prerequisites, syllabus, students, creator } = req.body;

}

exports.createCourse = createCourse;

