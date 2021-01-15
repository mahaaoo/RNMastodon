import AsyncStorage from '@react-native-community/async-storage';
import { makeAutoObservable, runInAction } from 'mobx'

class AppStore {
  hostUrl: string = '';
  token: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  setHostUrl(url: string) {
    this.hostUrl = url;
    AsyncStorage.setItem('host_url', url);
  }

  setToken(newToken: string){
    this.token = newToken;
    AsyncStorage.setItem('access_token', this.token);
  }

  async initApp() {
    const localHostUrl = await AsyncStorage.getItem('host_url') || '';
    const localToekn = await AsyncStorage.getItem('access_token') || '';
    
    runInAction(() => {
      this.hostUrl = localHostUrl;
      this.token = localToekn;  
    });
  }
}

export default new AppStore();
