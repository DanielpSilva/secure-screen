import { appDataSource } from "../../app-data-source";
import { Session } from "../../domain/entity/Session";

export const SessionRepository = appDataSource.getRepository(Session).extend({
  findBySessionId(session_id: string) {
    return this.createQueryBuilder("session").where("session.id = :session_id", { session_id }).getOne();
  },

  async create(sessionData: Partial<Session>) {
    const session = this.create(sessionData);
    return await this.save(session);
  },
});
