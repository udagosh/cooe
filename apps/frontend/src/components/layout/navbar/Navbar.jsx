import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

import {
  FaUser,
  FaGamepad,
  FaHome,
  FaMoneyCheck,
  FaBars,
} from "react-icons/fa";
import { TbDoorEnter, TbDoorExit } from "react-icons/tb";
import { RxCrossCircled } from "react-icons/rx";

import "./Navbar.css";
import { useState } from "react";

function Navbar() {
  const [navState, setNavState] = useState(false);
  const toggleNav = () => {
    if (navState) {
      setNavState(false);
      return;
    }
    setNavState(true);
  };
  const { loginWithRedirect, isAuthenticated, logout, isLoading, user } =
    useAuth0();
  return (
    <>
      {!isLoading && (
        <nav className="navbar">
          {navState && <div className="cover-screen" onClick={toggleNav}></div>}
          <div className="primary-menu-container">
            <div className="nav-toggle-btn">
              <button onClick={toggleNav}>
                {navState ? <RxCrossCircled /> : <FaBars />}
              </button>
            </div>
            <ul className="nav-links-container primary-menu">
              {isAuthenticated && (
                <li className="nav-item user-name">
                  <span>Hello, </span>
                  {user.name}
                </li>
              )}
              <li className="nav-item">
                <Link to="/dashboard">
                  <FaUser /> Dashboard
                </Link>
              </li>
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
            </ul>
          </div>
          <ul
            className={
              "secondry-menu nav-links-container" + (navState ? " open" : "")
            }
          >
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
              <Link to="/recharge">
                <FaMoneyCheck /> Recharge
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}

export default Navbar;
