import {PermissionsAndroid, Alert} from 'react-native';
//import RNFetchBlob from 'rn-fetch-blob';

class fileHelper{

    static download = async(urlFile) =>{ 
        
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Permission granted");
        
        var date      = new Date();
        var url       = "http://51.75.142.119:8384" + urlFile;
        var ext       = this.extention(url);
        ext = "."+ext[0];
       // const { config, fs } = RNFetchBlob
        let PictureDir = fs.dirs.DownloadDir
        let options = {
          fileCache: true, 
          addAndroidDownloads : {
            useDownloadManager : true,
            notification : true,
            path:  PictureDir + "/image_"+Math.floor(date.getTime() + date.getSeconds() / 2)+ext,
            description : 'Image'
          }
        }
        config(options).fetch('GET', url).then((res) => {
          Alert.alert('Succès', 'Fichier téléchargé avec succès !', [
            {
              text: 'Ok',
            },
          ]);
        });

        } else {
            console.log('Permission denied');
        }
      }
    static extention(filename){
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
      }
    
}

export default fileHelper;
