import { CheckActiveSecurePageUseCase } from "./check-active-secure-page";

describe("CheckActiveSecurePageUseCase", () => {
  let useCase: CheckActiveSecurePageUseCase;

  beforeEach(() => {
    useCase = new CheckActiveSecurePageUseCase();
  });

  it("should return true for an active secure page", () => {
    const path = "/secure-page";

    const isActive = useCase.execute({ path });
    expect(isActive).toBe(true);
  });

  it("should return false for an inactive secure page", () => {
    const path = "/secure-page-ine";

    const isActive = useCase.execute({ path });
    expect(isActive).toBe(false);
  });
});
