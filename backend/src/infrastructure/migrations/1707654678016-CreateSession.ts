import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSession1707654678016 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE session (
                id UUID PRIMARY KEY,
                created_at DATE NOT NULL
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE session;`);
  }
}
