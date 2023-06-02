import { MigrationInterface, QueryRunner } from "typeorm";

export class UserSessions1685740591082 implements MigrationInterface {
    name = 'UserSessions1685740591082'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_sessions" ("id" SERIAL NOT NULL, "jwt" character varying NOT NULL, "user_id" integer NOT NULL, "userId" integer, CONSTRAINT "PK_d3108356d1e8d8473a4f8be7ca6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users_sessions" ADD CONSTRAINT "FK_ad63321c2184aaf101482a8b4a1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_sessions" DROP CONSTRAINT "FK_ad63321c2184aaf101482a8b4a1"`);
        await queryRunner.query(`DROP TABLE "users_sessions"`);
    }

}
