// import { verifyToken } from "../util/utils";
import { TokenHandler } from "../util/TokenHandler";

export const socketAuthMiddleware = (socket: any, next: any) => {
  // debugger;
  //   console.log("Socket: ", socket);
  const token = socket?.handshake?.auth?.token;

  if (!token) {
    return next(new Error("Authentication token missing"));
  }

  const decodedData = TokenHandler.verifyToken(token);
  // if (!decodedData) {
  //   return next(new Error("User data is not attached in token"));
  // }

  if (!decodedData.status) {
    return next(
      new Error(decodedData.message || "User data is not attached in token"),
    );
  }

  socket.user = decodedData.data;

  next();
};
