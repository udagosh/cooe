import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

function auth() {
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
  const getToken = async () => {
    const token = await getAccessTokenSilently();
  };
  useEffect(() => {
    // getToken();
  }, []);

  return (
    <>
      <div className="user-profile">
        <h2>{isAuthenticated && "Welcome " + user.name}</h2>
      </div>
    </>
  );
}

export default auth;
