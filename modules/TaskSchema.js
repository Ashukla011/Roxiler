 const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
  });
  
  const TaskSchema = mongoose.model('Task', taskSchema);
  module.exports ={TaskSchema}