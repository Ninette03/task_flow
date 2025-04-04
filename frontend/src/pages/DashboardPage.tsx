import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchTasksAsync } from '../features/tasks/tasksSlice';
import TaskList from '../features/tasks/TaskList';
import TaskForm from '../features/tasks/TaskForm';
import Navbar from '../components/Navbar';
import { Box, Container, Typography, CircularProgress, Alert } from '@mui/material';

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const { tasks, status, error } = useAppSelector((state) => state.tasks);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchTasksAsync());
    }
  }, [dispatch, user]);

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" py={8}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box py={8}>
        <Alert severity="error" sx={{ maxWidth: 'md', mx: 'auto' }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'primary.light' }}>
      <Navbar />
      <Container sx={{ py: 4 }}>
        <Box sx={{ maxWidth: 'md', mx: 'auto' }}>
          <Typography variant="h4" component="h1" color="primary.dark" gutterBottom>
            Your Tasks
          </Typography>
          <TaskForm />
          <TaskList tasks={tasks} />
        </Box>
      </Container>
    </Box>
  );
};

export default DashboardPage;