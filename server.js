const express = require("express");
const bodyParser = require("body-parser");
const { TaskSchema } = require("./modules/TaskSchema");
const { connection } = require("./db");
const  cors = require('cors')

 

require("dotenv").config();
const app = express();
app.use(cors())
app.use(bodyParser.json());

let addCount = 0;
let updateCount = 0;

// GET all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await TaskSchema.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new task
app.post("/add", async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = new TaskSchema({ description,title });
    await task.save();
    addCount++;
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE a task
app.patch("/edit/:id", async (req, res) => {
  try {
    const { _id } = req.params;
    const { title, description } = req.body;
    const task = await TaskSchema.findByIdAndUpdate(
      _id,
      { title, description },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    updateCount++;
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Count API
app.get("/count", (req, res) => {
  res.json({ addCount, updateCount });
});

const PORT =process.env.PORT || 5000;
app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Server started on port ${PORT}`);
  } catch (err) {
    console.log(err);
  }
});
