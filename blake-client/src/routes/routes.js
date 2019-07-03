import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from '../pages/Home/home';
import Signup from '../pages/Sign up/signup';
import About from '../pages/About/about';
import Contact from '../pages/Contact Us/contact';

const routes = (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route path="/signup" component={Signup} />
    </div>
  </Router>
);

export default routes;
