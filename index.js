const express=require("express");
const connection=require('./config/db.js');
const app=express();
app.use(express.json())
require("dotenv").config();
const {ProductRoutes} =require("./Routes/Product.Routes")


app.use("/",ProductRoutes)











app.listen(process.env.port,async()=>{
   try{
    await connection;
    console.log(`server is running on ${process.env.port}`)
   }catch(err){
    console.log('something  wrong in the server')
   }
})