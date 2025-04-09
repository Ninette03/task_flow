import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { logoutUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Logout, Dashboard, Settings } from "@mui/icons-material";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  IconButton, 
  Menu, 
  MenuItem, 
  Avatar,
  Divider,
  Tooltip
} from "@mui/material";
import { useState } from "react";
import { UserRole } from "../utils/roles";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/");
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    handleClose();
  };

  const isAdmin = user?.role === UserRole.ADMIN;

  return (
    <AppBar position="static" sx={{ bgcolor: "primary.dark", boxShadow: 2 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography 
            variant="h6" 
            component="h1" 
            fontWeight="bold"
            sx={{ 
              cursor: 'pointer',
              '&:hover': { opacity: 0.9 }
            }}
            onClick={() => navigate('/dashboard')}
          >
            TaskFlow
          </Typography>
        </Box>

        {user && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography 
              variant="body1" 
              sx={{ 
                display: { xs: "none", sm: "block" },
                color: 'white'
              }}
            >
              Hello, {user.displayName}
            </Typography>

            <Tooltip title="Account settings">
              <IconButton
                onClick={handleMenu}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar 
                  sx={{ 
                    width: 32, 
                    height: 32,
                    bgcolor: 'secondary.main'
                  }}
                >
                  {user.displayName?.charAt(0) || 'U'}
                </Avatar>
              </IconButton>
            </Tooltip>
            
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={() => handleNavigate('/dashboard')}>
                <Dashboard fontSize="small" sx={{ mr: 2 }} />
                Dashboard
              </MenuItem>
              
              {isAdmin && (
                <>
                  <MenuItem onClick={() => handleNavigate('/admin')}>
                    <Settings fontSize="small" sx={{ mr: 2 }} />
                    Admin Dashboard
                  </MenuItem>
                  <Divider />
                </>
              )}
              
              <MenuItem onClick={handleLogout}>
                <Logout fontSize="small" sx={{ mr: 2 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
