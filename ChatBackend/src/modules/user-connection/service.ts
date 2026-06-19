import { UserConnectionModel } from "./model";
class UserConnectionService {
  constructor() {}

  static async getConnectionDetails({ userId }: { userId: number }) {
    if (!userId) {
      return {
        statusCode: 400,
        message: "userId is required",
        data: null,
      };
    }

    const connectionDetails = await UserConnectionModel.findOne({ userId });

    if (!connectionDetails) {
      return {
        statusCode: 404,
        message: "Connection details not found for this user",
        data: { userId },
      };
    }

    return {
      statusCode: 200,
      message: "Connection details fetched successfully",
      data: connectionDetails,
    };
  }
}

export { UserConnectionService };
