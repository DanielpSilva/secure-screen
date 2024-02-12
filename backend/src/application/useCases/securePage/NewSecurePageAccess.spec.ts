import { NewSecurePageAccessUseCase, NewSecurePageAccessUseCaseProps } from "./NewSecurePageAccess";
import { SecurePageAccess } from "../../../domain/entity/SecurePageAccess";
import { SecurePageAccessRepository } from "../../../infrastructure/repository/SecurePageAccessRepository";

jest.mock("../../../infrastructure/repository/SecurePageAccessRepository", () => ({
  SecurePageAccessRepository: {
    save: jest.fn(),
  },
}));

describe("NewSecurePageAccessUseCase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new secure page access", () => {
    const session_id = crypto.randomUUID();
    const path = "/secure-page";
    const props: NewSecurePageAccessUseCaseProps = { session_id, path };
    const useCase = new NewSecurePageAccessUseCase();

    useCase.execute(props);

    expect(SecurePageAccessRepository.save).toHaveBeenCalledTimes(1);
    expect(SecurePageAccessRepository.save).toHaveBeenCalledWith(expect.any(SecurePageAccess));
  });
});
