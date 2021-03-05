import { Account } from "../config/interface";
import { makeAutoObservable } from 'mobx'

class AccountStore {
  currentAccount: Account | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentAccount = (account: Account) => {
    this.currentAccount = account;
  }
}

export default new AccountStore();
