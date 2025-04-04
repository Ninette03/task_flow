import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addTaskAsync } from './tasksSlice';
import { 
  TextField, 
  Button, 
  Box, 
  Stack,
  TextareaAutosize
} from '@mui/material';

const TaskForm = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addTaskAsync({ title, description }));
      setTitle('');
      setDescription('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          variant="outlined"
          label="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 1,
            }
          }}
        />
        
        <TextareaAutosize
          minRows={4}
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: '100%',
            padding: '16.5px 14px',
            borderRadius: '4px',
            border: '1px solid rgba(0, 0, 0, 0.23)',
            fontFamily: 'inherit',
            fontSize: '1rem',
            resize: 'vertical',
          }}
        />
        
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{
            py: 1.5,
            borderRadius: 1,
            textTransform: 'none',
            fontSize: '1rem',
          }}
        >
          Add Task
        </Button>
      </Stack>
    </Box>
  );
};

export default TaskForm;