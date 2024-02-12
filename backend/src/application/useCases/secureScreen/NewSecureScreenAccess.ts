import { SecureScreenAccess } from "../../../domain/entity/SecureScreenAccess";
import { SecureScreenAccessRepository } from "../../../infrastructure/repository/SecureScreenAccessRepository";

export interface NewSecureScreenAccessUseCaseProps {
  session_id: string;
  path: string;
}

export class NewSecureScreenAccessUseCase {
  execute({ session_id, path }: NewSecureScreenAccessUseCaseProps) {
    const secureScreenAccess = SecureScreenAccess.createNew({ session_id, path });
    SecureScreenAccessRepository.save(SecureScreenAccess);

    return secureScreenAccess;
  }
}
