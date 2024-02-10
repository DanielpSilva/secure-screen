import { CreateSessionUseCase } from "./create-session";

describe("CreateSessionUseCase", () => {
  it("must create a session with the provided creation data", async () => {
    const createdAt = new Date();
    const sut = new CreateSessionUseCase();

    const session = await sut.execute({ createdAt });

    expect(session).toBeDefined();
    expect(session.props.createdAt).toEqual(createdAt);
  });
});
