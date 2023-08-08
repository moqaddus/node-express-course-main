const Task=require('../models/task')
const asyncWrapper=require('../middleware/async')
const {createCustomError}=require('../errors/customError')


const getAllTasks=asyncWrapper( async (req,res)=>{

    //writing the find with empty returns all the tasks
    const tasks=await Task.find({})
    res.status(200).json({tasks})
    //res.status(200).json({tasks,amount:tasks.length})
    //res.status(200).json({status:"success",data:{tasks,nbHits:tasks.length}})

})

const createTask=asyncWrapper( async(req,res) => {


    const task=await Task.create( req.body )
    res.status(201).json({task})

})


const getTask=asyncWrapper( async(req,res,next)=>{
 
    const{id:taskID}=req.params
    const task=await Task.findOne({_id:taskID});
    if(!task){
      return next(createCustomError(`No task with id ${taskID}`,404)) //Here the function of custom error class is called is passes msg and statuscode..It create an instance of Error class
      //const error=new Error('Not Found')//This is to use the builtin Error class . error is the instance of class 
      //error.status=404
      //return next(error) ...we are using our own middleware now i.e ErrorHandleMiddleware instead of the default middleware
      //this return is necessary
    }
    res.status(200).json({task})
})

const updateTask=asyncWrapper( async (req,res)=>{
  
    const {id:taskID}=req.params;
    const foundTask=await Task.findOneAndUpdate({_id:taskID},req.body,{new:true,runValidators:true})
    if(!foundTask)
    {
      return next(createCustomError(`No task with id ${taskID}`,404))
      //return res.status(404).json({msg:`No task with id ${taskID}`})
    }
    res.status(200).json({foundTask})
    
})

const deleteTask=asyncWrapper( async (req,res)=>{

    const {id:taskID}=req.params;
    const task=await Task.findOneAndDelete({_id:taskID})
    if(!task)
    {
      return next(createCustomError(`No task with id ${taskID}`,404))
      
      //return res.status(404).json({msg:`No task with id ${taskID}`})
    }
    res.status(200).json({task})

})


/*
const createTask=async(req,res) => {
  try {

    const task=await Task.create( req.body )
   res.status(201).json({task})
    
  } catch (error) {
    res.status(500).json({msg:error})
  }

}

const getTask= async(req,res)=>{
  try {
    
    const{id:taskID}=req.params
    const task=await Task.findOne({_id:taskID});
    res.status(200).json({task})
    if(!task){
      //this return is necessary
      return res.status(404).json({msg:`No task with id ${taskID}`})
    }
  } catch (error) {
    res.status(500).json({msg:error})
  }
}

const updateTask=async (req,res)=>{
  try {
    const {id:taskID}=req.params;
    const foundTask=await Task.findOneAndUpdate({_id:taskID},req.body,{new:true,runValidators:true})
    if(!foundTask)
    {
      return res.status(404).json({msg:`No task with id ${taskID}`})
    }
    res.status(200).json({foundTask})
    
  } catch (error) {
    res.status(500).json({msg:error})
  }
}




const deleteTask=async (req,res)=>{
  try {

    const {id:taskID}=req.params;
    const task=await Task.findOneAndDelete({_id:taskID})
    if(!task)
    {
      return res.status(404).json({msg:`No task with id ${taskID}`})
    }
    res.status(200).json({task})
  } catch (error) {
    res.status(500).json({msg:error})
  }

}
*/

module.exports={
  getAllTasks,
  deleteTask,
  updateTask,
  getTask,
  createTask
}
