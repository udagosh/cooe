import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
  const { loginWithRedirect, user, isAuthenticated, isLoading, logout } =
    useAuth0();
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
        <li className="user-name"></li>
      </ul>
      <div className="user-profile">
        <h2>{isLoading && "Loading your data.../"}</h2>
        <h2>{isAuthenticated && "Welcome " + user.name}</h2>
      </div>
    </>
  );
}

export default Navbar;
