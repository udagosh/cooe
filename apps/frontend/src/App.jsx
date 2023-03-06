import React from "react";
import "./App.css";

// Importing the required modules

// React router dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Layout/Navbar";
import Auth from "./components/auth/auth";

// Importing the pages
import Home from "./components/pages/home/Home";

function App() {
  return (
    <>
      <Auth />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
