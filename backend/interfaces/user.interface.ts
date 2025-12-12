export interface User {
    name: string;
    email: string;
    password: string;
    token: string;
    counterLogIn: number;
    lastLogIn: Date;
}