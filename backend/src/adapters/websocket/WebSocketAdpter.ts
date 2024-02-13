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
import { ValidationRequestError } from "../../errors/ValidationRequestError";

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

      console.log(session_id, path);

      if (!session_id || !path) {
        throw new ValidationRequestError("Session ID ou Path não fornecidos");
      }

      const secureScreenAccess = newSecureScreenAccess.execute({
        session_id,
        path,
      } as NewSecureScreenAccessUseCaseProps);

      socket.on("disconnect", async () => {
        try {
          await deactivateAccessUseCase.execute({ session_id } as DeactivateSecureScreenAccessUseCaseProps);
          console.log("Acesso desativado com sucesso.");
        } catch (error) {
          console.error("Erro ao desativar o acesso:", error);
        }
      });
    });
  }
}
