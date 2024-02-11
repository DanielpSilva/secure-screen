import { CreateSessionUseCase } from "./create-session";

describe("CreateSessionUseCase", () => {
  it("must create a session with the provided creation data", async () => {
    const created_at = new Date();
    const sut = new CreateSessionUseCase();

    const session = await sut.execute({ created_at });

    expect(session).toBeDefined();
    expect(session.props.created_at).toEqual(created_at);
  });
});
