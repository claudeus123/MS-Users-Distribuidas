import { MigrationInterface, QueryRunner } from "typeorm";

export class UsWithoutId1685742178776 implements MigrationInterface {
    name = 'UsWithoutId1685742178776'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_sessions" DROP COLUMN "user_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_sessions" ADD "user_id" integer NOT NULL`);
    }

}
