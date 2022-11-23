import { Article } from "../models/Article";
import { Category } from "../models/Category";
import { User } from "../models/User";

export const fakeCategories: Category[] = [
  {
    id: "first",
    name: "O školi",
    subCategories: [
      { id: "first", name: "Povijest" },
      { id: "second", name: "Kontakti" },
      { id: "third", name: "Lokacija" },
      { id: "fourth", name: "Radno vrijeme" },
      { id: "fifth", name: "Popis djelatnika" },
      { id: "sixth", name: "Školski odbor" },
      { id: "seventh", name: "Popis djelatnika" },
    ],
  },
  {
    id: "second",
    name: "Oglasna ploča",
    subCategories: [
      { id: "first", name: "Obavijesti" },
      { id: "second", name: "Novosti" },
      { id: "third", name: "Znamenitosti" },
    ],
  },
  {
    id: "third",
    name: "Nastava",
    subCategories: [
      { id: "first", name: "Upisi u prvi razred" },
      { id: "second", name: "Informatika" },
      { id: "third", name: "Likovni" },
      { id: "third", name: "Vikendom u sportske dvorane" },
      { id: "fourth", name: "Izvannastavne aktivnosti" },
    ],
  },
];

export const fakeArticles: Article[] = [
  {
    id: "1",
    name: "Dan jabuka u Produženom boravku 1. razreda",
    creationDate: new Date(),
    description:
      "I ove školske godine obilježili smo Svjetski dan jabuka. Djeca su bila uključena u razne aktivnosti s ciljem da upoznaju koliko je jabuka važna u svakodnevnoj prehrani.",
    content: "<p>Povodom Dana jabuka, učenici Produženog boravka 1. razreda pripremali su slatki desert od jabuka, pritom se zabavili, nešto novo naučili, a na kraju se svi zajedno zasladili.&nbsp;</p><p>'Jedna jabuka na dan, tjera doktora iz kuće van.'</p><p><span style='color: rgb(34, 34, 34);'>Pogledajte u kratkom videu kako su vrijedne ručice pripravile slatki desert:&nbsp;&nbsp;</span><a href='https://gopro.com/v/96Lp1ya5OoOV3' rel='noopener noreferrer' target='_blank' style='color: rgb(17, 85, 204);'>https://gopro.com/v/96Lp1ya5OoOV3</a></p><p><span style='color: rgb(34, 34, 34);'>Učiteljice Anamarija Dumenčić, Beata Gereci Wirth, Matea Herceg i Iva Penava.&nbsp;</span></p>",
      author: {
      name: "Professor 1",
    },
    image: "https://img.freepik.com/free-photo/red-apple-basket_74190-6134.jpg?w=1380&t=st=1668285796~exp=1668286396~hmac=b0dc5de2acac897a8bf8726543f89db0230075870ddc4b0177de50c00d0575ff",
  },
  {
    id: "2",
    name: "Opasnosti od strujnog udara na području željezničke infrastrukture",
    creationDate: new Date(),
    description:
      "U cilju prevencije mladih osoba od opasnosti kretanja po području željezničke infrastrukture na području grada Zagreba, objavljujemo u nastavku...",
    content: "<p><br></p><p class='ql-align-justify'>U cilju prevencije mladih osoba od opasnosti kretanja po području željezničke infrastrukture na području grada Zagreba, objavljujemo u nastavku priložene letke i brošure u svrhu edukacije mladih i prevencije&nbsp;od strujnog udara na području željezničke infrastrukture.</p><p class='ql-align-right'>Izvori:</p><p class='ql-align-right'><strong><em>Agencija za istraživanje nesreća u zračnom, pomorskom&nbsp;i željezničkom prometu</em></strong></p><p class='ql-align-right'><strong><em>GRAD ZAGREB</em></strong></p><p class='ql-align-right'><em>Gradski ured za obrazovanje, sport i mlade</em></p><p><br></p><p>Poštovani,</p><p><br></p><p>Obzirom na dva nesretna slučaja na području grada Zagreba unatrag nekoliko dana, gdje je prilikom neovlaštenog kretanja po području željezničke infrastrukture došlo do strujnog udara prilikom čega su smrtno stradala dva studenta Hrvatskih studija, Sveučilišta u Zagrebu.</p><p>U cilju prevencije mladih osoba od opasnosti kretanja po području željezničke infrastrukture na području grada&nbsp;Zagreba slobodni smo zamoliti Vas da priložene dokumente proslijedite na sve obrazovne ustanove pod Vašom nadležnosti, kako bi ga iste mogle objaviti na svojim oglasnim pločama.</p><p>S&nbsp;poštovanjem.</p><p><br></p><p>Tomislav Antun Biber</p><p>Glavni istražitelj željezničkih nesreća / Railway Accidents Chief Investigator</p><p><br></p><p>Agencija za istraživanje nesreća u zračnom, pomorskom</p><p>i željezničkom prometu /</p><p>Air, Maritime and Railway Traffic Accident Investigation Agency</p><p><br></p><p>*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lonjička 2</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;HR- 10000 Zagreb</p><p>tel:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+385 (0) 1 7057 411</p><p>fax:&nbsp;&nbsp;&nbsp;&nbsp;+385 (0) 1 8886 831</p><p>mob:&nbsp;&nbsp;&nbsp;+385 (0) 99 80 71 298</p><p>e-mail:&nbsp;&nbsp;&nbsp;<a href='mailto:tomislav.biber@ain.hr' rel='noopener noreferrer' target='_blank' style='color: rgb(53, 88, 110);'>tomislav.biber@ain.hr</a>tomislav.biber@ain.hr&gt;</p><p>www:&nbsp;&nbsp;&nbsp;&nbsp;<a href='http://www.ain.hr/' rel='noopener noreferrer' target='_blank' style='color: rgb(53, 88, 110);'>www.ain.hr</a>&lt;<a href='http://www.ain.hr/' rel='noopener noreferrer' target='_blank' style='color: rgb(53, 88, 110);'>http://www.ain.hr/</a>&gt;</p>",
      author: {
      name: "Professor 1",
    },
    image:
      "https://cdn.pixabay.com/photo/2013/04/01/10/59/electricity-98829_960_720.png",
  },
  {
    id: "3",
    name: "Potvrde o školovanju dostupne u e-Dnevniku",
    creationDate: new Date(),
    description:
      "U e-Dnevniku za učenike i roditelje je napravljena nadogradnja kojom je omogućen ispis potvrda o statusu školovanja za učenike osnovnih i srednjih škola. ",
    content: "<p class='ql-align-justify'>U&nbsp;<a href='https://www.carnet.hr/usluga/e-dnevnik-za-ucenike-i-roditelje/' rel='noopener noreferrer' target='_blank' style='color: rgb(53, 88, 110);'>e-Dnevniku za učenike i roditelje</a>&nbsp;je napravljena nadogradnja kojom je omogućen ispis potvrda o statusu školovanja za učenike osnovnih i srednjih škola. Učenici i roditelji sada mogu kroz e-Dnevnik ispisati potvrdu u svrhu dokazivanja da je učenik u aktualnoj školskoj godini upisan u program i razred, odnosno da ima status redovitog učenika. Potvrde o školovanju učenika se mogu koristiti za različite svrhe kao što su ostvarivanje prava na učenički prijevoz, dječji doplatak, stipendiranje i druge. Generirana potvrda je u PDF formatu, sadrži elektronički pečat i nakon što je učenik ili roditelj preuzmu na računalo ili mobilni uređaj mogu je slati elektroničkom poštom ili ispisati, ovisno o potrebama.</p><p class='ql-align-justify'><br></p><p class='ql-align-justify'>Ispis potvrda omogućen je u e-Dnevniku za učenike i roditelje koji je dostupan na poveznici&nbsp;<a href='https://ocjene.skole.hr/' rel='noopener noreferrer' target='_blank' style='color: rgb(53, 88, 110);'>https://ocjene.skole.hr,&nbsp;</a>a moguće ih je generirati i u CARNET-ovoj mobilnoj aplikaciji za e-Dnevnik koja je dostupna na Google Play Storeu i na App Storeu.</p><p class='ql-align-justify'>Detaljne upute o ispisu potvrda možete pronaći u&nbsp;<a href='https://www.carnet.hr/wp-content/uploads/2022/09/e-Dnevnik-upute-za-ucenike-i-roditelje-1.pdf' rel='noopener noreferrer' target='_blank' style='color: rgb(53, 88, 110);'>e-Dnevnik uputama za učenike i roditelje</a>.</p><p><br></p>",
      author: {
      name: "Professor 1",
    },
    image: "https://cdn.pixabay.com/photo/2017/10/14/09/56/journal-2850091_960_720.jpg",
  },
  {
    id: "4",
    name: "Red vožnje",
    creationDate: new Date(),
    description:
      "Red vožnje organiziranog prijevoza učenika od 15. rujna 2022. - školski autobus linija 881",
      content: "<table border='1' cellpadding='0' cellspacing='0'><tbody><tr><td style='width:201px;'><p style='text-align: center;'><span style='font-family:verdana,geneva,sans-serif;'><span style='font-size:16px;'><strong>Kraljevečki Novaki</strong></span></span></p></td><td style='width:201px;'><p style='text-align: center;'><span style='font-family:verdana,geneva,sans-serif;'><span style='font-size:16px;'><strong>Remetska ulica</strong></span></span></p></td><td style='width:201px;'><p style='text-align: center;'><span style='font-family:verdana,geneva,sans-serif;'><span style='font-size:16px;'><strong>Škola (povratak)</strong></span></span></p></td></tr><tr><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'><span style='font-family:verdana,geneva,sans-serif;'><span style='font-size:16px;'>7:25</span></span></p></td><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td></tr><tr><td style='width:201px;'><p style='text-align: center;'><span style='font-family:verdana,geneva,sans-serif;'><span style='font-size:16px;'>7:40</span></span></p></td><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td></tr><tr><td style='width:201px;'><p style='text-align: center;'><span style='font-family:verdana,geneva,sans-serif;'><span style='font-size:16px;'>8:15</span></span></p></td><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td></tr><tr><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'><span style='font-family:verdana,geneva,sans-serif;'><span style='font-size:16px;'>8:25</span></span></p></td><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td></tr><tr><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'><span style='font-family:verdana,geneva,sans-serif;'><span style='font-size:16px;'>8:30 (dolazak)</span></span></p></td></tr><tr><td style='width:201px;'><p style='text-align: center;'><span style='color:#FF0000;'><span style='font-family:verdana,geneva,sans-serif;'><span style='font-size:16px;'>11:00</span></span></span></p></td><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td></tr><tr><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'><span style='color:#FF0000;'><span style='font-family:verdana,geneva,sans-serif;'><span style='font-size:16px;'>11:10</span></span></span></p></td><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td></tr><tr><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'><span style='color:#FF0000;'><span style='font-family:verdana,geneva,sans-serif;'><span style='font-size:16px;'><strong>11:15 (dolazak)**</strong></span></span></span></p></td></tr><tr><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'><span style='font-family:verdana,geneva,sans-serif;'><span style='font-size:16px;'><strong>11:40&nbsp;(odlazak</strong>)</span></span></p></td></tr><tr><td style='width:201px;'><p style='text-align: center;'><span style='font-family:verdana,geneva,sans-serif;'><span style='font-size:16px;'>11:45</span></span></p></td><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td></tr><tr><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'><span style='font-family:verdana,geneva,sans-serif;'><span style='font-size:16px;'>11:55</span></span></p></td><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td></tr><tr><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'><span style='font-family:verdana,geneva,sans-serif;'><span style='font-size:16px;'>12:00&nbsp;(dolazak)</span></span></p></td></tr><tr><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'><span style='font-family:verdana,geneva,sans-serif;'><span style='font-size:16px;'><strong>12:30&nbsp;(odlazak)</strong></span></span></p></td></tr><tr><td style='width:201px;'><p style='text-align: center;'><span style='font-family:verdana,geneva,sans-serif;'><span style='font-size:16px;'>12:35</span></span></p></td><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td></tr><tr><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'><span style='font-family:verdana,geneva,sans-serif;'><span style='font-size:16px;'>12:45</span></span></p></td><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td></tr><tr><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'><span style='font-family:verdana,geneva,sans-serif;'><span style='font-size:16px;'>12:50&nbsp;(dolazak)</span></span></p></td></tr><tr><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'><span style='font-family:verdana,geneva,sans-serif;'><span style='font-size:16px;'><strong>13:20&nbsp;(odlazak)</strong></span></span></p></td></tr><tr><td style='width:201px;'><p style='text-align: center;'><span style='font-family:verdana,geneva,sans-serif;'><span style='font-size:16px;'>13:25</span></span></p></td><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td></tr><tr><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'><span style='font-family:verdana,geneva,sans-serif;'><span style='font-size:16px;'>13:35</span></span></p></td><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td></tr><tr><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'><span style='font-family:verdana,geneva,sans-serif;'><span style='font-size:16px;'>13:40&nbsp;(dolazak)</span></span></p></td></tr><tr><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'><span style='font-family:verdana,geneva,sans-serif;'><span style='font-size:16px;'><strong>14:10 (odlazak)</strong></span></span></p></td></tr><tr><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'><span style='font-family:verdana,geneva,sans-serif;'><span style='font-size:16px;'><strong>14:55 (odlazak)</strong></span></span></p></td></tr><tr><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'><span style='font-family:verdana,geneva,sans-serif;'><span style='font-size:16px;'><strong>15:45 (odlazak)</strong></span></span></p></td></tr><tr><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'><span style='font-family:verdana,geneva,sans-serif;'><span style='font-size:16px;'><strong>16:40 (odlazak)</strong></span></span></p></td></tr><tr><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'><span style='font-family:verdana,geneva,sans-serif;'><span style='font-size:16px;'><strong>17:35 (odlazak)</strong></span></span></p></td></tr><tr><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'><span style='font-family:verdana,geneva,sans-serif;'><span style='font-size:16px;'><strong>18:25 (odlazak)</strong></span></span></p></td></tr><tr><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'>&nbsp;</p></td><td style='width:201px;'><p style='text-align: center;'><span style='color:#FF0000;'><span style='font-family:verdana,geneva,sans-serif;'><span style='font-size:16px;'><strong>19:15 (odlazak)*</strong></span></span></span></p></td></tr></tbody></table>",
      author: {
      name: "Developer",
    },
    image: "https://www.zagreb.info/wp-content/uploads/2015/11/12010760_1135413573155193_58493144524179038_o-e1466666556533.jpg",
  },
  {
    id: "5",
    name: "Učenici 4. b razrednog odjela osvojili nagradu Kauflanda za sve učenike naše škole",
    creationDate: new Date(),
    description:
      "Učenici 4. b razrednog odjela prošle školske godine sudjelovali su u natječaju Kauflanda Škola voća i povrća. ",
    author: {
      name: "Developer",
    },
    image: "http://os-sesvetska-sela-zg.skole.hr/upload/os-sesvetska-sela-zg/images/newsimg/1007/KAUFLAND.jpg",
  },
  {
    id: "6",
    name: "Matematička radionica u produženom boravku",
    creationDate: new Date(),
    description:
      "U sklopu Dana škole održana je Matematička radionica u organizaciji učiteljica iz produženog boravka. Učenici su uživali u  matematičkim igrama i zajedničkom druženju. Pogledajte kako nam je bilo.",
    content: "<p><span style='background-color: rgb(245, 250, 253); color: rgb(53, 88, 110);'>Učenici 4. b razrednog odjela&nbsp;prošle školske godine sudjelovali su u natječaju Kauflanda Škola voća i povrća. Zadatak je bio osmisliti zdravu kuharicu s deset recepata, napisati je na narječju kojim se govori u mjestu u kojem se nalazi škola i nacrtati namirnice i postupak pripremanja recepta svojom rukom. Učenici 4. b razrednog odjela&nbsp;su pripremili 10 recepata - 5 recepata s voćem i 5 recepata s povrćem, napisali je na kajkavskom narječju i obogatili svojim crtežima. Trud i rad naših učenika nije ostao nezamijećen te su učenici osvojili glavnu nagradu - voće i povrće za sve učenike škole! Cijele školske godine, svaki utorak, Kaufland nam poklanja voće i povrće za svakog učenika naše škole.</span></p>",
      author: {
      name: "Developer",
    },
    image: "https://cdn.pixabay.com/photo/2016/07/28/04/31/math-1547018_960_720.jpg",
  },
];

export const fakeUsers: User[] = [
  {
    id: "1",
    name: "Developer",
    mail: "dev@gmail.com",
    password: "dev",
    roles: ["Admin"],
  },
  {
    id: "2",
    name: "Tester",
    mail: "tester@gmail.com",
    password: "dev",
    roles: ["Regular user"],
  },
  {
    id: "3",
    name: "Professor 1",
    mail: "1@gmail.com",
    password: "dev",
    roles: ["Guest"],
  },
];
