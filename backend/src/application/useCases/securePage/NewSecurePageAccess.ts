import { SecurePageAccess } from "../../../domain/entity/SecurePageAccess";
import { SecurePageAccessRepository } from "../../../infrastructure/repository/SecurePageAccessRepository";

export interface NewSecurePageAccessUseCaseProps {
  session_id: string;
  path: string;
}

export class NewSecurePageAccessUseCase {
  execute({ session_id, path }: NewSecurePageAccessUseCaseProps) {
    const securePageAccess = SecurePageAccess.createNew({ session_id, path });
    SecurePageAccessRepository.save(securePageAccess);

    return securePageAccess;
  }
}
