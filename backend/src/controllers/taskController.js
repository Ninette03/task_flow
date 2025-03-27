import Task from "../models/Task.js";

// Create Task
export const createTask = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.uid;

  try {
    const task = await Task.create({ title, description, userId });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
};
// Get Tasks
export const getTasks = async (req, res) => {
    try {
      const tasks = await Task.findAll({ where: { userId: req.user.uid } });
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Error fetching tasks" });
    }
  };
