import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store"; // Ensure correct import
import { loginWithGoogle } from "../auth/authSlice";
import { Button, Box, Typography, CircularProgress } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

const GoogleLoginButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.auth);

  const handleLogin = async () => {
    const resultAction = await dispatch(loginWithGoogle());

    if (loginWithGoogle.fulfilled.match(resultAction)) {
      navigate("/dashboard");
    }
  };

  return (
    <Button
      variant="outlined"
      onClick={handleLogin}
      disabled={loading}
      sx={{
        px: 3,
        py: 1.5,
        borderRadius: 1,
        borderColor: "grey.300",
        bgcolor: "background.paper",
        color: "text.primary",
        "&:hover": {
          bgcolor: "grey.50",
          borderColor: "grey.400",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <GoogleIcon color="primary" />
        {loading ? (
          <CircularProgress size={20} />
        ) : (
          <Typography variant="body1" fontWeight="medium">
            Continue with Google
          </Typography>
        )}
      </Box>
    </Button>
  );
};

export default GoogleLoginButton;
