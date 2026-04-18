import JWT from "jsonwebtoken";

export const verifyToken = (token: string) => {
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


const createToken = (data: any) => {
  return JWT.sign(data, process.env.JWT_SECRET as string, { expiresIn: "24h" })

}