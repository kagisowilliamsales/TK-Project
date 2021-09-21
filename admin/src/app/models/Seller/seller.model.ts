import { BusinessInterface } from './business.model';
import { AccountInterface } from './account.model';

export interface SellerInterface {
    username?: string;
    lastname?: string;
    email?: string;
    password?: string;
    business?: BusinessInterface;
    account?: AccountInterface;
}
