const express=require('express')

const ProductRoutes=express.Router()
const {ProductModule}=require("../Modules/Product.modules")


ProductRoutes.get('/' , async(req,res)=>{
    try{
        let data= await ProductModule.find()
         res.send(data)
    
}catch(error){
console.log("something error  ")
console.log(error);
}
});


ProductRoutes.post("/product/title", async(req,res)=>{
        const payload= req.body 
    try{
        const PostProduct= new  ProductModule (payload);
        await PostProduct.save();
        res.send('Posted successfully');
    }catch(error){
        console.log("Somthing Error in Post");
        console.log(error);
    }
});

// Search By titel description price and orther things 
ProductRoutes.get("/product",async(req,res)=>{
    const {title,description,price}=req.query
    try{
       let data=await ProductModule.find({title:{$regex:title,$options:'i'}})
       res.send(data)
    }catch(err){
        console.log(err)
    }
})
 



// Pagination 
ProductRoutes.get('/product/:page',async (req, res) => {
   
    const page=Number(req.query.page)||1;

    let limit =Number(req.query.limit)||10;

  
    const skip = (page - 1) * limit;
  
      try{
       let LimitAndPage= await ProductModule.find()
        .skip(skip)
        .limit(limit)
        res.send(LimitAndPage)
      }catch(err){
        console.log(err)
      }
});


module.exports={ProductRoutes}