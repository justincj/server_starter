-- migrate:up
CREATE TABLE "post"(
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "title" VARCHAR(100) NOT NULL
);


CREATE TABLE "user" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "username" VARCHAR(100) UNIQUE NOT NULL,
    "email" VARCHAR(100) UNIQUE NOT NULL,
    "password" VARCHAR(100) UNIQUE NOT NULL
);

CREATE FUNCTION update_stamp() RETURNS trigger AS $$
    BEGIN
        NEW.updated_at := NOW();
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

CREATE TRIGGER update_stamp BEFORE INSERT OR UPDATE ON "post"
    FOR EACH ROW EXECUTE FUNCTION update_stamp();

CREATE TRIGGER update_stamp BEFORE INSERT OR UPDATE ON "user"
    FOR EACH ROW EXECUTE FUNCTION update_stamp();
-- migrate:down
drop trigger update_stamp;
drop table "user";
drop table "post";

