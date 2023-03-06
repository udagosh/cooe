import React, { useEffect } from "react";
import "./Home.css";
import { useAuth0 } from "@auth0/auth0-react";
import { registerUser } from "../../../utils/user.utils";
function Home() {
  const { getAccessTokenSilently, user } = useAuth0();

  useEffect(() => {
    console.log(import.meta.env.VITE_AUTH0_API_AUDIENCE)
    getAccessTokenSilently().then(token => {
      registerUser(user, token).then(console.log).catch(console.error)
    }).catch(console.error)
  }, [getAccessTokenSilently, user]);

  return (
    <>
      <div className="amuse-box">
        <h2>amuse box</h2>
      </div>
      <div className="game-container">
        <div className="game">
          <div className="img">
            <img src="https://img.cooe.in/media/unnamed.webp" alt="" />
          </div>
          <div className="text">
            <h3 className="heading">Mario Kart Tour</h3>
            <p className="description">
              Challenge players worldwide in multiplayer! You can race against
              up to seven other players, whether they're registered as in-game
              friends
            </p>
            <div className="view-btn">
              <a href="/">View</a>
            </div>
          </div>
        </div>

        <div className="game">
          <div className="img">
            <img src="https://img.cooe.in/media/bts.webp" alt="" />
          </div>
          <div className="text">
            <h3 className="heading">Mario Kart Tour</h3>
            <div className="description">
              <p className="description">
                Challenge players worldwide in multiplayer! You can race against
                up to seven other players, whether they're registered as in-game
                friends
              </p>
            </div>
            <div className="view-btn">
              <a href="/">View</a>
            </div>
          </div>
        </div>

        <div className="game">
          <div className="img">
            <img src="https://img.cooe.in/media/unnamed_nx8P0yl.webp" alt="" />
          </div>
          <div className="text">
            <h3 className="heading">Mario Kart Tour</h3>
            <div className="description">
              <p className="description">
                Challenge players worldwide in multiplayer! You can race against
                up to seven other players, whether they're registered as in-game
                friends
              </p>
            </div>
            <div className="view-btn">
              <a href="/">View</a>
            </div>
          </div>
        </div>

        <div className="game">
          <div className="img">
            <img src="https://img.cooe.in/media/unnamed_gck4Dnp.webp" alt="" />
          </div>
          <div className="text">
            <h3 className="heading">Mario Kart Tour</h3>
            <div className="description">
              <p className="description">
                Challenge players worldwide in multiplayer! You can race against
                up to seven other players, whether they're registered as in-game
                friends
              </p>
            </div>
            <div className="view-btn">
              <a href="/">View</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
