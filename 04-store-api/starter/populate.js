require('dotenv').config()

const connectDB=require('./db/connect')

const Product=require('./models/product')

const jsonProducts=require('./products.json')//list of products

//setup a staart function
//connecting the database
//adding the model objects using models to database

//no nodemon 
//we use the file
const start=async ()=>{
  try {
    await connectDB(process.env.MONGO_URI)
    await Product.deleteMany();//deleting first and then
    await Product.create(jsonProducts)//adding products dynamically
    console.log('Success')
    process.exit(0)//exiting to close the file populate as we do not need it as all the data has been added
  } catch (error) {
    console.log(error)
  }
}

start()