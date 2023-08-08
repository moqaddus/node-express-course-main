const {CustomAPIError}=require('../errors/customError')
//Here we need the class and not the function,as we need to check that the recieved message is instance of this class or not
//if it is the instance of class then it means its the 404 error i.e when the item was not found

const errorHandlerMiddleware=(err,req,res,next)=>{
  if(err instanceof CustomAPIError)
  {
    return res.status(err.statusCode).json({msg:err.message})
  }
  return res.status(500).json({msg:'Something went wrong,try again...'})//whats written in err can be changed(You can write your own error msg)
}

module.exports=errorHandlerMiddleware