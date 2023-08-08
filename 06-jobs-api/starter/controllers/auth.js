const User=require('../models/User')
const {StatusCodes}=require('http-status-codes')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const { UnauthenticatedError,BadRequestError } = require('../errors')

const register=async(req,res)=>{
  //const {name,email,password}=req.body
  //making a temp user and with name and email same as above user 
  //but password including addittional bit string
  //const salt=await bcrypt.genSalt(10);//randombytes
  //const hashedPassword=await bcrypt.hash(password,salt)
  //const tempUser={name,email,password:hashedPassword}
  const user=await User.create({...req.body})
  const token=user.createJWT()
  res.status(StatusCodes.CREATED).json({user:{name:user.name},token})

}

const login=async(req,res)=>{
  const {email,password}=req.body
  if(!email || !password){
    throw new BadRequestError('Please provide both')
  }
  const user=await User.findOne({email})
  if(!user)
  {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const isCorrect=await user.comparePassword(password)
  if(!isCorrect)
  {
    throw new UnauthenticatedError('Invalid Credentials')
  }

  const token=user.createJWT();
  res.status(StatusCodes.OK).json({user:{name:user.name},token})
}

module.exports={
  register,
  login
}