const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Get All Tasks
router.get("/", authMiddleware, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.userId });
  res.json(tasks);
});

// Create Task
router.post("/", authMiddleware, async (req, res) => {
  try {
    const task = new Task({ ...req.body, userId: req.user.userId });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update Task
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Task
router.delete("/:id", authMiddleware, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

module.exports = router;
