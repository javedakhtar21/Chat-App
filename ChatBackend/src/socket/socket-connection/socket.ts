import * as io from "socket.io";

class SocketConnection {
  private socket: io.Server;
  constructor(io: io.Server) {
    this.socket = io;
    this.startSocket();
  }

  private startSocket = () => {
    this.socket.on("connection", (socket) => {
      const socketId = socket.id;

      console.log(`A user is connected with id: ${socketId}`);

      this.socket.on("disconnect", (reason: string) => {
        console.log(
          `A user is disconnected with id: ${socketId}, due to reason: ${reason}`
        );
      });
    });
  };
}

export { SocketConnection };