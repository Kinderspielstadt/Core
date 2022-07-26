import { Client, Account } from 'appwrite';

const sdk = new Client();

sdk
  .setEndpoint('http://192.168.178.88/v1')
  .setProject('62dfc94a1637dc23acbc');

export const AppwriteService = {
  getSDK(): Client {
    // TODO Authenticate
    const account = new Account(sdk);
    if(!account.getSession('current')) {
      account.createAnonymousSession();
    }
    return sdk;
  },
};