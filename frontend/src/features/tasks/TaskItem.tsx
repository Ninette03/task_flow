import React, { useState } from 'react';
import { Task } from './tasksSlice';
import { Box, Typography, IconButton, Chip, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { completeTaskAsync, deleteTaskAsync, updateTaskAsync } from './tasksSlice';
import { CheckCircle, Delete, Edit } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [openEdit, setOpenEdit] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleComplete = () => {
    dispatch(completeTaskAsync(task.id));
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTaskAsync(task.id));
    }
  };

  const handleEdit = () => {
    setOpenEdit(true);
  };

  const handleEditSubmit = () => {
    console.log('Submitting edit:', editedTitle, editedDescription);
    dispatch(updateTaskAsync({ taskId: task.id, updates: { title: editedTitle, description: editedDescription } }));
    setOpenEdit(false);
  };

  return (
    <Box
      component={motion.div}
      whileHover={{ scale: 1.01 }}
      sx={{
        p: 3,
        borderRadius: 2,
        bgcolor: 'background.paper',
        boxShadow: 1,
        position: 'relative'
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {task.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {task.description}
          </Typography>
          {user?.role === 'admin' && (
            <Chip 
              label={`Assigned to: ${task.userId}`}
              size="small"
              sx={{ mr: 1 }}
            />
          )}
        </Box>
        
        <Stack direction="row" spacing={1}>
          {user?.role !== 'admin' && !task.isCompleted && (
            <IconButton
              color="success"
              onClick={handleComplete}
              aria-label="complete"
            >
              <CheckCircle />
            </IconButton>
          )}
          
          {user?.role === 'admin' && (
            <>
              <IconButton color="primary" aria-label="edit" onClick={handleEdit}>
                <Edit />
              </IconButton>
              <IconButton
                color="error"
                onClick={handleDelete}
                aria-label="delete"
              >
                <Delete />
              </IconButton>
            </>
          )}
        </Stack>
      </Stack>
      
      {task.isCompleted && (
        <Chip
          label="Completed"
          color="success"
          size="small"
          sx={{ position: 'absolute', top: 8, right: 8 }}
        />
      )}

      {/* Edit Task Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskItem;