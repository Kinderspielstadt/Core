import PocketBase from 'pocketbase';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pb = new PocketBase(
  (import.meta as any).env.MODE === 'development'
    ? 'http://127.0.0.1:8090'
    : '/',
);

export class PocketbaseService {
  public static getApi() {
    return pb;
  }
  public static getHealth() {
    return pb.health.check();
  }
}
