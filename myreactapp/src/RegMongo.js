import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyRegisterForm = () => {
  const [formData, setFormData] = useState({
    Date: '',
    name: '',
    email: '',
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);

        alert('Registration successful');
        navigate("/login")
      } else {
        console.error('Registration failed');
        alert('Error during registration.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="container mt-5 registration-form-container col-4" style={{ padding: '20px', border: '1px solid', borderRadius: '10px', backgroundColor: 'lightgrey',marginBottom:'20px'}}>
      <h2>Registration Form</h2>
      <form onSubmit={handleRegister}>
   
        <div className="mb-3 col-12">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required={true}
          />
        </div>
        <div className="mb-3 col-12">
          <label htmlFor="id" className="form-label">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="id"
            name="id"
            value={formData.date}
            onChange={handleInputChange}
            required={true}
          />
        </div>
        <div className="mb-3 col-12">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required={true}
          />
        </div>
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
          Register
        </button>
        <p style={{marginTop:'10px'}}> Already have an account? <a href='/login'>Login</a></p>
      </form>
    </div>
  );
};

export default MyRegisterForm;
