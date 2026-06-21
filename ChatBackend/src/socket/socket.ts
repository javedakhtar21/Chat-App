import { UserRooom } from "./rooms/useRooms";
import { SendMessageEvent } from "./events/sendMessageEvent";
import * as io from "socket.io";
import { UserModel } from "../modules/users/model";
import { SocketHandler } from "../util/SocketHandler";
class SocketConnection {
  private socket: io.Server;
  constructor(io: io.Server) {
    this.socket = io;
    this.startSocket();
  }

  private startSocket = () => {
    this.socket.on("connection", async (socket: any) => {
      debugger
      const socketId = socket.id;
      const user = socket.user;

      const userDetails = await UserModel.findOne({ userId: user.UserId })
      // const isUserAlreadyConnected = userDetails?.userId===user.UserId;

      // saving the connection details of user : on connection
      // if (!isUserAlreadyConnected) {
      //   debugger
        if (userDetails) {
          await SocketHandler.saveConnectionDetails(userDetails.userId, socketId);
          console.log(`connection details saved for user: ${userDetails.userId}`);
        }
      // }

      console.log(`A user is connected with socket: ${socket.id}`);

      // notifying user of successful connection
      socket.emit("welcome", {
        statusCode: 200,
        message: "Successfully connected to the socket",
        data: { ...user, userId: user.userId, socketId: socketId },
      });

      // user joining in room
      UserRooom.join(socket);
      //  registering send msg events
      SendMessageEvent.register(this.socket, socket);

      socket.on("disconnect", async (reason: string) => {
        await SocketHandler.deleteConnectionDetails(user.UserId);
        console.log(`connection details deleted for user: ${user.UserId}`);
        console.log(
          `A user is disconnected with id: ${socketId}, due to reason: ${reason}`,
        );
      });
    });
  };
}

export { SocketConnection };
