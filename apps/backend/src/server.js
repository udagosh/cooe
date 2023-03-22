import express from "express";
import http from "http";
import cors from "cors";
import { Server as socketServer } from "socket.io";

// for authentication
import { auth } from "express-oauth2-jwt-bearer";
import axios from "axios";

import Game from "./game/game.js";
const GameInstance = new Game();

import orderroutes from "./routes/Order.js";
import userroutes from "./routes/User.js";

import errorMiddleware from "./middlewares/Error.js";

const App = express();
const server = http.createServer(App);
const io = new socketServer(server);

// const jwtCheck = auth({
//   audience: "http://cooe/api",
//   issuerBaseURL: "https://dev-ewmrc8c2y6cijr6g.us.auth0.com/",
//   tokenSigningAlg: "RS256",
// });

App.use(cors());
App.use(express.json());
App.use(express.static("public"));

// App.use(jwtCheck);

App.use("/order", orderroutes);
App.post("/order/create", GameInstance.createContract);
App.use("/user", userroutes);

App.use(errorMiddleware);

App.get("/", (req, res) => {
  res.sendFile("index.html");
});

GameInstance.provideIo(io);
io.on("connection", (socket) => {
  socket.join("win-game");
});

export { GameInstance };

export default server;
