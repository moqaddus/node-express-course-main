
//Here we setting the schema
const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
  //These are the properties of schema
  name:{
    type:String,
    required:[true,'product name must be provided']

  },
  price:
  {
    type:Number,
    required:[true,'product proce must be provided']
  },
  featured:{
    type:Boolean,
    default:false,
  },
  rating:{
    type:Number,
    default:4.5
  },
  createdAt:{
    type:Date,
    default:Date.now()
  },
  company:{
    type:String,
    enum:{
      values:['ikea','liddy','caressa','marcos'],
      message:'{VALUE} is not supported'
    }
    //enum:['ikea','liddy','caressa','marcos'],//So the values can only from among these
  },
})

module.exports=mongoose.model('Product',productSchema)