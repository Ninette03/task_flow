import { configureStore } from '@reduxjs/toolkit';
import tasksReducer, { fetchTasksAsync, addTaskAsync } from '../features/tasks/tasksSlice';
import { createTask } from '../services/taskService';
import { fetchTasks } from '../services/taskService';
import { RootState } from '../app/store';

// Mock the createTask service function
jest.mock('../services/taskService', () => ({
  fetchTasks: jest.fn(),
  createTask: jest.fn(),
}));

describe('tasksSlice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        tasks: tasksReducer,
      },
    });
  });

  it('should handle fetchAllTasksAsync.fulfilled', async () => {
    const mockTasks = [{ id: '1', title: 'Test Task', description: 'Test Description', userId: 'user1', isCompleted: false }];

    (fetchTasks as jest.Mock).mockResolvedValueOnce(mockTasks);

    await store.dispatch(fetchTasksAsync() as any);

    const state = store.getState() as RootState;
    expect(state.tasks.tasks).toEqual(mockTasks);
  });

  it('should handle fetchUserTasksAsync.fulfilled', async () => {
    const mockTasks = [{ id: '2', title: 'User Task', description: 'User Task Description', userId: 'user2', isCompleted: false }];

    (fetchTasks as jest.Mock).mockResolvedValueOnce(mockTasks);

    await store.dispatch(fetchTasksAsync() as any);

    const state = store.getState() as RootState;
    expect(state.tasks.tasks).toEqual(mockTasks);
  });
});
