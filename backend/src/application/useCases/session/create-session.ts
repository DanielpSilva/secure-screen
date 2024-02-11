import { Session } from "../../../domain/entity/Session";
import { SessionRepository } from "../../../infrastructure/repository/SessionRepository";

type CreateSession = {
  created_at: Date;
};

export class CreateSessionUseCase {
  async execute({ created_at }: CreateSession) {
    const session = Session.createNew({ created_at });
    return SessionRepository.create(session);
  }
}
