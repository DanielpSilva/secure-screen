import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSecureScreen1707654837078 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE secure_page_access (
                id UUID PRIMARY KEY,
                session_id VARCHAR NOT NULL,
                path VARCHAR NOT NULL,
                accessed_at TIMESTAMP NOT NULL,
                active BOOLEAN NOT NULL
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE secure_page_access;`);
  }
}
