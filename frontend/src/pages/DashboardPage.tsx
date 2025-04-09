import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchTasksAsync, addTaskAsync } from '../features/tasks/tasksSlice';
import TaskList from '../features/tasks/TaskList';
import Navbar from '../components/Navbar';
import { 
  Box, 
  Container, 
  Typography, 
  CircularProgress, 
  Alert, 
  Tabs, 
  Tab, 
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  TextareaAutosize,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import { Add, Search } from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const { tasks, status, error } = useAppSelector((state) => state.tasks);
  const { user } = useAppSelector((state) => state.auth);
  const [tabValue, setTabValue] = useState(0);
  const [openForm, setOpenForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  // Task form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');

  useEffect(() => {
    if (user) {
      dispatch(fetchTasksAsync());
    }
  }, [dispatch, user]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setTitle('');
    setDescription('');
    setPriority('medium');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addTaskAsync({ title, description, userId: user?.id }));
      handleCloseForm();
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (status: string) => {
    setFilterStatus(status);
  };

  // Filter tasks based on search term and status
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'all') {
      return matchesSearch;
    } else if (filterStatus === 'completed') {
      return matchesSearch && task.isCompleted;
    } else if (filterStatus === 'active') {
      return matchesSearch && !task.isCompleted;
    }
    
    return matchesSearch;
  });

  // Group tasks by status for kanban view
  const todoTasks = filteredTasks.filter(task => !task.isCompleted);
  const completedTasks = filteredTasks.filter(task => task.isCompleted);

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
        <Box sx={{ maxWidth: 'lg', mx: 'auto' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" component="h1" color="primary.dark" gutterBottom>
              Your Tasks
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<Add />}
              onClick={handleOpenForm}
            >
              Add Task
            </Button>
          </Box>

          <Paper sx={{ mb: 3, p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <TextField
              placeholder="Search tasks..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />,
              }}
              sx={{ flexGrow: 1 }}
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                variant={filterStatus === 'all' ? 'contained' : 'outlined'} 
                size="small"
                onClick={() => handleFilterChange('all')}
              >
                All
              </Button>
              <Button 
                variant={filterStatus === 'active' ? 'contained' : 'outlined'} 
                size="small"
                onClick={() => handleFilterChange('active')}
              >
                Active
              </Button>
              <Button 
                variant={filterStatus === 'completed' ? 'contained' : 'outlined'} 
                size="small"
                onClick={() => handleFilterChange('completed')}
              >
                Completed
              </Button>
            </Box>
          </Paper>

          <Paper sx={{ width: '100%', mb: 3 }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="task view tabs"
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="List View" {...a11yProps(0)} />
              <Tab label="Kanban Board" {...a11yProps(1)} />
            </Tabs>
            
            <TabPanel value={tabValue} index={0}>
              <TaskList tasks={filteredTasks} />
            </TabPanel>
            
            <TabPanel value={tabValue} index={1}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                <Box sx={{ flex: '1 1 50%', minWidth: '300px' }}>
                  <Card sx={{ bgcolor: 'background.paper', height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                        To Do ({todoTasks.length})
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      <TaskList tasks={todoTasks} />
                    </CardContent>
                  </Card>
                </Box>
                <Box sx={{ flex: '1 1 50%', minWidth: '300px' }}>
                  <Card sx={{ bgcolor: 'background.paper', height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ color: 'success.main' }}>
                        Completed ({completedTasks.length})
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      <TaskList tasks={completedTasks} />
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            </TabPanel>
          </Paper>
        </Box>
      </Container>

      {/* Task Form Dialog */}
      <Dialog open={openForm} onClose={handleCloseForm} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              required
            />
            
            <TextareaAutosize
              minRows={4}
              placeholder="Description"
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
            
            <TextField
              label="Priority"
              select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              fullWidth
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashboardPage;