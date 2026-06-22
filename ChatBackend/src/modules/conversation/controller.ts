import { Request, Response } from "express";
import { ConversationService } from "./service";

export class ConversationController {
  static getConversations = async (req: Request, res: Response) => {
    try {
      //   const { userId } = req.params;
      debugger;
      const { UserId } = req.user;
      if (!UserId) {
        res.status(400).json({
          statusCode: 400,
          message: "User ID is required",
          data: [],
        });
        return;
      }

      const parsedUserId = Number(UserId);
      if (isNaN(parsedUserId)) {
        res.status(400).json({
          statusCode: 400,
          message: "Invalid user ID",
          data: [],
        });
        return;
      }

      const response = await ConversationService.getConversations(parsedUserId);
      res.status(response.statusCode).json({
        statusCode: response.statusCode,
        message: response.message,
        data: response.data,
      });
      return;
    } catch (error: unknown) {
      const err = error as Error;

      res.status(500).json({
        statusCode: 500,
        message: err.message || "Internal server error",
        data: [],
      });

      return;
    }
  };

  //   create conversation
  static createConversation = async (req: Request, res: Response) => {
    try {
      const { senderId, receiverId } = req.body;

      if (!senderId || !receiverId) {
        res.status(400).json({
          statusCode: 400,
          message: "senderId and receiverId are required",
          data: [],
        });
        return;
      }

      const parsedSenderId = Number(senderId);
      const parsedReceiverId = Number(receiverId);

      if (isNaN(parsedSenderId) || isNaN(parsedReceiverId)) {
        res.status(400).json({
          statusCode: 400,
          message: "Invalid senderId or receiverId",
          data: [],
        });
        return;
      }

      const conversation = await ConversationService.createConversation(
        parsedSenderId,
        parsedReceiverId,
      );

      res.status(conversation.statusCode).json({
        statusCode: conversation.statusCode,
        message: conversation.message,
        data: conversation.data,
      });
      return;
    } catch (error: unknown) {
      const err = error as Error;
      res.status(500).json({
        statusCode: 500,
        message: err.message || "Internal server error",
        data: [],
      });
    }
  };
}
