import { verifyToken } from "../util/utils";

export const socketAuthMiddleware = (socket: any, next: any) => {
  debugger;
//   console.log("Socket: ", socket);
  const token = socket?.handshake?.auth?.token;

  if (!token) {
    return next(new Error("Authentication token missing"));
  }

  const decodedData = verifyToken(token);
  if (!decodedData) {
    return next(new Error("User data is not attached in token"));
  }

  socket.user = decodedData;

  next();
};
