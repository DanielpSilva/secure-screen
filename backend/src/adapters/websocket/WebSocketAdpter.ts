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
  constructor(
    private io: SocketIOServer,
    private deactivateSecureScreenAccessUseCase: DeactivateSecureScreenAccessUseCase,
    private newSecureScreenAccessUseCase: NewSecureScreenAccessUseCase,
    private checkIfExistsActiveSecureScreenUseCase: CheckIfExistsActiveSecureScreenUseCase,
  ) {
    this.setupListeners();
  }

  private setupListeners(): void {
    this.io.on("connection", this.handleConnection);
  }

  private handleConnection = async (socket: Socket): Promise<void> => {
    try {
      await this.processConnection(socket);
    } catch (error) {
      console.error("Erro ao processar conexão:", error);
      socket.emit("error", "Erro ao processar a conexão.");
    }
  };

  private async processConnection(socket: Socket): Promise<void> {
    const { session: session_id, path } = socket.handshake.query;

    if (!this.validateSessionAndPath(session_id, path, socket)) return;

    const isActive = await this.checkAccess({ path } as CheckIfExistsActiveSecureScreenAccessProps);
    this.emitAccessStatus(isActive, socket);

    if (!isActive) {
      await this.registerNewAccess({ session_id, path } as NewSecureScreenAccessUseCaseProps);
    }

    socket.on("disconnect", () => {
      try {
        this.deactivateSecureScreenAccessUseCase.execute({
          session_id,
        } as DeactivateSecureScreenAccessUseCaseProps);
      } catch (error) {
        console.error("Erro ao desativar o acesso:", error);
      }
    });
  }

  private validateSessionAndPath(session_id: any, path: any, socket: Socket): boolean {
    if (!session_id || !path) {
      socket.emit("validationError", "Session ID ou Path não fornecidos");
      socket.disconnect(true);
      return false;
    }
    return true;
  }

  private async checkAccess(checkAccessParams: CheckIfExistsActiveSecureScreenAccessProps): Promise<boolean> {
    return this.checkIfExistsActiveSecureScreenUseCase.execute(checkAccessParams);
  }

  private emitAccessStatus(isActive: boolean, socket: Socket): void {
    if (isActive) {
      socket.emit("accessDenied", "Acesso à tela segura negado, já existe um usuário acessando a tela segura.");
    } else {
      socket.emit("accessGranted", "Acesso à tela segura concedido.");
    }
  }

  private async registerNewAccess(secureScreen: NewSecureScreenAccessUseCaseProps): Promise<void> {
    this.newSecureScreenAccessUseCase.execute(secureScreen);
  }
}
