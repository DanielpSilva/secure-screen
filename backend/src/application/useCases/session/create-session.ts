import { Session } from "../../../domain/entity/Session";
import { SessionRepository } from "../../../infrastructure/repository/SessionRepository";

export class CreateSessionUseCase {
  async execute() {
    const session = Session.createNew();
    SessionRepository.save(session);
    return session;
  }
}
