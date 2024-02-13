import { CheckIfExistsActiveSecureScreenUseCase } from "../../application/useCases/secureScreen/CheckIfExistsActiveSecureScreenAccess";
import { DeactivateSecureScreenAccessUseCase } from "../../application/useCases/secureScreen/DeactivateSecureScreenAccess";
import { NewSecureScreenAccessUseCase } from "../../application/useCases/secureScreen/NewSecureScreenAccess";
import { io } from "../../http";
import { WebSocketAdapter } from "./WebSocketAdpter";

export function setupWebSocket() {
  const deactivateSecureScreenAccessUseCase = new DeactivateSecureScreenAccessUseCase();
  const newSecureScreenAccessUseCase = new NewSecureScreenAccessUseCase();
  const checkIfExistsActiveSecureScreenUseCase = new CheckIfExistsActiveSecureScreenUseCase();

  new WebSocketAdapter(
    io,
    deactivateSecureScreenAccessUseCase,
    newSecureScreenAccessUseCase,
    checkIfExistsActiveSecureScreenUseCase,
  );
}
