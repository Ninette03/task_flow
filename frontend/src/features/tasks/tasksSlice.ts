import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchTasks,
  createTask,
  markTaskComplete,
  updateTaskAdmin,
  deleteTask
} from '../../services/taskService';
import { RootState } from '../../app/store';

export interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  userId: string;       // Who the task is assigned to
  createdBy?: string;   // Who created the task (admin)
  createdAt: string;
}

interface TasksState {
  tasks: Task[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  status: 'idle',
  error: null,
};

// Thunk for fetching tasks (role-aware)
export const fetchTasksAsync = createAsyncThunk<Task[], void, { state: RootState }>(
  'tasks/fetchTasks',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token, user } = getState().auth;
      if (!token) throw new Error('No authentication token available');
      
      return await fetchTasks(token, user?.role === 'admin');
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch tasks');
    }
  }
);

// Thunk for creating tasks (handles admin assignment)
export const addTaskAsync = createAsyncThunk<Task, { 
  title: string; 
  description: string; 
  userId?: string 
}, { state: RootState }>(
  'tasks/addTask',
  async (taskData, { getState, rejectWithValue }) => {
    try {
      const { token, user } = getState().auth;
      if (!token) throw new Error('No authentication token available');

      // Regular users can't assign tasks to others
      if (user?.role !== 'admin' && taskData.userId) {
        throw new Error('Unauthorized assignment');
      }

      const requestData = {
        title: taskData.title,
        description: taskData.description,
        ...(user?.role === 'admin' && taskData.userId && { userId: taskData.userId })
      };

      return await createTask(requestData, token);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create task');
    }
  }
);

// Thunk for marking task complete (user-only)
export const completeTaskAsync = createAsyncThunk<Task, string, { state: RootState }>(
  'tasks/completeTask',
  async (taskId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      if (!token) throw new Error('No authentication token available');
      
      return await markTaskComplete(taskId, token);
    } catch (error) {
      console.error('Failed to complete task:', error);
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to complete task');
    }
  }
);

// Thunk for admin task updates
export const updateTaskAsync = createAsyncThunk<Task, {
  taskId: string;
  updates: {
    title?: string;
    description?: string;
    userId?: string;
    isCompleted?: boolean;
  }
}, { state: RootState }>(
  'tasks/updateTask',
  async ({ taskId, updates }, { getState, rejectWithValue }) => {
    try {
      const { token, user } = getState().auth;
      if (!token || user?.role !== 'admin') {
        throw new Error('Admin privileges required');
      }
      
      return await updateTaskAdmin(taskId, updates, token);
    } catch (error) {
      console.error('Failed to update task:', error);
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update task');
    }
  }
);

// Thunk for deleting tasks (admin-only)
export const deleteTaskAsync = createAsyncThunk<string, string, { state: RootState }>(
  'tasks/deleteTask',
  async (taskId, { getState, rejectWithValue }) => {
    try {
      const { token, user } = getState().auth;
      if (!token || user?.role !== 'admin') {
        throw new Error('Admin privileges required');
      }
      
      await deleteTask(taskId, token);
      return taskId;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete task');
    }
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTasksAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasksAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(completeTaskAsync.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(completeTaskAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(t => t.id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;