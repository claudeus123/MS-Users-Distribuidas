import { MigrationInterface, QueryRunner } from "typeorm";

export class RedesignUser1685494527066 implements MigrationInterface {
    name = 'RedesignUser1685494527066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_information" DROP CONSTRAINT "FK_608e33ad45cc4baa7b7025e25b3"`);
        await queryRunner.query(`ALTER TABLE "user_information" DROP CONSTRAINT "PK_31c0e55a2ced8c6bf6fbecd0306"`);
        await queryRunner.query(`ALTER TABLE "user_information" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "user_information" DROP CONSTRAINT "REL_608e33ad45cc4baa7b7025e25b"`);
        await queryRunner.query(`ALTER TABLE "user_information" DROP COLUMN "userIdId"`);
        await queryRunner.query(`ALTER TABLE "user_information" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_information" ADD CONSTRAINT "PK_f7fa43b43a7a288d5c5a1fedfec" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "userInformationId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_89aa0cfe8c8f08db0048079cb22" UNIQUE ("userInformationId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_89aa0cfe8c8f08db0048079cb22" FOREIGN KEY ("userInformationId") REFERENCES "user_information"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_89aa0cfe8c8f08db0048079cb22"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_89aa0cfe8c8f08db0048079cb22"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "userInformationId"`);
        await queryRunner.query(`ALTER TABLE "user_information" DROP CONSTRAINT "PK_f7fa43b43a7a288d5c5a1fedfec"`);
        await queryRunner.query(`ALTER TABLE "user_information" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user_information" ADD "userIdId" integer`);
        await queryRunner.query(`ALTER TABLE "user_information" ADD CONSTRAINT "REL_608e33ad45cc4baa7b7025e25b" UNIQUE ("userIdId")`);
        await queryRunner.query(`ALTER TABLE "user_information" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_information" ADD CONSTRAINT "PK_31c0e55a2ced8c6bf6fbecd0306" PRIMARY KEY ("user_id")`);
        await queryRunner.query(`ALTER TABLE "user_information" ADD CONSTRAINT "FK_608e33ad45cc4baa7b7025e25b3" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
