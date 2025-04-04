import { Task } from './tasksSlice';
import TaskItem from './TaskItem';
import { Box, Typography } from '@mui/material';

interface TaskListProps {
  tasks: Task[];
}

const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <Box sx={{ '& > *': { mb: 2 }, '& > *:last-child': { mb: 0 } }}>
      {tasks.length === 0 ? (
        <Box 
          sx={{ 
            py: 4, 
            textAlign: 'center',
            color: 'primary.main'
          }}
        >
          <Typography variant="body1">
            No tasks yet. Create your first task!
          </Typography>
        </Box>
      ) : (
        tasks.map((task) => <TaskItem key={task.id} task={task} />)
      )}
    </Box>
  );
};

export default TaskList;