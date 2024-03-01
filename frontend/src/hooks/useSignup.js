import React, { useState } from 'react';
import useField from './useField'; // Importing the custom hook

const SignupForm = ({ setIsAuthenticated, navigate }) => {
  const email = useField('');
  const password = useField('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission logic
    // Replace this with your actual API call or form submission logic
    const formData = { email: email.value, password: password.value,  };

    // Example: Replace this with your actual API endpoint
    fetch('/api/users/register', {
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
          throw new Error('Signup failed');
        }
      })
      .then((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        setSignupSuccess(true);
        setIsAuthenticated(true);
        navigate('/dashboard');
      })
      .catch((error) => {
        setSignupSuccess(false);
        setError(error.message);
        
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div>
      <h2>Signup</h2>
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
        {isSubmitting && <p>Signing up...</p>}
        {signupSuccess && <p>Signup successful!</p>}
        {error && <p>Error: {error}</p>}

        {/* Submit button */}
        <button type="submit" disabled={isSubmitting}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;