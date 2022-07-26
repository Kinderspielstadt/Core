import { Databases, Models, Query } from 'appwrite';
import { AccountService } from './account.service';
import { AppwriteService } from './appwrite.service';
import { IAccount } from '../../interfaces/account.interface';
import { ITransaction } from '../../interfaces/transaction.interface';

const DATABASE_ID = '62dfd5787755e7ed9fcd';
const TRANSACTIONS_COLLECTION_ID = '62dfd81b7671727b27cd';
const DEPOSIT_LABEL = 'Bargeldeinzahlung';
const SALARY_LABEL = 'Gehalt';
const WITHDRAW_LABEL = 'Bargeldauszahlung';
const sdk = AppwriteService.getSDK();

export const BankService = {
  async getAccountDetails(accountNumber: string): Promise<IAccount> {
    const database = new Databases(sdk, DATABASE_ID);
    const account = await AccountService.getAccount(accountNumber);
    const transactionDocuments = await database.listDocuments<ITransaction & Models.Document>(
      TRANSACTIONS_COLLECTION_ID, [Query.equal('accountNumber', accountNumber)], 100, 0, undefined, undefined, ['$createdAt'], ['DESC']);
    return {
      accountNumber: account.accountNumber,
      firstName: account.firstName,
      lastName: account.lastName,
      balance: account.balance,
      transactions: transactionDocuments.documents.map(transaction => ({
        label: transaction.label,
        amount: transaction.amount,
        date: new Date(transaction.$createdAt * 1000),
      })),
      lastCheckIn: account.lastCheckIn,
    };
  },
  async addTransaction(accountNumber: string, amount: number, type: TransactionType): Promise<ITransaction> {
    const database = new Databases(sdk, DATABASE_ID);
    const transactionDocument = await database.createDocument<ITransaction & Models.Document>(TRANSACTIONS_COLLECTION_ID, 'unique()', {
      accountNumber: accountNumber,
      label: type === TransactionType.DEPOSIT ? DEPOSIT_LABEL : (type === TransactionType.SALARY ? SALARY_LABEL : WITHDRAW_LABEL),
      amount: (type === TransactionType.WITHDRAW ? -amount : amount),
    });
    await AccountService.updateBalance(accountNumber, type === TransactionType.WITHDRAW ? -amount : amount);
    return { label: transactionDocument.label, amount: transactionDocument.amount, date: new Date(transactionDocument.$createdAt * 1000) };
  },
};

export enum TransactionType {
  DEPOSIT,
  SALARY,
  WITHDRAW,
}