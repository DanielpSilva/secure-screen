import { CreateSessionUseCase } from "./create-session";
import * as SessionRepository from "../../../infrastructure/repository/SessionRepository";

jest.mock("../../../domain/entity/Session", () => ({
  Session: {
    createNew: jest.fn().mockReturnValue({ id: "session_id", data: "session_data" }),
  },
}));

describe("CreateSessionUseCase", () => {
  let saveMock: jest.Mock;

  beforeEach(() => {
    saveMock = jest.fn();
    SessionRepository.SessionRepository.save = saveMock;
  });

  it("deve criar uma nova sessão e salvá-la", async () => {
    const createSessionUseCase = new CreateSessionUseCase();

    await createSessionUseCase.execute();

    expect(saveMock).toHaveBeenCalledTimes(1);
    expect(saveMock).toHaveBeenCalledWith({ id: "session_id", data: "session_data" });
  });
});
