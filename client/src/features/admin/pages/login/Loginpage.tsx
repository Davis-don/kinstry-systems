import './loginpage.css';
import { useState } from 'react';
import { toast, Toaster } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

function Loginpage() {
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState({ username: false, password: false });
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  
  // Get login function from store
  const login = useAuthStore((state) => state.login);

  const handleFocus = (field: 'username' | 'password') => {
    setIsFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: 'username' | 'password') => {
    setIsFocused(prev => ({ ...prev, [field]: false }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  const server_url = import.meta.env.VITE_API_URL;

  
  // Login mutation with spinner
  const loginMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${server_url}/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Login failed');
      }
      
      return res.json();
    },
    onSuccess: (data) => {
      // Store tokens in auth store
      login(data);
      if(data.role=='superadmin'){
        toast.success('Login successful!');
        setTimeout(() => {
        // Redirect to admin account page
        navigate('/super-admin-account');
      }, 3000);
      }
      else{
      toast.info('We are implementing this logic!');
      }
      


      
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Login failed. Please check your credentials.');
      console.error('Login failed:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate();
  }

  return (
    <div className="overall-login-page-container">
      <Toaster position="top-center" richColors />
      
      {/* Subtle Background Glow */}
      <div className="login-background-glow"></div>
      
      {/* Floating Particles */}
      <div className="floating-particles">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="particle" style={{
            animationDelay: `${i * 0.5}s`,
            left: `${10 + (i * 10)}%`,
            top: `${20 + (i * 5)}%`
          }}></div>
        ))}
      </div>

      {/* Main Login Card */}
      <div className="login-card">
        {/* Card Glow Border */}
        <div className="card-glow-border"></div>
        
        {/* Card Content */}
        <div className="card-content">
          {/* Logo and Header */}
          <div className="login-header">
            <div className="company-logo">
              <div className="logo-symbol">KS</div>
              <div className="logo-glow"></div>
            </div>
            <h1 className="company-name">KInstry Systems</h1>
            <p className="login-subtitle">Secure Enterprise Access Portal</p>
          </div>

          {/* Login Form */}
          <form className="login-form" onSubmit={handleSubmit}>
            {/* Username Field */}
            <div className="form-group">
              <label htmlFor="username" className="input-label">
                <span className="label-icon">👤</span>
                <span className="label-text">Username</span>
              </label>
              <div className={`input-wrapper ${isFocused.username ? 'focused' : ''}`}>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  className="form-input"
                  onFocus={() => handleFocus('username')}
                  onBlur={() => handleBlur('username')}
                  autoComplete="username"
                  name='username'
                  onChange={handleChange}
                  disabled={loginMutation.isPending}
                />
                <div className="input-highlight"></div>
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password" className="input-label">
                <span className="label-icon">🔒</span>
                <span className="label-text">Password</span>
              </label>
              <div className={`input-wrapper ${isFocused.password ? 'focused' : ''}`}>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="form-input"
                  onFocus={() => handleFocus('password')}
                  onBlur={() => handleBlur('password')}
                  autoComplete="current-password"
                  name='password'
                  onChange={handleChange}
                  disabled={loginMutation.isPending}
                />
                <div className="input-highlight"></div>
              </div>
            </div>

            {/* Submit Button with Spinner */}
            <button 
              type="submit" 
              className="submit-button"
              disabled={loginMutation.isPending}
            >
              <span className="button-text">
                {loginMutation.isPending ? (
                  <>
                    <span className="loading-spinner"></span>
                    Signing In...
                  </>
                ) : 'Sign In'}
              </span>
              <div className="button-glow"></div>
            </button>
          </form>

          {/* Footer */}
          <div className="login-footer">
            <p className="footer-text">
              Need help? <a href="#" onClick={(e) => e.preventDefault()}>Contact Support</a>
            </p>
            <div className="security-badge">
              <span className="secure-icon">🔐</span>
              <span className="secure-text">256-bit SSL Encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;