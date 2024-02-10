import { Session } from "../../domain/entities/session";

type CreateSession = {
  createdAt: Date;
};

export class CreateSessionUseCase {
  async execute({ createdAt }: CreateSession) {
    const session = Session.create({ createdAt });
    return session;
  }
}
