import { appDataSource } from "../../data-source";
import { Session } from "../../domain/entity/Session";

export const SessionRepository = appDataSource.getRepository(Session).extend({});
