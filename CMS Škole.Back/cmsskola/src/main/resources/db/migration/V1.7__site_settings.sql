CREATE TABLE IF NOT EXISTS site_settings (
                                       id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
                                       property varchar NOT NULL UNIQUE,
                                       value varchar NOT NULL,
                                       updated date NOT NULL DEFAULT CURRENT_DATE
);

INSERT INTO site_settings (property, value)
VALUES ( 'name', 'Osnovna škola Sesvetska Sela' ),
       ( 'description', 'OŠ Sesvetska Sela započela je s radom 03. rujna 2007. godine. Nalazi se u Letničkoj ulici u Sesvetskim Selima, koja su dio Gradske četvrti Sesvete. Ponosni smo na naziv škole i na okoliš koji stvara jedan lijep ugođaj: spaja seoski mir i ljepotu prirode s gradskom organizacijom i uređenjem života' ),
       ( 'images', '' ),
       ( 'colorSchemes', '{
      primaryColor: "#cbe4f294",
      primaryColorDark: "#07689f",
      primaryColorTransparent: "#42a1d8",
      secondaryColor: "#d3edd5",
      secondaryColorDark: "#3d8141",
      background: "#f5f5f5",
      legend: "#ffffff",
      fontColor: "#000000",
    }' )