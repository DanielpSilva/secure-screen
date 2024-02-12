import { ResourceNotFoundError } from "../../../errors/ResourceNotFoundError";
import { SecurePageAccessRepository } from "../../../infrastructure/repository/SecurePageAccessRepository";

export interface DeactivateSecurePageAccessUseCaseProps {
  session_id: string;
}

export class DeactivateSecurePageAccessUseCase {
  async execute({ session_id }: DeactivateSecurePageAccessUseCaseProps) {
    const access = await SecurePageAccessRepository.findActiveBySessionId(session_id);

    if (!access) {
      throw new ResourceNotFoundError("Secure page access not found");
    }

    access.deactivate();

    return SecurePageAccessRepository.save(access);
  }
}
