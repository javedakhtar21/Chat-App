import app from "./app";
import http from "http";
import { Server } from "socket.io";
import { SocketConnection } from "./socket/socket-connection/socket";

// creating the http server
const server = http.createServer(app);

// initializing the socket connection
const IO = new Server(server, {
  cors: { origin: "*", methods: ["get", "post", "put", "patch", "delete"] },
  transports: ["websocket"],
});

// passing the io to the socket creation class
new SocketConnection(IO);

server.listen(process.env.MAIN_PORT, () => {
  console.log(
    `server is started on http://localhost:${process.env.MAIN_PORT} at ${process.env.ENV} environment`
  );
});
