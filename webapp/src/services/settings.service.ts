import { Collections, SettingsRecord, SettingsResponse } from '../types/pocketbase.types';
import { PocketbaseService } from './pocketbase.service';

const COLLECTION = PocketbaseService.getApi().collection(Collections.Settings);

export class SettingsService {
  public static async getSettings(): Promise<SettingsResponse> {
    return COLLECTION.getFirstListItem('', { sort: '-created', $autoCancel: false });
  }
  public static async setSettings(settings: SettingsRecord): Promise<SettingsResponse> {
    return COLLECTION.create(settings);
  }
}