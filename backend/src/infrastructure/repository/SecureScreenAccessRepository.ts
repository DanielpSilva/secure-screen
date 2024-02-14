import { appDataSource } from "../../data-source";
import { SecureScreenAccess } from "../../domain/entity/SecureScreenAccess";

export const SecureScreenAccessRepository = appDataSource.getRepository(SecureScreenAccess).extend({
  async findActiveBySessionId(session_id: string): Promise<SecureScreenAccess | null> {
    return this.findOne({ where: { session_id, active: true } });
  },

  async findActiveByPath(path: string): Promise<SecureScreenAccess | null> {
    return this.findOne({ where: { path, active: true } });
  },

  async create(SecureScreenAccessData: Partial<SecureScreenAccess>) {
    const SecureScreen = this.create(SecureScreenAccessData);
    return await this.save(SecureScreen);
  },
});
