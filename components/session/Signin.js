import React, {useState} from 'react';
//import {StyleSheet} from 'react-native';
import Appearences from '../config/Appearences';
import {
  View,
  Text,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import DataService from '../services/data.services';
import LocalStorage from '../storage/LocalStorage';
import {useForm, Controller} from 'react-hook-form';
import Icon from 'react-native-vector-icons/FontAwesome5';

function Signin ({navigation}) {
  const {control, handleSubmit, errors} = useForm();
  const [hidePass, setHidePass] = useState(true);

  const getUserByUserName = async (email) => {
    return await DataService.get('Account/userbyemail?email=' + email);
  };

  const login = async (data) => {
    const pseudo = data.pseudo;
    const psw = data.psw;

    const obj = {
      username: pseudo,
      password: psw,
      client_id: 'leasingportal',
      grant_type: 'password',
      scope: 'offline_access profile email',
    };

    let responseLogin = await DataService.post('token/auth', obj);

    if (responseLogin != false) {
      let userData = await getUserByUserName(data.pseudo);

      if (userData != null) {
        LocalStorage.saveProfile(userData.value);
      }
      if (responseLogin != null) {
        LocalStorage.setToken(responseLogin);
      }
      navigation.navigate('Accueil');
    } else {
      Alert.alert('Erreur', 'Email ou mot de passe incorrect!', [
        {
          text: 'Ok',
        },
      ]);
    }
  };
  

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../../assets/logo-full.png')}
        />
        <Text style={styles.head}>S'authentifier en toute sécurité</Text>
        <View>
          
           <Text style={styles.error}>* Entrez un email valide</Text>
          <Controller
            control={control}
            render={({ field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                label="Email"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="pseudo"
            rules={{required: true, pattern: /^\S+@\S+$/i}}
            defaultValue=""
          />

           <Text style={styles.error}>* Entrez votre mot de passe</Text>
          <Controller
            control={control}
            render={({field : {onChange, onBlur, value}}) => (
              <View style={styles.rowCol}>
                <TextInput
                  style={styles.textInputShow}
                  label="Mot de passe"
                  secureTextEntry={hidePass ? true : false}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
                <Icon
                  style={styles.iconShow}
                  name={hidePass ? 'eye' : 'eye-slash'}
                  onPress={() => setHidePass(!hidePass)}
                />
              </View>
            )}
            name="psw"
            rules={{required: true}}
            defaultValue=""
          />
          <Button
            style={styles.button}
            large
            mode="contained"
            onPress={handleSubmit(login)}>
            Se connecter
          </Button>
          <TouchableOpacity onPress={() => navigation.navigate('HomeE2')}>
            <Text
              style={{
                color: '#3c4454',
                marginTop: 27,
                alignSelf: 'center',
                textDecorationLine: 'underline',
                fontWeight: 'bold',
              }}>
              <Icon
                name="home"
                size={20}
                color="#3c4454"
                style={{marginEnd: 25}}
              />
              Accueil
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signin;
const styles = StyleSheet.create({
    container: {
      alignContent: 'center',
      margin: 10,
      marginTop: 50,
    },
    head: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    input: {
      backgroundColor: '#fff',
      marginBottom: 10,
      height: 50,
      fontSize: Appearences.Registration.fontSize,
      color: Appearences.Colors.headingGrey,
    },
    button: {
      marginTop: 15,
      borderRadius: 5,
      backgroundColor: '#8D1812',
      color: 'white',
    },
    logo: {
      alignSelf: 'center',
      marginBottom: 20,
    },
    error: {
      color: 'red',
      marginStart: 10,
    },
    rowCol: {
      flexDirection: 'row',
      marginBottom: '3%',
      alignSelf: 'center',
    },
    iconShow: {
      marginTop: '4%',
      paddingTop: '5%',
      backgroundColor: '#fff',
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
      paddingRight: 3,
      height: 51
    },
    textInputShow: {
      height: Appearences.Registration.itemHeight,
      width: '95%',
      backgroundColor: Appearences.Registration.boxColor,
      paddingEnd: 15,
      marginTop: 15,
      paddingBottom: 0,
      paddingTop: 0,
      fontSize: Appearences.Registration.fontSize,
      color: Appearences.Colors.headingGrey,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
      backgroundColor: '#fff',
      marginBottom: 10,
    },
  });
  