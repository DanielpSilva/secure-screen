import { SecurePageAccessRepository } from "../../../infrastructure/repository/SecurePageAccessRepository";
import {
  DeactivateSecurePageAccessUseCase,
  DeactivateSecurePageAccessUseCaseProps,
} from "./DeactivateSecurePageAccess";

jest.mock("../../../infrastructure/repository/SecurePageAccessRepository", () => ({
  SecurePageAccessRepository: {
    findActiveBySessionId: jest.fn().mockResolvedValueOnce({
      id: crypto.randomUUID(),
      session_id: "some_session_id",
      path: "some_path",
      accessed_at: new Date(),
      active: true,
      deactivate: jest.fn(),
    }),
    save: jest.fn(),
  },
}));

describe("DeactivateSecurePageAccess", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should deactivate secure page access", async () => {
    const session_id = "some_session_id";
    const props: DeactivateSecurePageAccessUseCaseProps = { session_id };
    const useCase = new DeactivateSecurePageAccessUseCase();

    await useCase.execute(props);

    expect(SecurePageAccessRepository.save).toHaveBeenCalledTimes(1);
  });
});
