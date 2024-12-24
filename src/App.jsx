import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Parser from './pages/Parser';
import Backend from './pages/Backend';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/parser" element={<Parser />} />
        <Route path="/backend" element={<Backend />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
