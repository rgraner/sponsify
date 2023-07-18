import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';


function App() {

  return (
    <Router>
      <Navbar />
    </Router>
  );
}

export default App;
