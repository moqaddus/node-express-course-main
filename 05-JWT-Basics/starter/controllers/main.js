//check username,password in post request
//if it exist create new JSON Web Token(JWT) and
//send back to front-end

//npm install jsonwebtoken

//setup authenticationn
const jwt=require('jsonwebtoken')

const {BadRequest}=require('../errors')

const login=async(req,res)=>{
  const {username,password}=req.body
  //before issueing the token check if both are provided or not
  if(!username || !password)
  {
    throw new BadRequest('Please provide email and password')

  }
  const id=new Date().getDate()
  //jwt sign method
  //(only for demo) otherwise we should used long and complex strings
  const token=jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})
  //console.log(username,password);
  res.status(200).json({msg:'user created',token})
}

const dashboard=async(req,res)=>{
 
  console.log(req.user)
 const luckyNumber=Math.floor(Math.random()*100)
 res.status(200).json({msg:`Hello ${req.user.username}`,secret:`Here is your data your lucky number:${luckyNumber}`})

 }

module.exports={

  login,
  dashboard
}