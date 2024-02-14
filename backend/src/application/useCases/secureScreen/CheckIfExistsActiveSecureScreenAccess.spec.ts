import { SecureScreenAccess } from "../../../domain/entity/SecureScreenAccess";
import { SecureScreenAccessRepository } from "../../../infrastructure/repository/SecureScreenAccessRepository";
import { CheckIfExistsActiveSecureScreenUseCase } from "./CheckIfExistsActiveSecureScreenAccess";

jest.mock("../../../infrastructure/repository/SecureScreenAccessRepository", () => ({
  SecureScreenAccessRepository: {
    findActiveByPath: jest.fn(),
  },
}));

describe("CheckIfExistsActiveSecureScreenUseCase", () => {
  let useCase: CheckIfExistsActiveSecureScreenUseCase;

  beforeEach(() => {
    useCase = new CheckIfExistsActiveSecureScreenUseCase();
  });

  it("should return true for an active secure screen", async () => {
    const path = "/secure-page";

    (SecureScreenAccessRepository.findActiveByPath as jest.Mock).mockResolvedValueOnce({
      session_id: crypto.randomUUID(),
      path: path,
      accessed_at: new Date(),
      active: true,
    } as SecureScreenAccess);

    const isActive = await useCase.execute({ path });
    expect(isActive).toBe(true);
  });

  it("should return false for an inactive secure screen", async () => {
    const path = "/secure-page-one";

    (SecureScreenAccessRepository.findActiveByPath as jest.Mock).mockResolvedValueOnce(null);

    const isActive = await useCase.execute({ path });
    expect(isActive).toBe(false);
  });
});
