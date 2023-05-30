import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1685477653383 implements MigrationInterface {
    name = 'Init1685477653383'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "city" character varying NOT NULL, "role" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_information" ("user_id" integer NOT NULL, "birthdate" TIMESTAMP NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "userIdId" integer, CONSTRAINT "REL_608e33ad45cc4baa7b7025e25b" UNIQUE ("userIdId"), CONSTRAINT "PK_31c0e55a2ced8c6bf6fbecd0306" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`ALTER TABLE "user_information" ADD CONSTRAINT "FK_608e33ad45cc4baa7b7025e25b3" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_information" DROP CONSTRAINT "FK_608e33ad45cc4baa7b7025e25b3"`);
        await queryRunner.query(`DROP TABLE "user_information"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
