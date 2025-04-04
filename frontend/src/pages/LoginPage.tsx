import GoogleLoginButton from '../features/auth/GoogleLoginButton';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">Welcome to TaskFlow</h1>
          <p className="text-gray-600">Sign in to manage your tasks</p>
        </div>
        
        <div className="mb-6">
          <GoogleLoginButton />
        </div>

        <div className="text-center text-sm text-gray-600">
          <p>By signing in, you agree to our</p>
          <p>
            <Link to="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </Link> and {' '}
            <Link to="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;