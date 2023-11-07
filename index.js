const express = require('express');
const morgan = require('morgan');
const HttpError = require('./models/http-error'); 

// Route Imports
const courseRoute = require('./routes/courses');
const usersRoute = require('./routes/users');

// Middleware Imports
const authJwt = require('./middlewares/jwt');

const app = express();

require('dotenv').config(); 

const connectDB = require('./mongo-connect');
connectDB();

const api = process.env.API_URL;
const PORT = process.env.PORT;

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////       Middleware Section             //////////////////


// Express Middleware to parse/handle incoming and outgoing requests
app.use(express.json());

// Middleware to log api request made from frontend
app.use(morgan('tiny'));

// Middleware to generate JWT
app.use(authJwt());

// Registering the imported routes as a middleware
app.use(`${api}/course`, courseRoute);

// Registering the imported routes as a middleware
app.use(`${api}/users`, usersRoute);

// Middleeware that handles unsupported routes
app.use((error, res, next) => {
    const err = new HttpError('Could not find this route', 404, false );
    throw err;
})

// Middleware for error handling
app.use((err, req, res, next) => {

    // JWT Authentication Error
    if(err.name === 'UnauthorizedError'){
        return res.status(500).json({ message: 'The user is not authorized', success: false });
    }

     // Validation Error
    if(err.name === 'ValidationError'){
       return res.status(401).json({ message: err, success: false })
    }

    if(res.headerSent){
        return next(err);
    }

    // Default to General: 500 Server Error
     return res.status(err.code || 500).json({ message: err.message || 'An unknown error occurred!', success: err.success });

})

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
    console.log(`The port is up on port: ${PORT}`);
})