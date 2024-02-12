import { SecurePageAccess } from "../../../domain/entity/SecurePageAccess";
import { SecurePageAccessRepository } from "../../../infrastructure/repository/SecurePageAccessRepository";
import { CheckIfExistsActiveSecurePageUseCase } from "./CheckIfExistsActiveSecurePageAccess";

jest.mock("../../../infrastructure/repository/SecurePageAccessRepository", () => ({
  SecurePageAccessRepository: {
    findActiveByPath: jest.fn(),
  },
}));

describe("CheckIfExistsActiveSecurePageUseCase", () => {
  let useCase: CheckIfExistsActiveSecurePageUseCase;

  beforeEach(() => {
    useCase = new CheckIfExistsActiveSecurePageUseCase();
  });

  it("should return true for an active secure page", async () => {
    const path = "/secure-page";

    (SecurePageAccessRepository.findActiveByPath as jest.Mock).mockResolvedValueOnce({
      session_id: crypto.randomUUID(),
      path: path,
      accessed_at: new Date(),
      active: true,
    } as SecurePageAccess);

    const isActive = await useCase.execute({ path });
    expect(isActive).toBe(true);
  });

  it("should return false for an inactive secure page", async () => {
    const path = "/secure-page-one";

    (SecurePageAccessRepository.findActiveByPath as jest.Mock).mockResolvedValueOnce(null);

    const isActive = await useCase.execute({ path });
    expect(isActive).toBe(false);
  });
});
