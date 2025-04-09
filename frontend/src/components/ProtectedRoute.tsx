import { JSX } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '../app/store';
import { Permission, UserRole, hasPermission } from '../utils/roles';

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredPermissions?: Permission[];
  requiredRole?: UserRole;
}

const ProtectedRoute = ({ 
  children, 
  requiredPermissions = [], 
  requiredRole 
}: ProtectedRouteProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  
  // If no user is logged in, redirect to login page
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  // Get user role from the user object
  const userRole = user.role as UserRole || UserRole.USER;
  
  // Check if user has the required role
  if (requiredRole && userRole !== requiredRole && userRole !== UserRole.ADMIN) {
    // Admin has access to everything
    return <Navigate to="/dashboard" replace />;
  }
  
  // Check if user has all required permissions
  if (requiredPermissions.length > 0) {
    const hasAllRequiredPermissions = requiredPermissions.every(permission => 
      hasPermission(userRole, permission)
    );
    
    if (!hasAllRequiredPermissions) {
      return <Navigate to="/dashboard" replace />;
    }
  }
  
  // User has the required role and permissions, render the protected component
  return children;
};

export default ProtectedRoute; 