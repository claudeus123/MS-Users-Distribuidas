import { MigrationInterface, QueryRunner } from "typeorm";

export class BdNullable1685477838860 implements MigrationInterface {
    name = 'BdNullable1685477838860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_information" ALTER COLUMN "birthdate" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_information" ALTER COLUMN "birthdate" SET NOT NULL`);
    }

}
