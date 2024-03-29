import { FC, FormEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../home/common/Button/Button';
import { useAuth } from '../AuthContext';
import { apiService } from '../../../services/apiService';
import { LoginRequest } from '../../../interfaces/interfaces';
import './Login.css';

const Login: FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [credentials, setCredentials] = useState<LoginRequest>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // TODO: Use response message later
      await apiService.login(credentials);
      login();
      navigate('/home');
    } catch (error) {
      console.error('Error during login:', error);
      setError('Authentication failed. Please try again later.');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={credentials.email}
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
        required
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        required
      />

      <Button type="submit">Sign In</Button>

      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default Login;
