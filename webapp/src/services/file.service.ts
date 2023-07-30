import { FileQueryParams, Record } from 'pocketbase';
import { Collections } from '../types/pocketbase.types';
import { PocketbaseService } from './pocketbase.service';

const API = PocketbaseService.getApi();

export class FileService {
  public static getSmallAvatar(id: string, avatar: string) {
    return this.getFile({ collectionName: Collections.Accounts, id } as Record, avatar, { thumb: '80x80' });
  }
  public static getAvatar(id: string, avatar: string) {
    return this.getFile({ collectionName: Collections.Accounts, id } as Record, avatar, { thumb: '512x512' });
  }
  private static getFile(record: Record, fileName: string, queryParams: FileQueryParams): string {
    return API.files.getUrl(record, fileName, queryParams);
  }
}