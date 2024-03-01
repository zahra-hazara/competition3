// SignupComponent.js
import React from 'react';
import SignupForm from '../hooks/useSignup.js';
import { useNavigate } from 'react-router-dom';

const Signup = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  return (
    <SignupForm setIsAuthenticated={setIsAuthenticated} navigate={navigate} />
  );
};
  
  export default Signup;
  