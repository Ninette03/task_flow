import { Box, Typography, Paper, Container } from '@mui/material';
import GoogleLoginButton from '../features/auth/GoogleLoginButton';
import { CheckCircle, Speed, Security, Group } from '@mui/icons-material';

const LandingPage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0052CC 0%, #0747A6 100%)',
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
      }}
    >
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ py: 8, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, alignItems: 'center' }}>
          <Box sx={{ flex: '1 1 50%', minWidth: '300px' }}>
            <Typography 
              variant="h2" 
              component="h1" 
              fontWeight="bold" 
              color="white"
              sx={{ 
                mb: 2,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                lineHeight: 1.2
              }}
            >
              Organize Your Work with TaskFlow
            </Typography>
            <Typography 
              variant="h5" 
              color="rgba(255, 255, 255, 0.9)" 
              sx={{ mb: 4, fontSize: { xs: '1.1rem', md: '1.25rem' } }}
            >
              A powerful task management app that helps teams collaborate, track progress, and get more done.
            </Typography>
            <Box sx={{ mb: 4 }}>
              <GoogleLoginButton />
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            component="h2" 
            align="center" 
            color="primary.dark" 
            sx={{ mb: 6, fontWeight: 'bold' }}
          >
            Why Choose TaskFlow?
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            <Box sx={{ flex: '1 1 25%', minWidth: '250px' }}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: 3,
                    transform: 'translateY(-5px)',
                    borderColor: 'primary.light'
                  }
                }}
              >
                <Speed sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Efficient Workflow
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Streamline your tasks and projects with our intuitive interface designed for maximum productivity.
                </Typography>
              </Paper>
            </Box>
            
            <Box sx={{ flex: '1 1 25%', minWidth: '250px' }}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: 3,
                    transform: 'translateY(-5px)',
                    borderColor: 'primary.light'
                  }
                }}
              >
                <Group sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Team Collaboration
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Work together seamlessly with real-time updates, comments, and task assignments.
                </Typography>
              </Paper>
            </Box>
            
            <Box sx={{ flex: '1 1 25%', minWidth: '250px' }}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: 3,
                    transform: 'translateY(-5px)',
                    borderColor: 'primary.light'
                  }
                }}
              >
                <Security sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Secure & Reliable
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Your data is protected with enterprise-grade security and regular backups.
                </Typography>
              </Paper>
            </Box>
            
            <Box sx={{ flex: '1 1 25%', minWidth: '250px' }}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: 3,
                    transform: 'translateY(-5px)',
                    borderColor: 'primary.light'
                  }
                }}
              >
                <CheckCircle sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Task Completion
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Track progress, set deadlines, and celebrate achievements with visual progress indicators.
                </Typography>
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;