import { useAppDispatch } from '../../app/hooks';
import { toggleTaskAsync, deleteTaskAsync } from './tasksSlice';
import { Check, Delete } from '@mui/icons-material';
import { 
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Stack,
  Chip
} from '@mui/material';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const dispatch = useAppDispatch();

  return (
    <Card 
      variant="outlined"
      sx={{
        mb: 2,
        borderLeft: task.completed ? '4px solid #4caf50' : '4px solid #1976d2',
        opacity: task.completed ? 0.8 : 1,
        transition: 'all 0.3s ease'
      }}
    >
      <CardContent sx={{ py: 2, px: 2.5 }}>
        <Box display="flex" justifyContent="space-between">
          <Box flex={1}>
            <Typography
              variant="body1"
              component="h3"
              sx={{
                fontWeight: 'medium',
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? 'text.secondary' : 'text.primary',
                mb: task.description ? 1 : 0
              }}
            >
              {task.title}
              {task.completed && (
                <Chip 
                  label="Completed" 
                  size="small" 
                  sx={{ ml: 1, bgcolor: 'success.light', color: 'white' }} 
                />
              )}
            </Typography>
            
            {task.description && (
              <Typography variant="body2" color="text.secondary">
                {task.description}
              </Typography>
            )}
          </Box>
          
          <Stack direction="row" spacing={0.5} ml={2}>
            <IconButton
              onClick={() => dispatch(toggleTaskAsync(task.id))}
              color={task.completed ? 'success' : 'default'}
              aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
              sx={{
                '&:hover': {
                  bgcolor: task.completed ? 'success.light' : 'action.hover',
                  color: task.completed ? 'success.contrastText' : 'inherit'
                }
              }}
            >
              <Check />
            </IconButton>
            
            <IconButton
              onClick={() => dispatch(deleteTaskAsync(task.id))}
              color="error"
              aria-label="Delete task"
              sx={{
                '&:hover': {
                  bgcolor: 'error.light',
                  color: 'error.contrastText'
                }
              }}
            >
              <Delete />
            </IconButton>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskItem;