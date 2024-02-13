/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Server as SocketIOServer, Socket } from "socket.io";
import {
  NewSecureScreenAccessUseCase,
  NewSecureScreenAccessUseCaseProps,
} from "../../application/useCases/secureScreen/NewSecureScreenAccess";
import {
  DeactivateSecureScreenAccessUseCase,
  DeactivateSecureScreenAccessUseCaseProps,
} from "../../application/useCases/secureScreen/DeactivateSecureScreenAccess";
import {
  CheckIfExistsActiveSecureScreenAccessProps,
  CheckIfExistsActiveSecureScreenUseCase,
} from "../../application/useCases/secureScreen/CheckIfExistsActiveSecureScreenAccess";

export class WebSocketAdapter {
  private io: SocketIOServer;

  constructor(io: SocketIOServer) {
    this.io = io;
    this.setupListeners();
  }

  private setupListeners(): void {
    const deactivateAccessUseCase = new DeactivateSecureScreenAccessUseCase();
    const newSecureScreenAccess = new NewSecureScreenAccessUseCase();

    this.io.on("connection", (socket) => {
      const { session: session_id, path } = socket.handshake.query;

      if (!session_id || !path) {
        socket.emit("accessDenied", "Request is invalid");
      }

      newSecureScreenAccess.execute({
        session_id,
        path,
      } as NewSecureScreenAccessUseCaseProps);

      socket.emit("accessGranted");

      socket.on("disconnect", async () => {
        try {
          await deactivateAccessUseCase.execute({ session_id } as DeactivateSecureScreenAccessUseCaseProps);
        } catch (error) {
          console.error("Erro ao desativar o acesso:", error);
          socket.emit("accessDenied", "No Secure Screen Access Active");
        }
      });
    });
  }
}
