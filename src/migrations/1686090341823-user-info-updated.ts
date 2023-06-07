import { MigrationInterface, QueryRunner } from "typeorm";

export class UserInfoUpdated1686090341823 implements MigrationInterface {
    name = 'UserInfoUpdated1686090341823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_information" ADD "nickname" character varying`);
        await queryRunner.query(`ALTER TABLE "user_information" ADD "profile_image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_information" DROP COLUMN "profile_image"`);
        await queryRunner.query(`ALTER TABLE "user_information" DROP COLUMN "nickname"`);
    }

}
