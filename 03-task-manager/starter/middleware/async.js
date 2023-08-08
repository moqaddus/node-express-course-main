
//taking the controller as argument
const asyncWrapper=(func)=>{
  return async (req,res,next)=>{
    try {
      await func(req,res,next)
    } catch (error) {//here the error is catched and sent to next middleware(next is not present yet)
      next(error)
    }
  }
}

module.exports=asyncWrapper
