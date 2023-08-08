

const express=require('express');
const app=express();
const tasks=require('./routes/tasks')
const connectDB=require('./db/connect')
require('dotenv').config()

//importing notFound function(for 404 status)
const notFound=require('./middleware/notFound')
const errorHandlerMiddleware=require('./middleware/errorHandler')
//get,post,delete,update(patch),get for single

//middleware
app.use(express.static('./public'))////////
app.use(express.json())
//Custom notfound
//app.use(notFound)

app.use(errorHandlerMiddleware)


app.use('/api/v1/tasks',tasks)


const port=3000;

const start=async()=>{
  try{
    //connecting to database,passing the connection string 
    await connectDB(process.env.MONGO_URI)
    app.listen(port,console.log(`server is listening on port ${port}...`));

  } catch(error){
    console.log(error);
  }
}

start()


