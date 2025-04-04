import Task from "../models/Task.js";

// Create Task
export const createTask = async (req, res) => {
  const { title, description, userId } = req.body;
  //const userId = req.user?.userId;

  try {
    console.log("Request user:", req.user);
    
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID is missing in request" });
    }
    console.log(req.body);
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const task = await Task.create({ title, description, userId });
    res.status(201).json(task);
  } catch (error) {
    console.log("Create task", error)
    res.status(500).json({ message: "Error creating task" });
  }
};
// Get Tasks
export const getTask = async (req, res) => {
  try {
    console.log("Request user:", req.user);
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID is missing in request" });
    }

    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    console.log("Fetching task", error)
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const userId = req.user?.userId;

    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    if (task.userId !== userId) {
      return res.status(403).json({ error: "Unauthorized to update this task" });
    }

    await task.update({ title, description });
    res.status(200).json(task);
  } catch (error) {
    console.log("Error updating:", error);
    res.status(500).json({ message: "Error updating task" });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    
    if (task.userId !== userId) {
      return res.status(403).json({ error: "Unauthorized to delete this task" });
    }

    await task.destroy();
    res.status(204).json({ message: "Task deleted" });
  } catch (error) {
    console.log("Error in deleting:", error);
    res.status(500).json({ message: "Error deleting task" });

  }
};

