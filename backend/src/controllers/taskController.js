import Task from "../models/Task.js";

// Create Task (Both admins and regular users)
export const createTask = async (req, res) => {
  const { title, description, userId: assignedUserId } = req.body;
  const currentUser = req.user;

  try {
    if (!currentUser?.userId) {
      return res.status(400).json({ message: "Authentication required" });
    }

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    // Determine the assigned user
    let taskUserId;
    if (currentUser.role === 'admin' && assignedUserId) {
      // Admin can assign to any user
      taskUserId = assignedUserId;
    } else {
      // Regular users can only create tasks for themselves
      taskUserId = currentUser.userId;
    }

    const task = await Task.create({ 
      title, 
      description, 
      userId: taskUserId,
      isCompleted: false,
      createdBy: currentUser.userId
    });

    res.status(201).json(task);
  } catch (error) {
    console.error("Create task error:", error);
    res.status(500).json({ message: "Error creating task" });
  }
};

// Admin: Get All Tasks
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Fetch all tasks error:", error);
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

// User: Get Only Their Tasks
export const getUserTasks = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(400).json({ message: "Authentication required" });
    }

    const tasks = await Task.findAll({ 
      where: { userId } // Only tasks assigned to this user
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Fetch user tasks error:", error);
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

// Admin: Full Task Update
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, userId: newAssignedUserId } = req.body;

    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    // Admin can update any task
    await task.update({ 
      title, 
      description, 
      userId: newAssignedUserId // Reassign if needed
    });
    
    res.status(200).json(task);
  } catch (error) {
    console.error("Update task error:", error);
    res.status(500).json({ message: "Error updating task" });
  }
};

// User: Mark Task as Completed
export const markTaskCompleted = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    const task = await Task.findOne({
      where: { 
        id, 
        userId // User can only update their own tasks
      }
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }

    // User can only toggle completion status
    await task.update({ isCompleted: true });
    res.status(200).json(task);
  } catch (error) {
    console.error("Complete task error:", error);
    res.status(500).json({ message: "Error completing task" });
  }
};

// Admin: Delete Any Task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.destroy();
    res.status(204).json({ message: "Task deleted" });
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json({ message: "Error deleting task" });
  }
};