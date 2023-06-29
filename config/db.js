
const mongoose=require("mongoose")
// require("dotenv").config()


const  connection=mongoose.connect("mongodb+srv://kavanish011:super30shukla@cluster0.cqhfocy.mongodb.net/Roxiler?retryWrites=true&w=majority")

module.exports={connection};