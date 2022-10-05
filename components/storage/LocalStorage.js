import {AsyncStorage, Alert} from 'react-native';
class LocalStorage {
  static async saveRememberMe(remember) {
    try {
      await AsyncStorage.setItem('remember', remember);
      console.warn('Saved ' + remember);
    } catch (error) {
      console.warn(error.message);
    }
  }
  static async getRememberMe() {
    try {
      item = (await AsyncStorage.getItem('remember')) || 'no';
      if (item === 'yes') return true;
      else return false;
    } catch (error) {
      console.warn(error.message);
    }
  }

  static async saveProfile(data) {
    try {
      await AsyncStorage.setItem('profile', JSON.stringify(data));
    } catch (error) {
      // Error retrieving data
      console.warn(error.message);
    }
  }

  static async getUserProfile() {
    let item = {};
    try {
      item = (await AsyncStorage.getItem('profile')) || null;
      const userProfile = JSON.parse(item);
      return userProfile;
    } catch (error) {
      console.warn(error.message);
    }
    return null;
  }

  static async setToken(data) {
    try {
      console.log('data' + JSON.stringify(data));
      console.log('token' + JSON.stringify(data.token));

      await AsyncStorage.setItem('token', JSON.stringify(data.token));
    } catch (error) {
      // Error retrieving data
      console.warn(error.message);
    }
  }

  static async getToken() {
    let item = {};
    try {
      item = (await AsyncStorage.getItem('token')) || null;
      const token = item;
      return token;
    } catch (error) {
      console.warn(error.message);
    }
    return null;
  }
}

export default LocalStorage;
