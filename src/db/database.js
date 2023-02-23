
import mongoose from "mongoose";
import  dotenv from 'dotenv' 
dotenv.config()
const database_connect=async()=>{
    try {
        mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.DATABASE,{useNewUrlparser:true,useUnifiedTopology:true})
        console.log("connected sussfuly to BackendDB");
    }
    catch(error){
        // console.log(error.message);
        console.log("not connected");
    }
} 

export default database_connect;