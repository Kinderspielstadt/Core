import { Databases, Models } from 'appwrite';
import { AccountService } from './account.service';
import { AppwriteService } from './appwrite.service';
import { IAccountData } from '../../interfaces/account-data.interface';
import { IPersonalInformation } from '../../interfaces/personal-information.interface';

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
        }
      },
      );
      offset += 100;
    } while(personalInformationDocuments.total > offset);
    return accounts;
  },
};