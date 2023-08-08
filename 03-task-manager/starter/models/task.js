const mongoose=require('mongoose');


//Setting the schema
const TaskSchema=new mongoose.Schema({
  name:{
    type:String,
    required:[true,'must provide name'],
    trim:true,
    maxlength:[20,'name too large']
  },
  completed:{
    type:Boolean,
    default:false
  }
})

module.exports=mongoose.model('Task',TaskSchema)