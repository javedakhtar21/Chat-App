import { Server } from "socket.io";
import { UserModel } from "../../modules/users/model";

export class SendMessageEvent {
  static register(io: Server, socket: any) {
    socket.on("sendMsg", async (data: any) => {
      debugger;
      const senderId = socket.user.UserId;
      const senderEmail = socket.user.email;
      const receiverId = data.receiverId;
      const message = data.message;
      const createdAt = Date.now();

      // getting the receiver user details
      const receiverUser = await UserModel.findOne({ userId: receiverId });

      let payloadToBeSent = {
        senderId,
        senderEmail,
        receiverId,
        receiverEmail: receiverUser?.email,
        message,
        createdAt,
      };

      if (receiverUser) {
        payloadToBeSent = {
          ...payloadToBeSent,
          receiverEmail: receiverUser.email,
        };
      }
      io.to(`user:${data.receiverId}`).emit("recMsg", payloadToBeSent);

      socket.emit("recMsg", payloadToBeSent);
    });
  }
}
