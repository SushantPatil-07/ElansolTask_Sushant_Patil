import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const queryString = `?username=${formData.username}&password=${formData.password}`;
      const response = await fetch(`http://localhost:9000/login${queryString}`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);

        localStorage.setItem('loggedInUser', data.token);

        alert('Login successful');
        navigate('/dashboard');
      } else {
        console.error('Login failed');
        alert('Please enter valid username and password.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="container mt-5 login-form-container col-4" style={{ padding: '20px', border: '1px solid', borderRadius: '10px', backgroundColor: 'lightblue' }}>
      <h2>Login Form</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3 col-12">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required={true}
          />
        </div>
        <div className="mb-3 col-12">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required={true}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <p> Don't have an account? <a href='/signup'>Signup</a></p>
      </form>
    </div>
  );
};

export default LoginForm;
