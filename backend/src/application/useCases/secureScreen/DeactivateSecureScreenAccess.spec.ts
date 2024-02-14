import { SecureScreenAccessRepository } from "../../../infrastructure/repository/SecureScreenAccessRepository";
import {
  DeactivateSecureScreenAccessUseCase,
  DeactivateSecureScreenAccessUseCaseProps,
} from "./DeactivateSecureScreenAccess";

jest.mock("../../../infrastructure/repository/SecureScreenAccessRepository", () => ({
  SecureScreenAccessRepository: {
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

describe("DeactivateSecureScreenAccess", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should deactivate secure screen access", async () => {
    const session_id = "some_session_id";
    const props: DeactivateSecureScreenAccessUseCaseProps = { session_id };
    const useCase = new DeactivateSecureScreenAccessUseCase();

    await useCase.execute(props);

    expect(SecureScreenAccessRepository.save).toHaveBeenCalledTimes(1);
  });
});
