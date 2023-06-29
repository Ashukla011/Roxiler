
const mongoose=require('mongoose')
const ProductSchema=mongoose.Schema({
    title:String,
    price:Number,
    description:String,
    category:String,
    image:String,
    sold:Boolean,
    dateOfSale:Date
})

const ProductModule=mongoose.model("Product",ProductSchema)

module.exports={ProductModule}