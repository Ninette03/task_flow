import { JSX } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const user = useSelector((state: any) => state.auth.user);
  return user ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;