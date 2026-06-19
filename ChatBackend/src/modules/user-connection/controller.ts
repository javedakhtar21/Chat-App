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

    // if (!isNaN(parsedUserId)) {
    //   res.status(400).json({
    //     statusCode: 400,
    //     message: "userId is invalid, it should be a number",
    //     data: null,
    //   });
    //   return;
    // }

    const response = await UserConnectionService.getConnectionDetails({
      userId: parsedUserId,
    });
    res.status(200).json(response);
  }
}

export { UserConnectionController };
