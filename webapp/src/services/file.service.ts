import { Record } from 'pocketbase';
import { Collections } from '../types/pocketbase.types';
import { PocketbaseService } from './pocketbase.service';

const API = PocketbaseService.getApi();

export class FileService {
  public static getAvatar(id: string, avatar: string) {
    return API.files.getUrl({ collectionName: Collections.Accounts, id } as Record, avatar, { thumb: '100x100' });
  }
}