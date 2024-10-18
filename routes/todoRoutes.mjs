import express from "express";
import {
  listTodos,
  createTodo,
  updateTodo,
  markAsDone,
  deleteTodo,
} from "../controllers/todoController.mjs";

const router = express.Router();
router.get("/", listTodos);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.put("/:id/done", markAsDone);
router.delete("/:id", deleteTodo);

export default router;
