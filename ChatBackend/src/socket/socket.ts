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

      console.log({
        id: socket.id,
        connected: socket.connected,
        rooms: Array.from(socket.rooms),
        user,
        handshake: {
          auth: socket.handshake.auth,
        },
      });

      // notifying user of successful connection
      socket.emit("welcome", {
        statusCode: 200,
        message: "Successfully connected to the socket",
        data: { ...user, socketId: socketId },
      });

      // join room
      socket.join("personalChat")

      socket.on("sendMsg", (data: any) => {
        console.log(`Message received from ${socketId}:`, data);
        socket.emit("recMsg", {
          data,
          msgFromServer: "Your msg received by server",
        });
      });

      socket.on("disconnect", (reason: string) => {
        console.log(
          `A user is disconnected with id: ${socketId}, due to reason: ${reason}`,
        );
      });
    });
  };
}

export { SocketConnection };
