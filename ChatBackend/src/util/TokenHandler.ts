import JWT from "jsonwebtoken";
class TokenService {
  constructor() {}

  verifyToken = (token: string) => {
    try {
      if (!token) {
        return "please provide token!";
      }
      const decoded = JWT.verify(token, process.env.JWT_SECRET as string);
      return decoded;
    } catch (error) {
      return null;
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
