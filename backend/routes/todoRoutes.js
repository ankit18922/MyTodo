const express = require("express");
const Todo = require("../models/Todo");
const router = express.Router();

router.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

router.post("/", async (req, res) => {
  const todo = new Todo({ task: req.body.task });
  await todo.save();
  res.json(todo);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updated = await Todo.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.json({ message: "Deleted successfully" });
});

module.exports = router;
