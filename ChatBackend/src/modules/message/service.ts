import { MessageModel } from "./model";
import { ConversationMemberModel } from "../conversation/model";

export class MessageService {
  static getMessages = async (conversationId: string, userId: number) => {
    const isMember = await ConversationMemberModel.findOne({
      conversationId,
      userId,
    });

    if (!isMember) {
      return {
        statusCode: 403,
        message: "You are not a member of this conversation",
        data: [],
      };
    }

    const messages = await MessageModel.find({
      conversationId,
    })
      .sort({
        createdAt: 1,
      })
      .limit(30);

    return {
      statusCode: 200,
      message: "Messages fetched successfully",
      data: messages || [],
    };
  };
}
