import mongoose from "mongoose";
const dbname=process.env.DbName||"urlApi";

const connectDb= async()=>{
 try {
          let connectionInstance=await mongoose.connect(`${process.env.mongoDbUrl}/${dbname}`);
          console.log(`database is connected at ${connectionInstance.connection.host}`);
 } catch (error) {
            console.log(`error  at data base :${error}`);
            
 }
       
}

export{connectDb};