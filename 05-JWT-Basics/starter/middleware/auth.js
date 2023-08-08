//Middleware for authentication(as it can be used by multiple routes)
const jwt=require('jsonwebtoken')

const {UnauthenticatedError}=require('../errors')


const authenticationMiddleware=async(req,res,next)=>{
   //getting the token
   const authHeader=req.headers.authorization;
   //IS TOKEN VALID??
   if(!authHeader || !authHeader.startsWith('Bearer '))
   {
     throw new UnauthenticatedError('No token provided')
   }
   const token=authHeader.split(' ')[1]
   //VERIFICATION
   try {

    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    const {id,username}=decoded
    req.user={id,username}
    next()
   
  } catch (error) {
    throw new UnauthenticatedError('Not authorized to access this route')
    
  }

}

module.exports=authenticationMiddleware