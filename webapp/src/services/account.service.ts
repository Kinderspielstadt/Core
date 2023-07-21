
import { RecordSubscription, UnsubscribeFunc } from 'pocketbase';
import { AccountsDataResponse, AccountsListResponse, AccountsResponse, Collections } from '../types/pocketbase.types';
import { PocketbaseService } from './pocketbase.service';

const COLLECTION = PocketbaseService.getApi().collection(Collections.Accounts);
const VIEW = PocketbaseService.getApi().collection(Collections.AccountsList);

export class AccountService {
  public static async getAccount(accountNumber: string): Promise<AccountsResponse> {
    return COLLECTION.getFirstListItem(`accountNumber = "${accountNumber}"`);
  }
  public static async checkIn(accountNumber: string): Promise<AccountsResponse> {
    const account = await this.getAccount(accountNumber);
    return COLLECTION.update(account.id, { lastCheckIn: new Date() });
  }
  public static async getAccounts(): Promise<AccountsListResponse<number, string>[]> {
    return VIEW.getFullList();
  }
  public static getAccountDetails(id: string): Promise<AccountsResponse<{personalData: AccountsDataResponse}>> {
    return COLLECTION.getOne(id, { expand: 'personalData' });
  }
  public static async updateAccountNumber(accountId: string, accountNumber: string): Promise<AccountsResponse> {
    return COLLECTION.update(accountId, { accountNumber });
  }
  public static async updateColor(accountId: string, color?: string): Promise<AccountsResponse> {
    return COLLECTION.update(accountId, { color: color || null });
  }
  public static async subscribeToAccountChanges(
    callback: (data: RecordSubscription<AccountsResponse>)=> void,
  ): Promise<UnsubscribeFunc> {
    return await COLLECTION.subscribe<AccountsResponse>('*', (data) => {
      callback(data);
    });
  }
}