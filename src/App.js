// App.js

import React, {useState}from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';
import Posts from './components/Posts';
import './index.css'; // Import the Tailwind CSS styles
import Navbar from './components/Navbar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/posts" component={Posts} />
      </Switch>
    </Router>
  );
}

export default App;
