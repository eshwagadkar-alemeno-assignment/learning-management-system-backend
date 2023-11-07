const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');

const User = require('../models/users');

const signUp = async (req, res, next) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const error = new HttpError('Please fill in the required fields', 422, false);
        return next(error);  
    }
    
}

exports.signUp = signUp;
