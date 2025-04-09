import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addTaskAsync } from './tasksSlice';
import { 
  TextField, 
  Button, 
  Box, 
  Stack,
  TextareaAutosize,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Typography
} from '@mui/material';
import { motion } from 'framer-motion';

const TaskForm = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedUserId, setAssignedUserId] = useState('');

  // Mock users - replace with actual user fetch from your backend
  const availableUsers = [
    { id: 'user1', email: 'user1@example.com' },
    { id: 'user2', email: 'user2@example.com' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addTaskAsync({ 
        title, 
        description,
        ...(user?.role === 'admin' && assignedUserId && { userId: assignedUserId })
      }));
      setTitle('');
      setDescription('');
      setAssignedUserId('');
    }
  };

  return (
    <Box 
      component={motion.form}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit} 
      sx={{ 
        mb: 4,
        p: 3,
        borderRadius: 2,
        bgcolor: 'background.paper',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Stack spacing={3}>
        <Typography variant="h6" sx={{ color: 'text.primary' }}>
          Create New Task
        </Typography>
        
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
              '& fieldset': {
                borderColor: 'divider',
              },
              '&:hover fieldset': {
                borderColor: 'primary.main',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'text.secondary',
            }
          }}
          InputProps={{
            sx: {
              color: 'text.primary',
              bgcolor: 'background.default'
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
            border: '1px solid',
            borderColor: 'rgba(255, 255, 255, 0.23)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '1rem',
            resize: 'vertical',
            backgroundColor: 'transparent',
            color: 'inherit',
          }}
        />

        {user?.role === 'admin' && (
          <>
            <Divider sx={{ my: 1 }} />
            <FormControl fullWidth>
              <InputLabel 
                id="assignee-label"
                sx={{ color: 'text.secondary' }}
              >
                Assign to (optional)
              </InputLabel>
              <Select
                labelId="assignee-label"
                value={assignedUserId}
                onChange={(e) => setAssignedUserId(e.target.value)}
                sx={{
                  borderRadius: 1,
                  '& .MuiSelect-select': {
                    color: 'text.primary',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'divider',
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: 'background.paper',
                      '& .MuiMenuItem-root': {
                        color: 'text.primary',
                        '&:hover': {
                          bgcolor: 'action.hover',
                        }
                      }
                    }
                  }
                }}
              >
                <MenuItem value="">
                  <em>Unassigned</em>
                </MenuItem>
                {availableUsers.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.email}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}
        
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{
            py: 1.5,
            borderRadius: 1,
            textTransform: 'none',
            fontSize: '1rem',
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.dark',
            }
          }}
        >
          {user?.role === 'admin' ? 'Create Task' : 'Add My Task'}
        </Button>
      </Stack>
    </Box>
  );
};

export default TaskForm;