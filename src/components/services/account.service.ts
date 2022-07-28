import { Databases, Models, Query } from 'appwrite';
import { AppwriteService } from './appwrite.service';
import { IAccount } from '../../interfaces/account.interface';

const DATABASE_ID = '62dfd5787755e7ed9fcd';
const ACCOUNTS_COLLECTION_ID = '62dfd6ca06197f9baa86';
const sdk = AppwriteService.getSDK();
const database = new Databases(sdk, DATABASE_ID);

export const AccountService = {
  async getAccount(accountNumber: string): Promise<IAccount & Models.Document> {
    const accountDocument = await database.listDocuments<IAccount & Models.Document>(
      ACCOUNTS_COLLECTION_ID, [Query.equal('accountNumber', accountNumber)], 1);
    return accountDocument.documents[0];
  },
  async updateBalance(accountNumber: string, balance: number): Promise<IAccount & Models.Document> {
    const account = await this.getAccount(accountNumber);
    await database.updateDocument<IAccount & Models.Document>(ACCOUNTS_COLLECTION_ID, account.$id, {
      balance: account.balance + balance,
    });
    return account;
  },
  async getAllAccounts(): Promise<IAccount[]> {
    let accountDocuments: Models.DocumentList<IAccount & Models.Document>,
      offset = 0;
    const accounts: IAccount[] = [];
    do {
      accountDocuments = await database.listDocuments<IAccount & Models.Document>(
        ACCOUNTS_COLLECTION_ID, [], 100, offset);
      accounts.push(...accountDocuments.documents.map(account => ({
        accountNumber: account.accountNumber,
        firstName: account.firstName,
        lastName: account.lastName,
        balance: account.balance,
        transactions: [],
        lastCheckIn: account.lastCheckIn,
      })));
      offset += 100;
    } while(accountDocuments.total > offset);
    return accounts;
  },
  async addAccount(account: IAccount): Promise<IAccount> {
    const accountDocument = await database.createDocument<IAccount & Models.Document>(ACCOUNTS_COLLECTION_ID, 'unique()', account);
    return accountDocument;
  },
};