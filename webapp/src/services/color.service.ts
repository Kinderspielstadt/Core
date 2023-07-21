import { Collections, ColorsResponse } from '../types/pocketbase.types';
import { PocketbaseService } from './pocketbase.service';

const COLLECTION = PocketbaseService.getApi().collection(Collections.Colors);

export class ColorService {
  public static async getColors(): Promise<ColorsResponse[]> {
    return COLLECTION.getFullList<ColorsResponse>();
  }
}