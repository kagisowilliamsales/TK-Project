import { Address } from './address';

export class User {
    public userid: string;
    public username: string;
    public email: string;
    public brand: string;
    public address: Address;
    public isClient: boolean;
    public password: string;
    public lastname?: string;
    public name?: string;
}
