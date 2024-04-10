  const mongoose = require("mongoose")
  require("dotenv").config();
const connection=mongoose.connect("mongodb+srv://Avnish:super30shukla@cluster0.vnjkv64.mongodb.net/dataneuron")
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log(err));

        module.exports={connection}