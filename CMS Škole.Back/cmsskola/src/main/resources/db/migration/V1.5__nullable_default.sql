ALTER TABLE BANNER alter COLUMN created drop not null;

ALTER TABLE ARTICLE alter COLUMN archived drop not null;
ALTER TABLE ARTICLE alter COLUMN priority drop not null;

ALTER TABLE LOG alter COLUMN tstamp drop not null;
