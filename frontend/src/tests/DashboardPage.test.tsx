import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import DashboardPage from '../pages/DashboardPage';
import tasksReducer, { Task } from '../features/tasks/tasksSlice';
import authReducer from '../features/auth/authSlice';
import rootReducer, { RootState } from '../app/store';

type InitialState = Partial<RootState>;

const renderWithStore = (initialState: InitialState) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });

  return render(
    <Provider store={store}>
      <DashboardPage />
    </Provider>
  );
};

describe('DashboardPage', () => {
  it('renders loading state', () => {
    renderWithStore({ tasks: {
        status: 'loading', tasks: [],
        error: null
    }, auth: {
        user: { role: 'user' },
        token: null,
        loading: false,
        error: null
    } });
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders error message', () => {
    renderWithStore({ tasks: {
        status: 'failed', error: 'Error fetching tasks',
        tasks: []
    }, auth: {
        user: { role: 'user' },
        token: null,
        loading: false,
        error: null
    } });
    expect(screen.getByText(/error fetching tasks/i)).toBeInTheDocument();
  });

  it('renders tasks for user', () => {
    const mockTasks = [{ id: '1', title: 'User Task', description: 'User Task Description', userId: 'user1', isCompleted: false, createdAt: new Date().toISOString() }];
    renderWithStore({ tasks: {
        status: 'succeeded', tasks: mockTasks,
        error: null
    }, auth: { user: { role: 'user' }, token: null, loading: false, error: null } });
    expect(screen.getByText(/User Task/i)).toBeInTheDocument();
  });

  it('renders tasks for admin', () => {
    const mockTasks: Task[] = [{ id: '1', title: 'Admin Task', description: 'Admin Task Description', userId: 'user1', isCompleted: false, createdAt: new Date().toISOString() }];
    renderWithStore({ tasks: {
        status: 'succeeded', tasks: mockTasks,
        error: null
    }, auth: {
        user: { role: 'admin' },
        token: null,
        loading: false,
        error: null
    } });
    expect(screen.getByText(/Admin Task/i)).toBeInTheDocument();
  });
});
