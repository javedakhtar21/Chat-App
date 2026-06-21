import { UserConnectionModel } from "../modules/user-connection/model";

class SocketHandler {
  static async saveConnectionDetails(userId: number, socketId: string) {
    await UserConnectionModel.findOneAndUpdate(
      { userId },
      { socketId, connectedAt: Date.now(), lastActivity: Date.now() },
      { upsert: true, new: true },
    );
  }

  static async deleteConnectionDetails(userId: number) {
    await UserConnectionModel.deleteOne({ userId });
  }
}

export { SocketHandler };
