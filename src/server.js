import express from 'express';
import routes from './routes/index.js';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import ApplicationError from './utlils/Errors/ApplicationError.js';

// Configuring the access of environment variables
dotenv.config();

// Instantialization of express app
const app = express();


// ---------SERVER MIDDLEWARES-----------

// Parsing to incoming request to json
app.use(express.json());

app.use("/api", routes);

// All 404 errors
app.all('*', (req, res, next)=>{
    const error = new ApplicationError(404, "Route not found");
    next(error);
})

// Capture all errors thrown
app.use((err, req, res, next)=>{
    const status = err.status || 500;
    const response = {
        status,
        error: err.message,
    };
    //Add stack trace when it is server error
    if(status === 500) {
        response.stack = err.stack;
        console.error(err);
    }

    res.status(status).json(response);
})

// --------------------------------------

// Database connection
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on("error", (error)=>{
    console.error(error);
});
db.once("connected", ()=>{
    console.log("Database connected . . .");
});
const port = process.env.PORT || 8080
app.listen(port, ()=>{
    console.log(`${process.env.APP_NAME} Server running on port ${port}  . . .`);
});