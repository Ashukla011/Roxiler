const express=require("express");
const connection=require('./config/db.js');
const app=express();
app.use(express.json())
require("dotenv").config();
const {ProductRoutes} =require("../BackEnd/Routes/Product.Routes.js")


app.use("/",ProductRoutes)











app.listen(process.env.port,async()=>{
   try{
    await connection;
    console.log('server is running on 3500')
   }catch(err){
    console.log('something  wrong in the server')
   }
})