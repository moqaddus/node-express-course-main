//We made this new custom Error class so that we donot have to write the whole code of setting message and status everytime

class CustomAPIError extends Error{
  constructor(message,statusCode)
  {
    super(message)//constructor of parent being called(default Error).
    this.statusCode=statusCode

  }
}

//Now this function is used to create an instance of this error class
const createCustomError=(msg,statusCode)=>{
  return new CustomAPIError(msg,statusCode)
}

module.exports={createCustomError,CustomAPIError}