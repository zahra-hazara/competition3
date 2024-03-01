import React, { useState } from 'react';
import useField from './useField'; // Importing the custom hook

const LoginForm = ({ setIsAuthenticated, navigate }) => {
  const email = useField('');
  const password = useField('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate login logic
    // Replace this with your actual API call or authentication logic
    const formData = { email: email.value, password: password.value };

    // Example: Replace this with your actual API endpoint
    fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Login failed');
        }
      })
      .then((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        setLoginSuccess(true);
        setIsAuthenticated(true);
        navigate('/');
      })
      .catch((error) => {
        setLoginSuccess(false);
        setError(error.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };


  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {/* Email field */}
        <label>
          Email:
          <input type="text" {...email} />
        </label>
        <br />
        {/* Password field */}
        <label>
          Password:
          <input type="password" {...password} />
        </label>
        <br />

        {/* Submission status */}
        {isSubmitting && <p>Logging in...</p>}
        {loginSuccess && <p>Login successful!</p>}
        {error && <p>Error: {error}</p>}

        {/* Submit button */}
        <button type="submit" disabled={isSubmitting}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;