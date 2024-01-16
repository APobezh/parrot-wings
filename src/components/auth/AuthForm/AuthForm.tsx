import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Login from './../Login/Login';
import SignUp from './../SignUp/SignUp';
import './AuthForm.css';

const AuthForm: FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const handleTabChange = (tab: 'login' | 'signup') => {
    setActiveTab(tab);
  };

  return (
    <div className="auth-form-container">
      <div className="tabs-container">
        <button
          className={activeTab === 'login' ? 'active' : ''}
          onClick={() => handleTabChange('login')}
        >
          Sign In
        </button>
        <button
          className={activeTab === 'signup' ? 'active' : ''}
          onClick={() => handleTabChange('signup')}
        >
          Sign Up
        </button>
      </div>
      {activeTab === 'login' ? <Login /> : <SignUp />}
    </div>
  );
};

export default AuthForm;
