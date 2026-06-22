import { httpClient } from "../../axios/axios";

export class ConversationService {
  static getConversations = async () => {
    try {
      debugger
      const response = await httpClient.get(`/conversations`);
      const responseData = response.data;

      return {
        statusCode: responseData.statusCode,
        message: responseData.message,
        data: responseData.data,
      };
    } catch (error) {
      const err = error as Error;
      return {
        statusCode: 500,
        message: err.message || "Internal server error",
        data: [],
      };
    }
  };

  static createConversation = async (
    senderId: number,
    receiverId: number,
  ) => {
    try {
      const response = await httpClient.post(`/conversations`, {
        senderId,
        receiverId,
      });
      const responseData = response.data;

      return {
        statusCode: responseData.statusCode,
        message: responseData.message,
        data: responseData.data,
      };
    } catch (error) {
      const err = error as Error;
      return {
        statusCode: 500,
        message: err.message || "Internal server error",
        data: null,
      };
    }
  };
}
