-- AlterTable
CREATE SEQUENCE position_id_seq;
ALTER TABLE "Position" ALTER COLUMN "id" SET DEFAULT nextval('position_id_seq');
ALTER SEQUENCE position_id_seq OWNED BY "Position"."id";
