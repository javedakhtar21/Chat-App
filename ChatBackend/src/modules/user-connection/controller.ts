import { Request, Response } from "express";
import { UserConnectionService } from "./service";

class UserConnectionController {
  constructor() {}

  static async getConnectionDetails(req: Request, res: Response) {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({
        statusCode: 400,
        message: "userId is required",
        data: null,
      });
      return;
    }

    const parsedUserId = parseInt(userId);

    const response = await UserConnectionService.getConnectionDetails({
      userId: parsedUserId,
    });
    res.status(response.statusCode).json(response);
  }
}

export { UserConnectionController };
