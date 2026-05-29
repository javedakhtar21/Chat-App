import { stat } from "fs";
import JWT from "jsonwebtoken";
class TokenService {
  constructor() {}

  verifyToken = (token: string) => {
    try {
      if (!token) {
        return {
          status: false,
          message: "Token is required",
        };
      }
      const decoded = JWT.verify(token, process.env.JWT_SECRET as string);
      return {
        status: true,
        data: decoded,
      };
    } catch (error) {
      if (error instanceof JWT.TokenExpiredError) {
        return {
          status: false,
          message: "token is expired",
        };
      }

      if (error instanceof JWT.JsonWebTokenError) {
        return {
          status: false,
          message: "invalid token",
        };
      }

      return {
        status: false,
        message: "Token verification failed",
      };
    }
  };

  createToken = (data: any, options?: any) => {
    return JWT.sign(data, process.env.JWT_SECRET as string, {
      expiresIn: options.tokenExpiry || "24h",
    });
  };
}

const TokenHandler = new TokenService();
export { TokenHandler };
