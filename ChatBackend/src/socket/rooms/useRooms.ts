export class UserRooom {
  static join(socket: any) {
    const userId = socket.user.UserId;
    socket.join(`user:${userId}`);

    console.log(`User ${userId} joined room: 'user:${userId}'`);
  }
}
