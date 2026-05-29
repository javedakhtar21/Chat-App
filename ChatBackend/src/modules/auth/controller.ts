import { Request, Response } from "express";
import { authService } from "./service";

class AuthController {
  public register = async (req: Request, res: Response): Promise<void> => {
    const requestBody = req.body;
    if (!requestBody) {
      res.status(400).json({ message: "Request body is missing" });
      return;
    }

    const response = await authService.register(requestBody);
    res.status(response.statusCode).json(response);
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    debugger
    const requestBody = req.body;
    if (!requestBody) {
      res.status(400).json({ message: "Request body is missing" });
      return;
    }

    const response = await authService.login(requestBody);
    res.status(response.statusCode).json(response);
  };

  public forgetPassword= async(req: Request, res: Response): Promise<void> => {
    debugger
    const requestBody = req.body;
    if (!requestBody) {
      res.status(400).json({ message: "Request body is missing" });
      return;
    }

    const response= await authService.forgetPassword(requestBody);
    res.status(response.statusCode).json(response);
  }
}

export const                                                                                                                                                                    authController = new AuthController();
