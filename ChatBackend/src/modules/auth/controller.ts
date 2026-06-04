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
    const requestBody = req.body;
    if (!requestBody) {
      res.status(400).json({ message: "Request body is missing" });
      return;
    }

    const response = await authService.login(requestBody);
    res.status(response.statusCode).json(response);
  };

  // logout controller
  public logout = async (req: Request, res: Response): Promise<void> => {
    const reqestBody = req.body;

    if (!reqestBody) {
      res
        .status(400)
        .json({
          statusCode: 400,
          message: "Request body is missing",
          data: null,
        });
      return;
    }

    if (!reqestBody.userId) {
      res
        .status(400)
        .json({ statusCode: 400, message: "UserId is required", data: null });
      return;
    }

    const response = await authService.logout(reqestBody);
    res.status(response.statusCode).json(response);
  };

  public forgetPassword = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const requestBody = req.body;
    if (!requestBody) {
      res.status(400).json({ message: "Request body is missing" });
      return;
    }

    const response = await authService.forgetPassword(requestBody);
    res.status(response.statusCode).json(response);
  };

  public resetPassword = async (req: Request, res: Response): Promise<void> => {
    const requestBody = req.body;
    if (!requestBody) {
      res.status(400).json({ message: "Request body is missing" });
      return;
    }

    const { token, newPassword, confirmPassword } = requestBody;
    const response = await authService.resetPassword(
      token,
      newPassword,
      confirmPassword,
    );
    res.status(response.statusCode).json(response);
  };
}

const authController = new AuthController();
export { authController };
