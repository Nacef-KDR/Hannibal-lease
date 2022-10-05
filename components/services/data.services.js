import LocalStorage from '../storage/LocalStorage';
import { AsyncStorage } from "react-native"
import {Platform, Alert} from 'react-native';
import RNRestart from 'react-native-restart';
//import Toast from 'react-native-simple-toast';
const host = 'http://51.75.142.119:8384/api';

class DataService {

  static headers =  async() => {      
    let token = await LocalStorage.getToken();
    console.log('token='+token);
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ JSON.parse(token)
    }
  }

    static msg(msg){
        return console.warn(msg);
    }
    static get(route) {
      return this.func(route, null, 'GET');
    }
  
    static put(route, params) {
      return this.func(route, params, 'PUT')
    }
  
    static post(route,params) {
      
      return this.func(route, params, 'POST')
    }
  
    static delete(route, params) {
      return this.func(route, params, 'DELETE')
    }

      
    static async postImage(route,key,file_attachement){
        
      const url = `${host}/${route}`;
      const formData = new FormData();

      
      formData.append(key,file_attachement);
      
      let options = {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        }, 
        body: formData,
         
      };
      
      //options.headers = DataService.headers()
      
      return fetch(url, options)
      .then((response) => {
          console.log("response:"+JSON.stringify(response));
          if(response._bodyBlob._data.size>0){
            return response.json();
          }else{
            return response;
          }
          
      } )
      .then( (responseJson) => {
        console.log('Api response is Ok------------->>>>>>', responseJson);
        return responseJson;
        
      })
      .catch( json => { 
        console.log('Api response is ------------->>>>>>', json);
        DataService.showAlert();
         return json;
      });

    }

    static async func(route, params, verb) {          

      const url = `${host}/${route}`;
      
      let options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null );
      
      
      options.headers = await DataService.headers()
      console.log('auth='+ (await DataService.headers()).Authorization);

      // const data = await LocalStorage.getUserProfile();
      
      // if(data!=null){
      //   const username = data.email;
      //   const password = data.password;
      //   const hash = new Buffer(`${username}:${password}`).toString('base64');
      ////////////   options.headers['Authorization'] = `Basic ${hash}`;
      
      //////'Authorization': 'Bearer ' + this.state.token.access_token
        
      // } 
    
      return fetch(url, options)
      //.then((response) => response.json())
      .then((response) => {
          console.log("response:"+JSON.stringify(response));
          if(response._bodyBlob._data.size>0){
            return response.json();
          }else{
            return response;
          }
          
      } )
      .then( (responseJson) => {
        console.log('Api response is Ok------------->>>>>>', responseJson);
        return responseJson;
        // let json = resp.json();
        
      
        // if (resp.ok) {
        //   return json;
        // }
        // return json.then(err => {throw err});
      })
      .catch( json => { 
        console.log('Api response is ------------->>>>>>', json);
        DataService.showAlert();
         return json;
      });

    }

    static showAlert(){
      // Works on both iOS and Android
          Alert.alert(
            'Network Error!',
            'Click Ok To Restart App.',
            [
              
              {text: 'OK', onPress: () => RNRestart.Restart()},
            ],
            {cancelable: false},
          );
    }
  }
  export default DataService;
  