import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';

const Login = () => {
  const navigate = useNavigate();
  const { signIn, authError, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn(formData.email, formData.password);
      
      if (result?.success) {
        navigate('/main-dashboard');
      }
    } catch (error) {
      console.log('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signIn('guest@foodplanner.com', 'guest123');
      if (result?.success) {
        navigate('/main-dashboard');
      }
    } catch (error) {
      console.log('Guest login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="ChefHat" size={32} color="white" />
          </div>
          <h2 className="text-3xl font-bold text-foreground">Welcome Back</h2>
          <p className="text-muted-foreground mt-2">
            Sign in to your Food Planner account
          </p>
        </div>

        {/* Error Message */}
        {authError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={20} className="text-red-500" />
              <p className="text-red-700 text-sm">{authError}</p>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || loading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        {/* Guest Login */}
        <div className="text-center">
          <Button
            variant="outline"
            onClick={handleGuestLogin}
            disabled={isLoading || loading}
            className="w-full"
          >
            Continue as Guest
          </Button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;