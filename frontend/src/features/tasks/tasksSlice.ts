import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createTask, fetchTasks, updateTask, deleteTask } from '../../services/taskService';
import { AppThunk, RootState } from '../../app/store';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
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

export const fetchTasksAsync = createAsyncThunk<Task[], void, { state: RootState }>(
  'tasks/fetchTasks',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      console.log('Current token:', token); // Debug log
      
      if (!token) {
        throw new Error('No authentication token available');
      }
      
      const tasks = await fetchTasks(token);
      return tasks;
    } catch (error) {
      console.error('Fetch tasks error:', error);
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch tasks');
    }
  }
);

export const addTaskAsync = createAsyncThunk(
  'tasks/addTask',
  async (task: { title: string; description: string }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      
      if (!token) {
        return rejectWithValue('No authentication token');
      }

      const response = await createTask(task, token);
      return response;
    } catch (error) {
      return rejectWithValue('Failed to create task');
    }
  }
);

export const toggleTaskAsync = createAsyncThunk<Task, string, { state: RootState }>(
  'tasks/toggleTask',
  async (taskId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      if (!token) {
        console.error('Toggle task failed - no auth token');
        return rejectWithValue('Authentication required');
      }

      console.log(`Toggling task ${taskId} with token:`, token.substring(0, 10) + '...');
      
      const response = await updateTask(taskId, { completed: true }, token);
      console.log(`Task ${taskId} toggled successfully`);
      return response;
    } catch (error: unknown) {
      console.error(`Error toggling task ${taskId}:`, error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to toggle task status');
    }
  }
);

export const deleteTaskAsync = createAsyncThunk<string, string, { state: RootState }>(
  'tasks/deleteTask',
  async (taskId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      if (!token) {
        console.error('Delete task failed - no auth token');
        return rejectWithValue('Authentication required');
      }

      console.log(`Deleting task ${taskId} with token:`, token.substring(0, 10) + '...');
      
      await deleteTask(taskId, token);
      console.log(`Task ${taskId} deleted successfully`);
      return taskId;
    } catch (error: unknown) {
      console.error(`Error deleting task ${taskId}:`, error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to delete task');
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
      })
      .addCase(fetchTasksAsync.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasksAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      .addCase(addTaskAsync.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
      })
      .addCase(toggleTaskAsync.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;