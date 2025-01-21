import express from 'express';
import middleware_function from './middleware.js'
import Feeds from '../Database_Models/Feeds.js';
const app = express.Router();
//middleware_function is used to check the user token whether user is logged in or not
export default app.post('/post',middleware_function,async(req,res)=>{
   
     const {caption,ImageLink}=req.body
     try{
         const New_Feed=new Feeds({
            caption,
            Img:ImageLink,
             userId:req.user.user._id
         })
         await New_Feed.save()
         res.status(201).send({msg:'Task added successfully',status:true})
     }
     catch(e)
         {
            console.log(e.message)
            res.status(500).send({msg:'Task failed',status:false})
         }
})
app.get('/get',async(req,res)=>{
    try{
        const Feed= await Feeds.find()
        res.send({data:Feed,status:true})
    }
    catch(e)
        {
            console.log(e.message)
            res.status(500).send({msg:'Failed to fetch tasks',status:false})
        }
});
