/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Server as SocketIOServer, Socket } from "socket.io";

export class WebSocketAdapter {
  private io: SocketIOServer;

  constructor(io: SocketIOServer) {
    this.io = io;
    this.setupListeners();
  }

  private setupListeners(): void {}
}
