import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppDispatch, RootState, store } from './app/store';
import { loginWithGoogle } from './features/auth/authSlice';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import PrivateRoute from './components/PrivateRoute';
import ProtectedRoute from './components/ProtectedRoute';
import { UserRole } from './utils/roles';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Check if user is already authenticated
    if (!user) {
      dispatch(loginWithGoogle());
    }
  }, [dispatch, user]);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute requiredRole={UserRole.ADMIN}>
            <AdminDashboardPage />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
};

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWrapper;