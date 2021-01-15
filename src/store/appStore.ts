import AsyncStorage from '@react-native-community/async-storage';
import { makeAutoObservable } from 'mobx'

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
    this.hostUrl = await AsyncStorage.getItem('host_url') || '';
    this.token = await AsyncStorage.getItem('access_token') || '';
    
    console.log("=======");
    console.log(this.hostUrl);
    console.log(this.token);
  }
}

export default new AppStore();
