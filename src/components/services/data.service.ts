import { Databases, Models } from 'appwrite';
import { AccountService } from './account.service';
import { AppwriteService } from './appwrite.service';
import { IAccountData } from '../../interfaces/account-data.interface';
import { IPersonalInformation } from '../../interfaces/personal-information.interface';
import { ICreateAccount } from '../../interfaces/create-account.interface';
import { IAccount } from '../../interfaces/account.interface';
import { BankService, TransactionType } from './bank.service';

const OPEN_ACCOUNT_BALANCE = 5;
const DATABASE_ID = '62dfd5787755e7ed9fcd';
const PERSONAL_INFORMATION_COLLECTION_ID = '62e004abb0cdae53b483';
const sdk = AppwriteService.getSDK();
const database = new Databases(sdk, DATABASE_ID);

export const DataService = {
  async getAllData(): Promise<IAccountData[]> {
    const accounts = (await AccountService.getAllAccounts()) as IAccountData[];
    let offset = 0,
      personalInformationDocuments: Models.DocumentList<IPersonalInformation & Models.Document>;
    do {
      personalInformationDocuments = await database.listDocuments<IPersonalInformation & Models.Document>(
        PERSONAL_INFORMATION_COLLECTION_ID, [], 100, offset);
      personalInformationDocuments.documents.forEach(personalInformation => {
        const account = accounts.find(account => account.accountNumber === personalInformation.accountNumber);
        if(account) {
          account.name = `${account.firstName} ${account.lastName}`;
          account.birthday = personalInformation.birthday;
          account.address = personalInformation.address;
          account.contact = personalInformation.contact;
        }
      },
      );
      offset += 100;
    } while(personalInformationDocuments.total > offset);
    return accounts;
  },
  async addAccount(account: ICreateAccount): Promise<IAccountData> {
    if(await AccountService.getAccount(account.accountNumber)) {
      throw new Error('Account already exists');
    }
    const accountDocument = await AccountService.addAccount({
      accountNumber: account.accountNumber,
      firstName: account.firstName,
      lastName: account.lastName,
      balance: 0,
    } as IAccount) as IAccountData;
    await BankService.addTransaction(account.accountNumber, OPEN_ACCOUNT_BALANCE, TransactionType.OPEN_ACCOUNT);
    const personalInformation = await database.createDocument<IAccountData & Models.Document>(
      PERSONAL_INFORMATION_COLLECTION_ID, 'unique()', {
        accountNumber: account.accountNumber,
        birthday: account.birthday,
        address: account.address,
        contact: account.contact,
      } as IPersonalInformation);
    if(accountDocument) {
      accountDocument.name = `${accountDocument.firstName} ${accountDocument.lastName}`;
      accountDocument.birthday = personalInformation.birthday;
      accountDocument.address = personalInformation.address;
    }
    // manually edit balance as the TransactionService updates the value after a transaction was created
    accountDocument.balance = OPEN_ACCOUNT_BALANCE;
    return accountDocument;
  },
};