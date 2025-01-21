import express from 'express';
import middleware_function from './middleware.js'
import Task from '../Database_Models/Task.js';
const app = express.Router();
//middleware_function is used to check the user token whether user is logged in or not
export default app.post('/post',middleware_function,async(req,res)=>{
     const {TaskName,Description}=req.body.task
     try{
         const task=new Task({
             TaskName,
             Description,
             userId:req.user.user._id
         })
         await task.save()
         res.status(201).send({msg:'Task added successfully',status:true})
     }
     catch(e)
         {
            console.log(e.message)
            res.status(500).send({msg:'Task failed',status:false})
         }
})
//this is for get tasks route
app.get('/get',middleware_function,async(req,res)=>{
    try{
        const tasks=await Task.find({userId:req.user.user._id})
        res.send({data:tasks,status:true})
    }
    catch(e)
        {
            console.log(e.message)
            res.status(500).send({msg:'Failed to fetch tasks',status:false})
        }
});
app.post('/update',middleware_function,async(req,res)=>{
    const {task,UpdatedStatus}=req.body;
    try{
        const tasks=await Task.updateOne({userId:req.user.user._id,_id:task._id},{$set:{status:UpdatedStatus}})
        res.send({data:tasks,status:true})
    }
    catch(e)
        {
            console.log(e.message)
            res.status(500).send({msg:'Failed to fetch tasks',status:false})
        }
});
app.post('/delete',middleware_function,async(req,res)=>{
    const {task_id}=req.body;
    try{
        const tasks=await Task.deleteOne({userId:req.user.user._id,_id:task_id})
        res.send({msg:'Task deleted successfully',status:true})
    }
    catch(e)
    {
        console.log(e.message)
        res.status(500).send({msg:'Failed to delete task',status:false})
    }
});