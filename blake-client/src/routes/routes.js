import React, { useState } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from '../pages/Home/home';
import Signup from '../pages/Sign up/signup';
import About from '../pages/About/about';
import Contact from '../pages/Contact Us/contact';
import Login from '../pages/Login/login';
import Dashboard from '../pages/dashboard/dashboard';
import LoginstatusContext from '../context';

const Routes = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <LoginstatusContext.Provider value={{ loggedIn, setLoggedIn }}>
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/contact" component={Contact} />
          {/* to be replaced by About page when done */}
          <Route path="/about" component={Dashboard} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    </LoginstatusContext.Provider>
  );
};

export default Routes;
