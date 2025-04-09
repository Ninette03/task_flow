import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchTasksAsync } from '../features/tasks/tasksSlice';
import TaskList from '../features/tasks/TaskList';
import Navbar from '../components/Navbar';
import { Box, Container, Typography, CircularProgress, Alert } from '@mui/material';

const AdminDashboardPage = () => {
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
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" color="primary.dark" gutterBottom>
          Admin Dashboard
        </Typography>
        
        <Typography variant="h5" component="h2" color="primary.dark" gutterBottom>
          Recent Tasks
        </Typography>
        <TaskList tasks={tasks.slice(0, 5)} />
      </Container>
    </Box>
  );
};

export default AdminDashboardPage; 