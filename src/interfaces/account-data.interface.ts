import { IAccount } from './account.interface';

export interface IAccountData extends IAccount {
  name: string;
  birthday: string;
  address: string;
  contact: string[];
}