import { AppwriteService } from './appwrite.service';
import { IAccount } from '../../interfaces/account.interface';
import { Databases, Models, Query } from 'appwrite';
import { ITransaction } from '../../interfaces/transaction.interface';

const DATABASE_ID = '62dfd5787755e7ed9fcd';
const ACCOUNTS_COLLECTION_ID = '62dfd6ca06197f9baa86';
const TRANSACTIONS_COLLECTION_ID = '62dfd81b7671727b27cd';
const DEPOSIT_LABEL = 'Bargeldeinzahlung';
const SALARY_LABEL = 'Gehalt';
const WITHDRAW_LABEL = 'Bargeldauszahlung';
const sdk = AppwriteService.getSDK();

export const BankService = {
  async getAccountDetails(accountNumber: string): Promise<IAccount> {
    const database = new Databases(sdk, DATABASE_ID);
    const accountDocument = await database.listDocuments<IAccount & Models.Document>(
      ACCOUNTS_COLLECTION_ID, [Query.equal('accountNumber', accountNumber)], 1);
    const transactionDocuments = await database.listDocuments<ITransaction & Models.Document>(
      TRANSACTIONS_COLLECTION_ID, [Query.equal('accountNumber', accountNumber)], 100, 0, undefined, undefined, ['$createdAt'], ['DESC']);
    const account: IAccount = {
      accountNumber: accountDocument.documents[0].accountNumber,
      firstName: accountDocument.documents[0].firstName,
      lastName: accountDocument.documents[0].lastName,
      balance: accountDocument.documents[0].balance,
      transactions: transactionDocuments.documents.map(transaction => ({
        label: transaction.label,
        amount: transaction.amount,
        date: new Date(transaction.$createdAt * 1000),
      })),
    };
    return account;
  },
  async addTransaction(accountNumber: string, amount: number, type: TransactionType): Promise<ITransaction> {
    const database = new Databases(sdk, DATABASE_ID);
    const accountDocument = await database.listDocuments<IAccount & Models.Document>(
      ACCOUNTS_COLLECTION_ID, [Query.equal('accountNumber', accountNumber)], 1);
    const transactionDocument = await database.createDocument<ITransaction & Models.Document>(TRANSACTIONS_COLLECTION_ID, 'unique()', {
      accountNumber: accountNumber,
      label: type === TransactionType.DEPOSIT ? DEPOSIT_LABEL : (type === TransactionType.SALARY ? SALARY_LABEL : WITHDRAW_LABEL),
      amount: (type === TransactionType.WITHDRAW ? -amount : amount),
    });
    await database.updateDocument<IAccount & Models.Document>(ACCOUNTS_COLLECTION_ID, accountDocument.documents[0].$id, {
      balance: accountDocument.documents[0].balance + (type === TransactionType.WITHDRAW ? -amount : amount),
    });
    return { label: transactionDocument.label, amount: transactionDocument.amount, date: new Date(transactionDocument.$createdAt * 1000) };
  },
};

export enum TransactionType {
  DEPOSIT,
  SALARY,
  WITHDRAW,
}