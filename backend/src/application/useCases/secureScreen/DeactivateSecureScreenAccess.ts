import { ResourceNotFoundError } from "../../../errors/ResourceNotFoundError";
import { SecureScreenAccessRepository } from "../../../infrastructure/repository/SecureScreenAccessRepository";

export interface DeactivateSecureScreenAccessUseCaseProps {
  session_id: string;
}

export class DeactivateSecureScreenAccessUseCase {
  async execute({ session_id }: DeactivateSecureScreenAccessUseCaseProps) {
    const access = await SecureScreenAccessRepository.findActiveBySessionId(session_id);

    if (!access) {
      throw new ResourceNotFoundError("Secure page access not found");
    }

    access.deactivate();

    return SecureScreenAccessRepository.save(access);
  }
}
