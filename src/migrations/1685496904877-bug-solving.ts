import { MigrationInterface, QueryRunner } from "typeorm";

export class BugSolving1685496904877 implements MigrationInterface {
    name = 'BugSolving1685496904877'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_89aa0cfe8c8f08db0048079cb22"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "userInformationId" TO "userInformationIdId"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_89aa0cfe8c8f08db0048079cb22" TO "UQ_110f410e9c3f0c61462e9a22bda"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_110f410e9c3f0c61462e9a22bda" FOREIGN KEY ("userInformationIdId") REFERENCES "user_information"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_110f410e9c3f0c61462e9a22bda"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_110f410e9c3f0c61462e9a22bda" TO "UQ_89aa0cfe8c8f08db0048079cb22"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "userInformationIdId" TO "userInformationId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_89aa0cfe8c8f08db0048079cb22" FOREIGN KEY ("userInformationId") REFERENCES "user_information"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
