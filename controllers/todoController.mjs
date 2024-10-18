import Todo from "../models/Todo.mjs";

export const listTodos = async (req, res) => {
  const { sort, done } = req.query;
  const findOption = {};
  const sortOption = {};

  if (sort === "upcoming") {
    sortOption.dateTime = "asc";
    findOption.dateTime = {
      $gte: new Date(),
    };
  }

  if (done !== undefined) {
    findOption.done = done === "true" ? true : false;
  }

  const todos = await Todo.find(findOption).sort(sortOption);

  res.render("todos/index", { todos });
};

export const createTodo = async (req, res) => {
  const { name, description, dateTime } = req.body;

  if (!name || !description || !dateTime) {
    return res.status(400).send("All fields are required.");
  }

  const newTodo = new Todo({
    name,
    description,
    dateTime: new Date(dateTime),
  });

  await newTodo.save();
  res.redirect("/todos");
};

export const deleteTodo = async (req, res) => {
  const todoId = req.params.id;
  await Todo.findByIdAndDelete(todoId);
  res.redirect("/todos");
};

export const updateTodo = async (req, res) => {
  const { name, description, dateTime } = req.body;
  const todoId = req.params.id;

  if (!name || !description || !dateTime) {
    return res.status(400).send("All fields are required.");
  }

  try {
    await Todo.findByIdAndUpdate(todoId, {
      name,
      description,
      dateTime: new Date(dateTime),
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating the todo");
  }
};

export const markAsDone = async (req, res) => {
  const todoId = req.params.id;

  try {
    await Todo.findByIdAndUpdate(todoId, { done: true });
    res.redirect("/todos");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error marking the todo as done");
  }
};
