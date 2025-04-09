const API_URL = 'https://task-flow-xaku.onrender.com/api';

const getAuthHeaders = (token: string) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});
// Fetch tasks (role-aware)
export const fetchTasks = async (token: string, isAdmin: boolean = false) => {
  const endpoint = isAdmin ? `${API_URL}/tasks/admin` : `${API_URL}/tasks`;
  const response = await fetch(endpoint, {
    headers: getAuthHeaders(token),
  });
  if (!response.ok) throw new Error('Failed to fetch tasks');
  return response.json();
};

// Create task (with optional assignment for admins)
export const createTask = async (
  task: { 
    title: string; 
    description: string; 
    userId?: string  // Optional assignee (admin only)
  }, 
  token: string
) => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) throw new Error('Failed to create task');
  return response.json();
};

// Mark task as complete (user-only endpoint)
export const markTaskComplete = async (taskId: string, token: string) => {
  const response = await fetch(`${API_URL}/tasks/${taskId}/complete`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ isCompleted: true }),
  });
  if (!response.ok) throw new Error('Failed to complete task');
  return response.json();
};

// Admin-only task update (full update)
export const updateTaskAdmin = async (
  taskId: string, 
  updates: {
    title?: string;
    description?: string;
    userId?: string;  // Reassignment
    isCompleted?: boolean;
  }, 
  token: string
) => {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error('Failed to update task');
  return response.json();
};

// Admin-only task deletion
export const deleteTask = async (taskId: string, token: string) => {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to delete task');
  return response.ok; // Returns true on success
};