import express from 'express';
import routes from './routes/index.js';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

// Configuring the access of environment variables
dotenv.config();

// Instantialization of express app
const app = express();

// Parsing to incoming request to json
app.use(express.json());
app.use("/api", routes);

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