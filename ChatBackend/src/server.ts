import app from "./app";
import http from "http";
import { Server } from "socket.io";
import { SocketConnection } from "./socket/socket";
import { socketAuthMiddleware } from "./middleware/middleware";
import dotenv from "dotenv";
dotenv.config();

// Creating the http server
const server = http.createServer(app);

// port of server
const PORT = process.env.MAIN_PORT || 3000;
const ENV = process.env.ENV || "development";

// Initializing the socket connection
const IO = new Server(server, {
  cors: { origin: "*", methods: ["get", "post", "put", "patch", "delete"] },
});

// Token verifier middleware
IO.use(socketAuthMiddleware);

// Passing the io to the socket creation class
new SocketConnection(IO);

server.listen(PORT, () => {
  console.log(
    `server is started on http://localhost:${PORT} at ${ENV} environment`,
  );
});
