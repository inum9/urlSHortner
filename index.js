import express from "express";
import { app } from "./app.js";
import dotenv from "dotenv";
import { connectDb } from "./dataBase.js";


dotenv.config({
    path:"./.env"
})
const port=process.env.PORT||3000;

// return the promise 
 connectDb().then(
    ()=>{
        app.listen(port,()=>{
            console.log(`server is running on : ${port}`);
            
        })
    }
 )
