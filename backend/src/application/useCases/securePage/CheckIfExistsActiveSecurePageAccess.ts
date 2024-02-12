import { SecurePageAccessRepository } from "../../../infrastructure/repository/SecurePageAccessRepository";

export interface CheckIfExistsActiveSecurePageAccessProps {
  path: string;
}

export class CheckIfExistsActiveSecurePageUseCase {
  async execute({ path }: CheckIfExistsActiveSecurePageAccessProps): Promise<boolean> {
    const activePage = await SecurePageAccessRepository.findActiveByPath(path);
    return !!activePage;
  }
}
