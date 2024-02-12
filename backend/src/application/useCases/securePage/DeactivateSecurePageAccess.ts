import { ResourceNotFoundError } from "../../../errors/ResourceNotFoundError";
import { SecurePageAccessRepository } from "../../../infrastructure/repository/SecurePageAccessRepository";

export interface DisableSecurePageAccessUseCaseProps {
  session_id: string;
}

export class DisableSecurePageAccessUseCase {
  async execute({ session_id }: DisableSecurePageAccessUseCaseProps) {
    const access = await SecurePageAccessRepository.findActiveBySessionId(session_id);

    if (!access) {
      throw new ResourceNotFoundError("Secure page access not found");
    }

    access.deactivate();

    return SecurePageAccessRepository.save(access);
  }
}
