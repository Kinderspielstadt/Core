import { useEventBus } from '@vueuse/core';
import { AuthModel } from 'pocketbase';
import { PocketbaseService } from './pocketbase.service';

const API = PocketbaseService.getApi();

export class AuthService {
  public static isAuthenticated(): boolean {
    if (API.authStore.isValid) {
      return true;
    }
    this.logout();
    return false;
  }
  public static getAdmin(): AuthModel {
    if (API.authStore.isAdmin) {
      return API.authStore.model;
    }
    throw new Error('Not authenticated');
  }
  public static async loginAsAdmin(
    email: string,
    password: string,
  ): Promise<AuthModel> {
    const response = await API.admins.authWithPassword(email, password);
    if (response) {
      useEventBus<boolean>('isAuthenticated').emit(true);
      return response.admin;
    }
    throw new Error('Invalid credentials');
  }
  public static logout(): void {
    API.authStore.clear();
    useEventBus<boolean>('isAuthenticated').emit(false);
  }
}
