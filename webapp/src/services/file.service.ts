import JSZip from 'jszip';
import { FileQueryParams, Record } from 'pocketbase';
import { AccountsResponse, Collections } from '../types/pocketbase.types';
import { PocketbaseService } from './pocketbase.service';

const API = PocketbaseService.getApi();

export class FileService {
  public static getSmallAvatar(id: string, avatar: string) {
    return this.getFile({ collectionName: Collections.Accounts, id } as Record, avatar, { thumb: '80x80' });
  }
  public static getAvatar(id: string, avatar: string) {
    return this.getFile({ collectionName: Collections.Accounts, id } as Record, avatar, { thumb: '512x512' });
  }
  public static async getAvatarsAsZip(accounts: AccountsResponse[]): Promise<Blob> {
    const zip = new JSZip();
    for(const account of accounts) {
      const url = this.getAvatar(account.id, account.picture);
      const file = fetch(url).then((response) => response.blob());
      zip.file(account.picture, file);
    }
    return await zip.generateAsync({ type: 'blob' });
  }
  private static getFile(record: Record, fileName: string, queryParams: FileQueryParams): string {
    return API.files.getUrl(record, fileName, queryParams);
  }
}