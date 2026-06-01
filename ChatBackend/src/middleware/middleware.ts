import { TokenHandler } from "../util/TokenHandler";

export const socketAuthMiddleware = (socket: any, next: any) => {
  const token = socket?.handshake?.auth?.token;

  if (!token) {
    return next(new Error("Authentication token missing"));
  }

  const decodedData = TokenHandler.verifyToken(token);
  if (!decodedData.status) {
    return next(
      new Error(decodedData.message || "User data is not attached in token"),
    );
  }

  socket.user = decodedData.data;
  next();
};
