INSERT INTO "role" (name)
VALUES ( 'superAdmin' ),
       ( 'admin' ),
       ( 'profesor' );

INSERT INTO "user" (username, "password", "role")
    SELECT 'superadmin', '$2a$12$2Pdfe4.s9iW.aapaqh2GreRkLddbj9bGY8nQ757WsbTdcWvIqgWkK', r.id
    FROM "role" r
    WHERE r.name = 'superAdmin';