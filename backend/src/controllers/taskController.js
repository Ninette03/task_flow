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
export const getTask = async (req, res) => {
    try {
      const tasks = await Task.findAll({ where: { userId: req.user.uid } });
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Error fetching tasks" });
    }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    await task.update({ title, description });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Error updating task" });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    await task.destroy();
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });

  }
};

