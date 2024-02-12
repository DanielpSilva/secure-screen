import { SecureScreenAccessRepository } from "../../../infrastructure/repository/SecureScreenAccessRepository";

export interface CheckIfExistsActiveSecureScreenAccessProps {
  path: string;
}

export class CheckIfExistsActiveSecureScreenUseCase {
  async execute({ path }: CheckIfExistsActiveSecureScreenAccessProps): Promise<boolean> {
    const activePage = await SecureScreenAccessRepository.findActiveByPath(path);
    return !!activePage;
  }
}
