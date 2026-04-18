import { io, Socket } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_SOCKET_URL || "http://localhost:3000";

const socket: Socket = io(SOCKET_URL, {
  autoConnect: false,
  transports: ["websocket"],
});

export { socket as customSocket };
