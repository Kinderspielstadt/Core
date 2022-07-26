import { ITransaction } from './transaction.interface';

export interface IAccount {
  accountNumber: string;
  firstName: string;
  lastName: string;
  balance: number;
  transactions: ITransaction[];
  lastCheckIn: number;
}