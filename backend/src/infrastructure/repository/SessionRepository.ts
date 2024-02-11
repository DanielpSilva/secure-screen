import { Session } from "../../domain/entity/Session";
import { appDataSource } from "../database/app-data-source";

export const SessionRepository = appDataSource.getRepository(Session).extend({
  findBySessionId(sessionId: string) {
    return this.createQueryBuilder("session").where("session.id = :sessionId", { sessionId }).getOne();
  },

  async create(sessionData: Partial<Session>) {
    const session = this.create(sessionData);
    await this.save(session);
    return session;
  },
});
