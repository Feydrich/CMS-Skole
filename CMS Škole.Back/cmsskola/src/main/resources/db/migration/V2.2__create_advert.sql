-- ===================== ADVERT =====================

CREATE TABLE IF NOT EXISTS advert (
               id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
               "name" varchar NOT NULL,
               image bigint,
               link varchar,

               CONSTRAINT advert_pk PRIMARY KEY (id),
               CONSTRAINT advert_image_fk FOREIGN KEY (image) REFERENCES image(id)
);