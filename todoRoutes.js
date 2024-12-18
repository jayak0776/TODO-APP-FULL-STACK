import express from "express";
import { todo } from "./todoAppModel.js";

const router = express.Router();

// POST - Create a new task
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.description || !req.body.status) {
      return res.status(400).send({
        message: "Send all required fields: task value!",
      });
    }

    const newTask = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
    };

    const to_do = await todo.create(newTask);
    return res.status(200).send(to_do);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// GET - Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await todo.find({});

    return res.status(200).json({
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// GET - Get a specific task by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const task = await todo.findById(id);

    return res.status(200).json(task);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// PUT - Update a task by ID
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.description || !req.body.status) {
      return res.status(400).send({
        message: "Send all required fields: task value!",
      });
    }

    const { id } = req.params;

    const result = await todo.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).send({ message: "Task updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// DELETE - Delete a task by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await todo.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).send({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
