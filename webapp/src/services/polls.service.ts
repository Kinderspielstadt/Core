import { RecordSubscription, UnsubscribeFunc } from 'pocketbase';
import { Collections, PollsRecord, PollsResponse } from '../types/pocketbase.types';
import { PocketbaseService } from './pocketbase.service';

const COLLECTION = PocketbaseService.getApi().collection(Collections.Polls);

export class PollsService {
  public static async addPollOption(pollOption: PollsRecord): Promise<PollsResponse> {
    return COLLECTION.create(pollOption);
  }
  public static async getPollResult(): Promise<PollsResponse[]> {
    return COLLECTION.getFullList();
  }
  public static async subscribeToPollChanges(
    callback: (data: RecordSubscription<PollsResponse>)=> void,
  ): Promise<UnsubscribeFunc> {
    return await COLLECTION.subscribe<PollsResponse>('*', (data) => {
      callback(data);
    });
  }
}