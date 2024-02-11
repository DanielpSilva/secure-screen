import { Session } from "../../../domain/entity/Session";
import { SessionRepository } from "../../../infrastructure/repository/SessionRepository";

type CreateSession = {
  createdAt: Date;
};

export class CreateSessionUseCase {
  async execute({ createdAt }: CreateSession) {
    const session = Session.createNew({ createdAt });
    return SessionRepository.create(session);
  }
}
