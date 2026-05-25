import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Todo from "./models/todo.model.js";
import cors from "cors";

const app = express();
dotenv.config();

app.use(express.json());

app.use(cors());

// console.log(process.env.MONGODB_URI);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send(`Backend Server is running on port ${port}`);
});

app.post("/todos", async (req, res) => {
  const newTodo = await Todo.create({ title: req.body.title });
  res.json(newTodo);
});

app.get("/todos", async (req, res) => {
  const getTodo = await Todo.find();
  res.json(getTodo);
});

app.put("/todos/:id", async (req, res) => {
  const updatedId = await Todo.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title, completed: req.body.completed },
    { new: true },
  );

  res.json(updatedId);
});

app.delete("/todos/:id", async (req, res) => {
  const deleteById = await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "todo deleted" });
});

app.get("/todos", async (req, res) => {
  const todos = await Todo.find({
    title: { $regex: req.query.q || "", $options: "i" }, // search if q exists, else return all
  });
  res.json(todos);
});

app.delete("/todos", async (req, res) => {
  try {
    const deleteAll = await Todo.deleteMany();
    res.json({
      message: "All todos deleted Successfully.",
      deletedCount: deleteAll.deletedCount,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
      error: "error.message",
    });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port} `);
});
