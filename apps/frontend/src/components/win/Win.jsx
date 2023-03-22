import React, { useEffect } from "react";
import WinLayout from "./layout/Win-layout";
import Socket from "./socket/Socket";
function Win() {
  useEffect(() => {
    // Here we will handle timer
    const handleTimer = (data) => {
      console.log("Minutes : " + data.min, "Seconds : " + data.sec);
    };
    Socket.on("timer", handleTimer);
    console.log(Socket.connected);
  }, []);

  return (
    <div className="win">
      <WinLayout />
    </div>
  );
}

export default Win;
