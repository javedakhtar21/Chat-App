import { NextFunction, Request, Response } from "express";
import { TokenHandler } from "../util/TokenHandler";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

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

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1] as string;
  if (!token) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
  const decoded = TokenHandler.verifyToken(token);

  if (!decoded.status) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  req.user = decoded.data;
  next();
};
