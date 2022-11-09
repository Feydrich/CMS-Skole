export interface User {
  name: string;
  surname?: string;
  username?: string;
  mail?: string;
  jwt?: string;
  roles?: string[];

  /* DELETE ME OVO JE SAMO ZA DEV */
  password?: string;
}
