import { NewSecureScreenAccessUseCase, NewSecureScreenAccessUseCaseProps } from "./NewSecureScreenAccess";
import { SecureScreenAccess } from "../../../domain/entity/SecureScreenAccess";
import { SecureScreenAccessRepository } from "../../../infrastructure/repository/SecureScreenAccessRepository";

jest.mock("../../../infrastructure/repository/SecureScreenAccessRepository", () => ({
  SecureScreenAccessRepository: {
    save: jest.fn(),
  },
}));

describe("NewSecureScreenAccessUseCase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new secure screen access", () => {
    const session_id = crypto.randomUUID();
    const path = "/secure-page";
    const props: NewSecureScreenAccessUseCaseProps = { session_id, path };
    const useCase = new NewSecureScreenAccessUseCase();

    useCase.execute(props);

    expect(SecureScreenAccessRepository.save).toHaveBeenCalledTimes(1);
    expect(SecureScreenAccessRepository.save).toHaveBeenCalledWith(expect.any(SecureScreenAccess));
  });
});
