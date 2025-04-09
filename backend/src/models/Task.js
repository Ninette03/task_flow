import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import User from "./User.js";

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  userId: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: "uid",
    },
    allowNull: false,  // Tasks must be assigned to someone
  },
  createdBy: {  // Track task creator (admin)
    type: DataTypes.STRING,
    references: {
      model: User,
      key: "uid",
    },
    allowNull: false,
  },
});

// Relationships
User.hasMany(Task, { 
  foreignKey: "userId", 
  as: "assignedTasks"  // Useful for querying user's tasks
});
User.hasMany(Task, {
  foreignKey: "createdBy",
  as: "createdTasks"  // Useful for querying tasks created by an admin
});
Task.belongsTo(User, { 
  foreignKey: "userId", 
  as: "assignee"  // Eager loading: Task.getAssignee()
});
Task.belongsTo(User, {
  foreignKey: "createdBy",
  as: "creator"  // Eager loading: Task.getCreator()
});

export default Task;