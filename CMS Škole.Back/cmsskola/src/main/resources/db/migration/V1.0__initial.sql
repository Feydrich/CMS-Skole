CREATE SCHEMA IF NOT EXISTS school;


-- ===================== ROLE =====================

CREATE TABLE IF NOT EXISTS "role" (
                        id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
                        "name" varchar NOT NULL,
                        CONSTRAINT role_pk PRIMARY KEY (id)
);


-- ===================== BANNER =====================

CREATE TABLE IF NOT EXISTS  banner (
                        id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
                        "name" varchar NOT NULL,
                        image_uri varchar NOT NULL,
                        created date NOT NULL DEFAULT CURRENT_DATE,
                        archive bool NOT NULL DEFAULT false,
                        "order" bigint NOT NULL,
                        CONSTRAINT banner_pk PRIMARY KEY (id)
);


-- ===================== USER =====================

CREATE TABLE IF NOT EXISTS "user" (
                        id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
                        "name" varchar NULL,
                        surname varchar NULL,
                        username varchar NOT NULL,
                        "password" varchar NOT NULL,
                        "role" bigint NULL,
                        mail varchar NULL,
                        CONSTRAINT user_pk PRIMARY KEY (id),
                        CONSTRAINT user_role_fk FOREIGN KEY ("role") REFERENCES "role"(id)
);


-- ===================== CATEGORY =====================

CREATE TABLE IF NOT EXISTS category (
                          id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
                          "name" varchar NOT NULL,
                          supercategory bigint NULL,
                          CONSTRAINT category_pk PRIMARY KEY (id),
                          CONSTRAINT category_supercategory_fk FOREIGN KEY (supercategory) REFERENCES category(id)
);


-- ===================== WEB PAGE =====================

CREATE TABLE IF NOT EXISTS web_page (
                          id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
                          html_uri varchar NULL,
                          url varchar NOT NULL,
                          category bigint NULL,
                          CONSTRAINT web_page_pk PRIMARY KEY (id),
                          CONSTRAINT web_page_category_fk FOREIGN KEY (category) REFERENCES category(id)
);


-- ===================== ARTICLE =====================

CREATE TABLE IF NOT EXISTS article (
                         id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
                         title varchar NULL,
                         html_uri varchar NOT NULL,
                         web_page bigint NOT NULL,
                         author bigint NOT NULL,
                         created date DEFAULT CURRENT_DATE,
                         updated date DEFAULT CURRENT_DATE,
                         lasts_until date NULL,
                         archived bool NOT NULL DEFAULT false,
                         priority bool NOT NULL DEFAULT false,
                         CONSTRAINT article_pk PRIMARY KEY (id),
                         CONSTRAINT article_user_fk FOREIGN KEY (author) REFERENCES "user"(id),
                         CONSTRAINT article_web_page_fk FOREIGN KEY (web_page) REFERENCES web_page(id)
);


-- ===================== CLAIM =====================

CREATE TABLE IF NOT EXISTS claim (
                       id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
                       "role" bigint NULL,
                       "user" bigint NULL,
                       operation varchar NOT NULL,
                       category bigint NULL,
                       web_page bigint NULL,
                       CONSTRAINT claim_pk PRIMARY KEY (id),
                       CONSTRAINT claim_category_fk FOREIGN KEY (category) REFERENCES category(id),
                       CONSTRAINT claim_role_fk FOREIGN KEY ("role") REFERENCES "role"(id),
                       CONSTRAINT claim_user_fk FOREIGN KEY ("user") REFERENCES "user"(id),
                       CONSTRAINT claim_web_page_fk FOREIGN KEY (web_page) REFERENCES web_page(id)
);


-- ===================== SUBSCRIPTION =====================

CREATE TABLE IF NOT EXISTS "subscription" (
                                id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
                                "user" bigint NOT NULL,
                                category bigint NULL,
                                web_page bigint NULL,
                                CONSTRAINT subscription_pk PRIMARY KEY (id),
                                CONSTRAINT subscription_category_fk FOREIGN KEY (category) REFERENCES category(id),
                                CONSTRAINT subscription_user_fk FOREIGN KEY ("user") REFERENCES "user"(id),
                                CONSTRAINT subscription_web_page_fk FOREIGN KEY (web_page) REFERENCES web_page(id)
);


-- ===================== IMAGE =====================

CREATE TABLE IF NOT EXISTS image (
                       id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
                       image_uri varchar NOT NULL,
                       web_page bigint NULL,
                       article bigint NULL,
                       CONSTRAINT image_pk PRIMARY KEY (id),
                       CONSTRAINT image_article_fk FOREIGN KEY (article) REFERENCES article(id),
                       CONSTRAINT image_web_page_fk FOREIGN KEY (web_page) REFERENCES web_page(id)
);


-- ===================== LOG =====================

CREATE TABLE IF NOT EXISTS log (
                     id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
                     "user" bigint NOT NULL,
                     article bigint NULL,
                     web_page bigint NULL,
                     "text" varchar NOT NULL,
                     tstamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                     CONSTRAINT log_pk PRIMARY KEY (id),
                     CONSTRAINT log_atricle_fk FOREIGN KEY (article) REFERENCES article(id),
                     CONSTRAINT log_user_fk FOREIGN KEY ("user") REFERENCES "user"(id),
                     CONSTRAINT log_web_page_fk FOREIGN KEY (web_page) REFERENCES web_page(id)
);
