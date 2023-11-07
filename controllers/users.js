const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

const User = require('../models/users');

const signUp = async (req, res, next) => {

    const errors = validationResult(req);
    const secret = process.env.SECRET_KEY;

    if(!errors.isEmpty()){
        const error = new HttpError('Please fill in the required fields', 422, false);
        return next(error);  
    }

    const { name, email, password, phone, isAdmin, } = req.body;
    
    let userExists; 
    try {
        userExists = await User.findOne({ email });
    } catch (err) {
        const error = new HttpError('Registration failed', 500, false);
        return next(error);
    }

    if(userExists){
        const error = new HttpError('User exists already, Please Login instead', 422, false);
        return next(error);
    }

    const createdUser = new User({ name, email, password, phone, isAdmin });

    try{
        await createdUser.save();
        const token = jwt.sign({ userId: createdUser._id }, secret, { expiresIn: '1d'} );
        res.status(201).json( {  user: createdUser.toObject({ getters: true }), token } );
    } catch (err) {
        const error = new HttpError('User Registeration Failed', 500, false);
        return next(error);
    }
}

exports.signUp = signUp;
