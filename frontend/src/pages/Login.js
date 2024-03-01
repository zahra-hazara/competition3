import React from 'react';
import LoginForm from '../hooks/useLogin.js';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  return (
    <LoginForm setIsAuthenticated={setIsAuthenticated} navigate={navigate} />
  );
};
  
  export default Login;
  