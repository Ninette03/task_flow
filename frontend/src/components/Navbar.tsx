import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { logoutUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/");
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "primary.dark" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" component="h1" fontWeight="bold">
          TaskFlow
        </Typography>

        {user && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body1" sx={{ display: { xs: "none", sm: "block" } }}>
              Hello, {user.displayName}
            </Typography>

            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
              startIcon={<Logout />}
              sx={{
                px: 2,
                py: 1,
                borderRadius: 1,
                textTransform: "none",
              }}
            >
              Logout
            </Button>

            {/* Mobile-only icon button */}
            <IconButton
              color="inherit"
              onClick={handleLogout}
              sx={{ display: { xs: "flex", sm: "none" } }}
            >
              <Logout />
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
