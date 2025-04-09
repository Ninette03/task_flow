import { createTheme } from '@mui/material/styles';

// Define a modern theme inspired by Trello and Jira
const theme = createTheme({
  palette: {
    primary: {
      main: '#0052CC', // Jira blue
      light: '#4C9AFF',
      dark: '#0747A6',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#00875A', // Jira green
      light: '#57D9A3',
      dark: '#006644',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#DE350B', // Jira red
      light: '#FF5630',
      dark: '#BF2600',
    },
    warning: {
      main: '#FF991F', // Jira orange
      light: '#FFB020',
      dark: '#B76E00',
    },
    info: {
      main: '#00B8D9', // Jira teal
      light: '#00E6CA',
      dark: '#00849B',
    },
    success: {
      main: '#36B37E', // Jira green
      light: '#57D9A3',
      dark: '#006644',
    },
    background: {
      default: '#F4F5F7', // Jira background
      paper: '#FFFFFF',
    },
    text: {
      primary: '#172B4D', // Jira text
      secondary: '#5E6C84',
    },
    divider: '#DFE1E6',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default theme; 