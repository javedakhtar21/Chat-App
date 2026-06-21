import { Request, Response } from "express";
import { MessageService } from "./service";

export class MessageController {
  static getMessages = async (req: Request, res: Response) => {
    try {
      const { conversationId } = req.params;
        const { userId } = req.user;

      if (!conversationId) {
        res.status(400).json({
          statusCode: 400,
          message: "conversationId is required",
          data: null,
        });
        return;
      }

      const response = await MessageService.getMessages(conversationId, userId);

      res.status(response.statusCode).json({
        statusCode: response.statusCode || 200,
        message: response.message || "Messages fetched successfully",
        data: response.data || [],
      });
      return;
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        statusCode: 500,
        message: err.message || "Internal server error",
        data: null,
      });
      return;
    }
  };
}
