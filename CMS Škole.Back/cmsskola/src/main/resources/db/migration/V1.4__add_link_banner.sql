ALTER TABLE BANNER ADD COLUMN url varchar;
ALTER TABLE BANNER DROP COLUMN archive;
ALTER TABLE BANNER ADD COLUMN archived bool DEFAULT false;
