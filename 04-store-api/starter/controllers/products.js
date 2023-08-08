//getting the model
const Product=require('../models/product')

//SEARCH:
//name='ab'
//{$regex:,$options:}
//whats option in it??


//SORT
//?sort=name,-price
//.sort

//SEEING CUSTOM FIELDS
//?fields=yaatiyaatiyaa
//.select

//&

//.limit
//getting desired number of records only

//.skip
//skipping the first n records

//GREATER THAN
//price:{$gt:}


const getAllProductsStatic=async (req,res)=>{
  //const search='oo'
  const products=await Product.find({price:{$gt:60}
    //finding the pattern,will get products that have ab atleast once
    //name:{$regex:search,$options:'i'}

  }).sort('-name price')//SETTING THE SORT
  .limit(4).skip(4)
  //getting all the products
  res.status(200).json({products})
}


//FINDING DYNAMICALLY
const getAllProducts= async (req,res)=>{

  //NOW IN THIS CASE IF WE SEND THE FEATURED PROPERTY IN QUERY..THEN ONLY THOSE WILL BE RETURNED THAT SATISFY THE GIVEN CONDITION.
  //IF FEATURED IS NOT THERE THEN ALL THE DATA WILL BE RETURNED
  const {featured,company,name,sort,fields,numericFilters}=req.query//Here we need to add sort to know if the user is adding sort or not
  const queryObject={}

  if(numericFilters)
  {
    const operatorMap={
      //understood by mongo
      '>':'$gt',
      '>=':'$gte',
      '=':'$eq',
      '<':'$lt',
      '<=':'$lte',

    }
    const regEx=/\b(<|>|<=|>=|=)\b/g
    //if numbericFilter matches the ones in regEx
    //then it will be converted to the ones understood by mongo using operatorMap
    let filters=numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`)
    console.log(filters)
    const options=['price','rating']
    filters=filters.split(',').forEach((item)=>{
      const [field,operator,value]=item.split('-')
      if(options.includes(field))
      {
        queryObject[field]={[operator]:Number(value)}////???
      }
    })
  }


  //SEARCH
  if(featured)
  {
    queryObject.featured=featured==='true'?true:false
  }

  if(company)
  {
    queryObject.company=company
  }

  if(name)
  {//the object having name in its name.
    queryObject.name={$regex:name,$options:'i'}
  }
  //SORT

  //console.log(queryObject)
  //Here .sort is required to be chained,but what if the user hasn't added sort?
  //so We will do it Conditionally
  let result= Product.find(queryObject)//WHY WE NEED TO REMOVE AWAIT
  if(sort){
    //joining all of them with space because this is the syntax required in .sort() in case of multiple parameters for sorting
    const sortList=sort.split(',').join(' ');
    result=result.sort(sortList);
  }
  else
  {
    //Setting a default sort(when no sort passed by user)
    result=result.sort('createdAt')
  }

  //FIELDS

  if(fields)
  {
    const fieldsList=fields.split(',').join(' ')
    result=result.select(fieldsList)
  }

  //SKIP AND LIMIT +PAGE CONCEPT

  const page=Number(req.query.page) || 1
  const limit=Number(req.query.limit) ||10
  //if page number==1 then we have to skip 0 items
  //if page number==2 then we have to skip the items of first page i.e ==limit
  //so we skip limit*1 items 
  const skip=(page - 1)*limit;

  result=result.skip(skip).limit(limit)

  

  const products=await result
  res.status(200).json({products})

  //const {featured}=req.query
  //const products=await Product.find(req.query)//req.query gives us the parameters in out request 
  //res.status(200).json({products,nbHits:products.length})
}

module.exports={
  getAllProductsStatic,
  getAllProducts

}

//If in the request query we send a parameter that is not a property in our model then