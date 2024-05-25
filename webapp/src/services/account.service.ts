import { RecordSubscription, UnsubscribeFunc } from 'pocketbase';
import {
  AccountsDataRecord,
  AccountsDataResponse,
  AccountsListResponse,
  AccountsRecord,
  AccountsResponse,
  Collections,
} from '../types/pocketbase.types';
import { PocketbaseService } from './pocketbase.service';

const COLLECTION = PocketbaseService.getApi().collection(Collections.Accounts);
const COLLECTION_DATA = PocketbaseService.getApi().collection(
  Collections.AccountsData,
);
const VIEW = PocketbaseService.getApi().collection(Collections.AccountsList);

export class AccountService {
  public static async getAccount(
    accountNumber: string,
  ): Promise<AccountsResponse> {
    return COLLECTION.getFirstListItem(`accountNumber = "${accountNumber}"`);
  }
  public static async getAccountById(id: string): Promise<AccountsResponse> {
    return COLLECTION.getOne(id);
  }
  public static async checkIn(
    accountNumber: string,
  ): Promise<AccountsResponse> {
    const account = await this.getAccount(accountNumber);
    return COLLECTION.update(account.id, { lastCheckIn: new Date() });
  }
  public static async getAccounts(): Promise<
    AccountsListResponse<number, string>[]
  > {
    return VIEW.getFullList();
  }
  public static async getFullAccounts(): Promise<
    AccountsResponse<{ personalData: AccountsDataResponse }>[]
  > {
    return COLLECTION.getFullList({ expand: 'personalData' });
  }
  public static async getFullAccountsWherePictureIsSet(): Promise<
    AccountsResponse<{ personalData: AccountsDataResponse }>[]
  > {
    return COLLECTION.getFullList({
      filter: 'picture!=null',
      expand: 'personalData',
    });
  }
  public static getAccountDetails(
    id: string,
  ): Promise<AccountsResponse<{ personalData: AccountsDataResponse }>> {
    return COLLECTION.getOne(id, { expand: 'personalData' });
  }
  public static async updateAccountNumber(
    accountId: string,
    accountNumber: string,
  ): Promise<AccountsResponse> {
    return COLLECTION.update(accountId, { accountNumber });
  }
  public static async updateColor(
    accountId: string,
    color?: string,
  ): Promise<AccountsResponse> {
    return COLLECTION.update(accountId, { color: color || null });
  }
  public static async updatePicture(
    accountId: string,
    data: FormData,
  ): Promise<AccountsResponse> {
    return COLLECTION.update(accountId, data);
  }
  public static async addAccount(
    account: AccountsRecord,
    personalData: AccountsDataRecord,
  ): Promise<AccountsResponse> {
    const personalDataResponse = await COLLECTION_DATA.create(personalData, {
      $autoCancel: false,
    });
    account.personalData = personalDataResponse.id;
    return COLLECTION.create(account, { $cancelKey: personalDataResponse.id });
  }
  public static async subscribeToAccountChanges(
    callback: (data: RecordSubscription<AccountsResponse>) => void,
  ): Promise<UnsubscribeFunc> {
    return await COLLECTION.subscribe<AccountsResponse>('*', (data) => {
      callback(data);
    });
  }
}
