import { Socket, Server as SocketIOServer } from "socket.io";
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

interface WebSocketHandshakeQuery {
  session?: string;
  path?: string;
}

export class WebSocketAdapter {
  private io: SocketIOServer;
  private deactivateAccessUseCase: DeactivateSecureScreenAccessUseCase;
  private newSecureScreenAccess: NewSecureScreenAccessUseCase;
  private checkIfExistsActiveSecureScreenAccess: CheckIfExistsActiveSecureScreenUseCase;

  constructor(io: SocketIOServer) {
    this.io = io;
    this.deactivateAccessUseCase = new DeactivateSecureScreenAccessUseCase();
    this.newSecureScreenAccess = new NewSecureScreenAccessUseCase();
    this.checkIfExistsActiveSecureScreenAccess = new CheckIfExistsActiveSecureScreenUseCase();

    this.setupListeners();
  }

  private async handleConnection(socket: Socket) {
    const { session: session_id, path } = socket.handshake.query as WebSocketHandshakeQuery;

    if (!session_id || !path) {
      socket.emit("accessDenied");
      return;
    }

    const isActive = await this.checkIfExistsActiveSecureScreenAccess.execute({
      path,
    } as CheckIfExistsActiveSecureScreenAccessProps);

    if (isActive) {
      socket.emit("accessDenied");
      return;
    }

    this.newSecureScreenAccess.execute({ session_id, path } as NewSecureScreenAccessUseCaseProps);
    socket.emit("accessGranted");

    socket.on("disconnect", async () => {
      try {
        await this.deactivateAccessUseCase.execute({ session_id } as DeactivateSecureScreenAccessUseCaseProps);
      } catch (error) {
        socket.emit("accessDenied", "No Secure Screen Access Active");
      }
    });
  }

  private setupListeners(): void {
    this.io.on("connection", (socket) => this.handleConnection(socket));
  }
}
