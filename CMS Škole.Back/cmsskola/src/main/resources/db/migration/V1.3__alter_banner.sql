ALTER TABLE BANNER DROP COLUMN image_uri;
ALTER TABLE BANNER ADD COLUMN image bigint;
ALTER TABLE BANNER ADD CONSTRAINT banner_image_fk FOREIGN KEY (image) REFERENCES image(id);