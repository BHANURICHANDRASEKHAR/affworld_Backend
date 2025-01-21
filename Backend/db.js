import mongoose from "mongoose";
import  { configDotenv } from 'dotenv';
configDotenv();
const MongooDB=()=>{
    try{
       mongoose.connect(process.env.MONGO_DB_LINK)
        .then(()=>{console.log("MongoDb connected")});
    
    }
    catch(err){
        console.log(err.message);
    }
}
export default MongooDB;