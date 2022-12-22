DROP TABLE claim CASCADE;

ALTER TABLE "user" ADD CONSTRAINT unique_username UNIQUE (username);