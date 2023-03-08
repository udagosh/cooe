import React, { useEffect, useContext } from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/navbar/Navbar";

// Importing the pages
import Home from "./components/pages/home/Home";
import Dashboard from "./components/pages/dashboard/Dashboard";

// Importing the user authentication configuration
import { useAuth0 } from "@auth0/auth0-react";
import userContext from "./contexts/user-context/userContext";

// Importing the Win game
import Win from "./components/win/Win";

function App() {
  const { getUserInfo } = useContext(userContext);
  const { getAccessTokenSilently, user } = useAuth0();
  useEffect(() => {
    getUserInfo(getAccessTokenSilently, user);
  }, [getAccessTokenSilently, user]);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/win" element={<Win />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
