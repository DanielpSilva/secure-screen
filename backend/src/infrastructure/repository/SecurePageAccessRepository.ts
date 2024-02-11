import { appDataSource } from "../../app-data-source";
import { SecurePageAccess } from "../../domain/entity/SecurePageAccess";

export const SecurePageRepository = appDataSource.getRepository(SecurePageAccess).extend({
  async findBySessionId(session_id: string): Promise<SecurePageAccess | null> {
    return this.findOne({ where: { session_id, active: true } });
  },

  async findActiveByPath(path: string): Promise<SecurePageAccess | null> {
    return this.findOne({ where: { path, active: true } });
  },

  async create(securePageAccessData: Partial<SecurePageAccess>) {
    const securePage = this.create(securePageAccessData);
    return await this.save(securePage);
  },
});
