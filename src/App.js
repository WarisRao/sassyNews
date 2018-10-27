import React from 'react';
//import Route from 'react-router-dom/Route';
//import Switch from 'react-router-dom/Switch';
import Home from './Home';

import './App.css';
import Navigation from './Navigation';
import Footer from './Footer';

const App = () => (
  <div>
    <Navigation/>
    <Home/>
    <Footer/>
  </div>
);

export default App;
