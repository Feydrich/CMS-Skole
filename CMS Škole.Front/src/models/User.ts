export interface User{
    username: string;
    jwt: string;
    roles: string[]; /* Iskomunicirati je li array stringova ispravni format za ovo */
    deviceUUID: string;
    loginTime: Date;
}