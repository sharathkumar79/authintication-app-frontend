// Home.js

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Awesome MERN App</h1>
        <p className="text-lg mb-6">
          Explore and enjoy the exciting world of technology and share your thoughts with the community.
        </p>
        <Link to="/Login">
          <button className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-700">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
