import { Box, Typography, Paper } from '@mui/material';
import GoogleLoginButton from '../features/auth/GoogleLoginButton';

const LandingPage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #0d47a1, #1976d2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        p: 4,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          textAlign: 'center',
          maxWidth: 'md',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          bgcolor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: 4,
          p: 8,
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <Typography variant="h2" component="h1" fontWeight="bold" color="white">
          Welcome to TaskFlow
        </Typography>
        <Typography variant="h5" color="rgba(255, 255, 255, 0.9)" mb={4}>
          Organize your work and life with our simple task management app.
        </Typography>
        <Box display="flex" justifyContent="center">
          <GoogleLoginButton />
        </Box>
      </Paper>
    </Box>
  );
};

export default LandingPage;