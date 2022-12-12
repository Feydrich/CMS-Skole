export interface User {
  id?: string;
  name: string;
  surname?: string;
  username?: string;
  mail?: string;
  jwt?: string;
  role?: { id: number; name: string };

  /* DELETE ME OVO JE SAMO ZA DEV */
  password?: string;
}
