import { io } from "socket.io-client";
const URL = "http://127.0.0.1:8000";
const Socket = io(URL);
export default Socket;
