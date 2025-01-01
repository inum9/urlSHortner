import express from "express";  
import  {route} from"./src/route/userRoute.js"
const app=express();

// using the middleware 
app.use(express.json());


app.use("/api/v1/short",route);

export {app};