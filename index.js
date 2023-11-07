const express = require('express');
const morgan = require('morgan');
const HttpError = require('./models/http-error'); 

// Route Imports
const courseRoute = require('./routes/courses');
const usersRoute = require('./routes/users');

// Middleware Imports
const authJwt = require('./middlewares/jwt');
const errorHandler = require('./middlewares/requireAuth');

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

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
    console.log(`The port is up on port: ${PORT}`);
})