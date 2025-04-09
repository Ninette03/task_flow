import { Task } from './tasksSlice';
import TaskItem from './TaskItem';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { motion, AnimatePresence } from 'framer-motion';

interface TaskListProps {
  tasks: Task[];
  loading?: boolean;
}

const TaskList = ({ tasks, loading }: TaskListProps) => {
  const { user } = useAppSelector((state) => state.auth);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={4}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      '& > *': { mb: 2 }, 
      '& > *:last-child': { mb: 0 },
      minHeight: 200
    }}>
      <AnimatePresence>
        {tasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Box 
              sx={{ 
                py: 4, 
                textAlign: 'center',
                color: 'text.secondary'
              }}
            >
              <Typography variant="body1">
                {user?.role === 'admin' 
                  ? 'No tasks found in the system' 
                  : 'You have no tasks assigned yet'
                }
              </Typography>
            </Box>
          </motion.div>
        ) : (
          tasks.map((task) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <TaskItem task={task} />
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </Box>
  );
};

export default TaskList;