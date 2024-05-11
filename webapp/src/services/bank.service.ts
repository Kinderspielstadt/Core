import { RecordSubscription, UnsubscribeFunc } from 'pocketbase';
import { Collections, TransactionsResponse } from '../types/pocketbase.types';
import { PocketbaseService } from './pocketbase.service';

const COLLECTION = PocketbaseService.getApi().collection(
  Collections.Transactions,
);

const DEPOSIT_LABEL = 'Bargeldeinzahlung';
const SALARY_LABEL = 'Gehalt';
const WITHDRAW_LABEL = 'Bargeldauszahlung';
const OPEN_ACCOUNT_LABEL = 'Kontoeröffnung';

export class BankService {
  public static async getTransactions(
    accountId: string,
  ): Promise<TransactionsResponse[]> {
    return COLLECTION.getFullList({
      filter: `account = "${accountId}"`,
      sort: '-created',
    });
  }
  public static async addTransaction(
    accountId: string,
    amount: number,
    type: TransactionType,
  ): Promise<TransactionsResponse> {
    let label = '';
    switch (type) {
      case TransactionType.DEPOSIT:
        label = DEPOSIT_LABEL;
        break;
      case TransactionType.SALARY:
        label = SALARY_LABEL;
        break;
      case TransactionType.WITHDRAW:
        label = WITHDRAW_LABEL;
        break;
      case TransactionType.OPEN_ACCOUNT:
        label = OPEN_ACCOUNT_LABEL;
        break;
    }
    return COLLECTION.create({
      account: accountId,
      label,
      amount: amount * 100,
    });
  }
  public static async subscribeToTransactionChanges(
    callback: (data: RecordSubscription<TransactionsResponse>) => void,
  ): Promise<UnsubscribeFunc> {
    return await COLLECTION.subscribe<TransactionsResponse>('*', (data) => {
      callback(data);
    });
  }
}

export enum TransactionType {
  DEPOSIT,
  SALARY,
  WITHDRAW,
  OPEN_ACCOUNT,
}
