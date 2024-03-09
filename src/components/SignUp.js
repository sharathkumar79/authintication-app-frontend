/* eslint-disable react-hooks/exhaustive-deps */









// SignUp.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory , Link} from 'react-router-dom';

const SignUp = () => {


  const history = useHistory();
  const [verificationMessage, setVerificationMessage] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    acceptTerms: '',
  });

  const [showPassword, setShowPassword] = useState(false);


  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    setErrors({
      ...errors,
      [name]: '', // Clear the error message when the user starts typing again
    });
  };

  const handleSignUp = async () => {
    // Validation...
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      isValid = false;
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.username) {
      isValid = false;
      newErrors.username = 'Username is required.';
    }

    if (!formData.password || formData.password.length < 6) {
      isValid = false;
      newErrors.password = 'Password must be at least 6 characters long.';
    }

    if (formData.password !== formData.confirmPassword) {
      isValid = false;
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!formData.acceptTerms) {
      isValid = false;
      newErrors.acceptTerms = 'You must accept the terms and conditions.';
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    try {
      // Make an API request to your backend for signup
      const response = await axios.post('https://authentication-98kmv5zhe-sharathkumar79s-projects.vercel.appapi/auth/signup', formData);
      setVerificationMessage('Verification email sent. Please check your email and verify.');
      setFormData({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
      });

    } catch (error) {
      if (error.response && error.response.status === 400) {
        // User already exists
        setErrors({ ...errors, email: 'User already exists. Please login.' });
      } else {
        console.error(error.response.data); // Handle other errors
      }
    }
  };

  // Function to check email verification status
  const checkVerificationStatus = async () => {
    try {
      // Make an API request to your backend to check verification status
      const response = await axios.get('https://authentication-98kmv5zhe-sharathkumar79s-projects.vercel.app/api/auth/check-verification', {
        params: { email: formData.email },
      });

      console.log('Verification Status Response:', response.data); // Log the response
      if (response.data.verified) {
        setVerificationMessage('Email verified. Redirecting to the home page.');
        console.log(response.data)
        localStorage.setItem('token', response.data.token);
        setTimeout(() => {
          history.push('/Posts');
        }, 2000); // Redirect after 2 seconds (adjust as needed)
      } else {
        // If not verified, continue checking after a delay
        setTimeout(checkVerificationStatus, 5000); // Check again after 5 seconds (adjust as needed)
      }
    } catch (error) {
      console.error(error.response.data); // Handle error
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // useEffect to start checking verification status after component mounts
  useEffect(() => {
    if (verificationMessage.includes('Verification email sent')) {
      checkVerificationStatus();
    }
  }, [verificationMessage]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white p-8 rounded-md shadow-md w-full md:w-96">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Sign Up
        </h1>
        <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Email:</label>
          <input
            className={`w-full mt-1 p-2 border rounded-md ${errors.email && 'border-red-500'}`}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Username:</label>
          <input
            className={`w-full mt-1 p-2 border rounded-md ${errors.username && 'border-red-500'}`}
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
        </div>
        <div className="relative mb-4">
            <label className="block text-sm font-medium text-gray-600">Password:</label>
            <input
              className={`w-full mt-1 p-2 border rounded-md ${
                errors.password && 'border-red-500 focus:border-red-500'
              }`}
              type={showPassword ? 'text' : 'password'} // Added
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility} // Added
            >
              {showPassword ? (
                // Added
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              ) : (
                // Added
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2 9l10 10 10-10"
                  ></path>
                </svg>
              )}
            </div>
          </div>
          <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Confirm Password:</label>
          <input
            className={`w-full mt-1 p-2 border rounded-md ${errors.confirmPassword && 'border-red-500'}`}
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>
        <div className="mb-4">
          <input
            className={`mr-2 ${errors.acceptTerms && 'border-red-500'}`}
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
          />
          <label className="text-sm text-gray-600">
            I accept the <span className="underline cursor-pointer">terms and conditions</span>.
          </label>
          {errors.acceptTerms && <p className="text-red-500 text-sm mt-1">{errors.acceptTerms}</p>}
        </div>

          <button
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
            type="button"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </form>
        {verificationMessage && (
          <p className="text-green-500 text-sm mt-4">{verificationMessage}</p>
        )}
        {errors.email && (
          <p className="text-red-500 text-sm mt-4">{errors.email}</p>
        )}
        <div className="mt-4 text-center text-gray-600">
          Already registered?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
