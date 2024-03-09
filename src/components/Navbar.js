// Navbar.js

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ isAuthenticated }) => {
  const location = useLocation();

  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">My MERN App</h1>
        <div className="flex items-center">
          <NavLink to="/" isActive={location.pathname === '/'}>
            Home
          </NavLink>
          <NavLink to="/posts" isActive={location.pathname === '/posts'}>
            Posts
          </NavLink>
          {/* Add more links as needed */}
          {isAuthenticated ? (
            <NavLink to="/my-account" isActive={location.pathname === '/my-account'}>
              My Account
            </NavLink>
          ) : (
            <NavLink to="/Login" isActive={location.pathname === '/signin'}>
              Sign In
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, isActive, children }) => (
  <Link to={to} className={`mx-2 hover:underline ${isActive ? 'font-bold' : ''}`}>
    {children}
  </Link>
);

export default Navbar;
