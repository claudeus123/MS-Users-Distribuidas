import { MigrationInterface, QueryRunner } from "typeorm";

export class UsValid1685751331616 implements MigrationInterface {
    name = 'UsValid1685751331616'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_sessions" ADD "valid" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_sessions" DROP COLUMN "valid"`);
    }

}
