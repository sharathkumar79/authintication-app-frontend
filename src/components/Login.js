// Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useHistory,Link } from 'react-router-dom';

const Login = () => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleLogin = async () => {
    // Validation
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      isValid = false;
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.password) {
      isValid = false;
      newErrors.password = 'Password is required.';
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    try {
      // Make an API request to your backend for login
      const response = await axios.post('http://localhost:3000/api/auth/login', formData);
      console.log(response.data); // Handle success message
      localStorage.setItem('token', response.data.token);
      history.push('/Posts'); // Redirect to dashboard after successful login
    } catch (error) {
      console.error(error.response.data); // Handle error
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded-md shadow-md w-full md:w-96">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Log In
        </h1>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Email:</label>
            <input
              className={`w-full mt-1 p-2 border rounded-md ${
                errors.email && 'border-red-500 focus:border-red-500'
              }`}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Password:</label>
            <input
              className={`w-full mt-1 p-2 border rounded-md ${
                errors.password && 'border-red-500 focus:border-red-500'
              }`}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <button
            className="w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-700"
            type="button"
            onClick={handleLogin}
          >
            Log In
          </button>
        </form>
        <div className="mt-4 text-center text-gray-600">
          Not registered?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
