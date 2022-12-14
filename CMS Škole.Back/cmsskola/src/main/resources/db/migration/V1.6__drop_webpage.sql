DROP TABLE web_page CASCADE;

ALTER TABLE claim DROP COLUMN web_page;
ALTER TABLE article DROP COLUMN web_page;
ALTER TABLE log DROP COLUMN web_page;
ALTER TABLE image DROP COLUMN web_page;
ALTER TABLE subscription DROP COLUMN web_page;

ALTER TABLE article ADD COLUMN category BIGINT;
ALTER TABLE article ADD CONSTRAINT article_category_fk FOREIGN KEY (category) REFERENCES category(id);

ALTER TABLE log ADD COLUMN category BIGINT;
ALTER TABLE log ADD CONSTRAINT log_category_fk FOREIGN KEY (category) REFERENCES category(id);