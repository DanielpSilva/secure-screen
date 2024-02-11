import { appDataSource } from "../../app-data-source";
import { SecurePage } from "../../domain/entity/SecurePage";

export const SecurePageRepository = appDataSource.getRepository(SecurePage).extend({
  findBySessionId(sessionId: string) {
    return this.createQueryBuilder("session").where("secure_page.session_id = :sessionId", { sessionId }).getOne();
  },

  async create(securePageData: Partial<SecurePage>) {
    const securePage = this.create(securePageData);
    return await this.save(securePage);
  },
});
