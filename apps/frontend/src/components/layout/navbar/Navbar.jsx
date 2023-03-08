import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

import { FaUser, FaGamepad, FaHome } from "react-icons/fa";
import { TbDoorEnter, TbDoorExit } from "react-icons/tb";

import "./Navbar.css";

function Navbar() {
  const { loginWithRedirect, isAuthenticated, logout, isLoading, user } =
    useAuth0();
  return (
    <>
      {!isLoading && (
        <nav className="navbar">
          <ul className="nav-links-container">
            <li className="nav-item">
              {!isAuthenticated ? (
                <button
                  className="login-btn"
                  onClick={() => loginWithRedirect()}
                >
                  <TbDoorEnter />
                  Login
                </button>
              ) : (
                <button
                  className="logout"
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                >
                  <TbDoorExit /> Logout
                </button>
              )}
            </li>
            <li className="nav-item">
              <Link to="/">
                <FaHome /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/win">
                <FaGamepad />
                Win
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard">
                <FaUser /> Dashboard
              </Link>
            </li>
            {isAuthenticated && (
              <li className="nav-item user-name">
                <span>Hello, </span>
                {user.name}
              </li>
            )}
          </ul>
        </nav>
      )}
    </>
  );
}

export default Navbar;
