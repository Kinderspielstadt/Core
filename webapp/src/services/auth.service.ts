import { Admin } from 'pocketbase';
import { PocketbaseService } from './pocketbase.service';
import { useEventBus } from '@vueuse/core';

const API = PocketbaseService.getApi();

export class AuthService {
  public static isAuthenticated(): boolean {
    if(API.authStore.isValid) {
      return true;
    }
    this.logout();
    return false;
  }
  public static getAdmin(): Admin {
    if(this.isAuthenticated()) {
      return API.authStore.model as Admin;
    }
    throw new Error('Not authenticated');
  }
  public static async loginAsAdmin(email: string, password: string): Promise<Admin> {
    const response = await API.admins.authWithPassword(email, password);
    if(response) {
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