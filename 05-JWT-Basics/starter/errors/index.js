const CustomAPIError=require('./custom-error')
const UnauthenticatedError=require('./unauthenticated')
const BadRequest=require('./bad-request')


module.exports={
  CustomAPIError,
  BadRequest,
  UnauthenticatedError
}