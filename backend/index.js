// const express  = require('express') 
import express from 'express'
import dotenv from "dotenv"
import connectDB from './config/database.js';
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from 'cookie-parser';
dotenv.config({});

const app=express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user",userRoute);
app.use("/api/v1/message",messageRoute);

// connect db first then start server
const startServer = async () => {
    try {
        await connectDB()
        app.listen(PORT, "0.0.0.0",() => {
            console.log(` Server running on port ${PORT}`)
        })
    } catch (error) {
        console.error(" MongoDB connection failed:", error)
        process.exit(1)
    }
}

startServer()