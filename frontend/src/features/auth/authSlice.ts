import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInWithPopup, signOut, UserCredential } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebaseConfig";
import axios from "axios";
import { UserRole } from "../../utils/roles";
import {jwtDecode } from "jwt-decode";

interface AuthState {
  token: string | null;
  user: any | null;
  loading: boolean;
  error: string | null;
}

// Check for existing auth state in localStorage
const loadInitialState = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  const decodedToken = token ? jwtDecode(token) : null;

  return {
    token: token || null,
    user: user ? JSON.parse(user) : null,
    loading: false,
    error: null,
  };
};

const initialState: AuthState = loadInitialState();

export const loginWithGoogle = createAsyncThunk(
  "auth/login",
  async (_, { rejectWithValue }) => {
    try {
      const result: UserCredential = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      const response = await axios.post(
        "https://task-flow-xaku.onrender.com/api/auth/google", 
        { token: idToken }
      );

      // Ensure user has a role, default to USER if not provided
      const userData = response.data.user;
      if (!userData.role) {
        userData.role = UserRole.USER;
      }

      // Store in localStorage
      localStorage.setItem('token', JSON.stringify(response.data.token));
      localStorage.setItem('user', JSON.stringify(userData));

      return { token: response.data.token, user: userData };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue('Unknown error occurred');
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await signOut(auth);
  // Clear localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('user');
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    clearAuthError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Login failed";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.user = null;
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;