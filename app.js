const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const tasks = [];

// todo-da-do-da-do
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    task: req.body.task,
    is_completed: false,
  };
  tasks.push(newTask);
  res.json({ message: "Task added successfully!" });
});

app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedTask = req.body;
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
    res.json({ message: "Task updated successfully!" });
  } else {
    res.status(404).json({ message: "Task not found!" });
  }
});

app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.json({ message: "Task deleted successfully!" });
  } else {
    res.status(404).json({ message: "Task not found!" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
