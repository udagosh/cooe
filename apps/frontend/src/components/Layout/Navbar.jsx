import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  return (
    <>
      <ul className="nav-container">
        <li className="nav-item">
          {!isAuthenticated ? (
            <button className="login-btn" onClick={() => loginWithRedirect()}>
              Login
            </button>
          ) : (
            <button
              className="logout"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Logout
            </button>
          )}
        </li>
      </ul>
    </>
  );
}

export default Navbar;
