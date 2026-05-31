import { UserRooom } from "./rooms/useRooms";
import { SendMessageEvent } from "./events/sendMessageEvent";
import * as io from "socket.io";

class SocketConnection {
  private socket: io.Server;
  constructor(io: io.Server) {
    this.socket = io;
    this.startSocket();
  }

  private startSocket = () => {
    this.socket.on("connection", (socket: any) => {
      const socketId = socket.id;
      const user = socket.user;

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

      socket.on("disconnect", (reason: string) => {
        console.log(
          `A user is disconnected with id: ${socketId}, due to reason: ${reason}`,
        );
      });
    });
  };
}

export { SocketConnection };
