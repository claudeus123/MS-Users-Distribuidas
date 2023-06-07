import { MigrationInterface, QueryRunner } from "typeorm";

export class UserInfoUpdate1686168660295 implements MigrationInterface {
    name = 'UserInfoUpdate1686168660295'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_information" DROP COLUMN "birthdate"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_information" ADD "birthdate" TIMESTAMP`);
    }

}
