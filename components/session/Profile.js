import React, {Component} from 'react';
import {View, Text,StyleSheet, ScrollView} from 'react-native';
import {Avatar} from 'react-native-paper';


import Moment from 'moment';
import LocalStorage from '../storage/LocalStorage';

class Profil extends Component {
  state = {
    currentUser: null,
  };

  componentDidMount = async () => {
    this.setState({currentUser: await LocalStorage.getUserProfile()});
  };

  render() {
    const userData = this.state.currentUser;
   

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.head}>
            <Avatar.Image
              size={94}
              source={require('../../assets/user-default.png')}
            />
            <View style={{flexDirection: 'row'}}>
              {userData?.profile != 'Entreprise' ? (
                <Text style={styles.text}>{userData?.civilite + '. '}</Text>
              ) : (
                <View />
              )}
              <Text style={styles.text}>
                {userData?.firstname + ' ' + userData?.lastname}
              </Text>
            </View>
          </View>
          <View style={styles.content}>
            <Text style={styles.textcontent}>Email: {userData?.email}</Text>
            {userData?.profile != 'Entreprise' ? (
              <Text style={styles.textcontent}>
                Date de naissance:{' '}
                {Moment(userData?.dateNaissance).format('DD/MM/YYYY')}
              </Text>
            ) : (
              <View />
            )}
            <Text style={styles.textcontent}>
              Nature d'activité: {userData?.natureActiviteName}
            </Text>
            <Text style={styles.textcontent}>
              Identifiant unique: {userData?.identifiantUnique}
            </Text>
            {userData?.profile == 'Entreprise' ? (
              <Text style={styles.textcontent}>
                Raison social: {userData?.raisonSocial}
              </Text>
            ) : (
              <View />
            )}
            {userData?.profile == 'Entreprise' ? (
              <Text style={styles.textcontent}>
                Forme juridique: {userData?.formeJuridique}
              </Text>
            ) : (
              <View />
            )}
            {userData?.profile == 'Entreprise' ? (
              <Text style={styles.textcontent}>
                Groupe d'appartenance: {userData?.groupe}
              </Text>
            ) : (
              <View />
            )}
            {userData?.profile != 'Entreprise' ? (
              <Text style={styles.textcontent}>
                Pièce d'identité: {userData?.naturePieceIdentite} -{' '}
                {userData?.ncin}
              </Text>
            ) : (
              <View />
            )}
            {/* <Text style={textcontent}>Code BCT: {userData?.codeBCT}</Text> */}
            <Text style={styles.textcontent}>Profile: {userData?.profile}</Text>
            <Text style={styles.textcontent}>Mobile: {userData?.mobile}</Text>
            <Text style={styles.textcontent}>Téléphone: {userData?.telFix}</Text>
            {/* <Text style={textcontent}>Fax: {userData?.fax}</Text> */}
            <Text style={styles.textcontent}>Adresse: {userData?.adresse}</Text>
            <Text style={styles.textcontent}>
              Ville: {userData?.ville}, {userData?.codePostal}
            </Text>
            <Text style={styles.textcontent}>Pays: {userData?.pays}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Profil;
const styles =StyleSheet.create({
    container: {
      alignContent: 'center',
      backgroundColor: '#fff',
    },
    head: {
      height: 170,
      width: '100%',
      alignItems: 'center',
      backgroundColor: '#8D1812',
      paddingTop: 20,
      paddingBottom: 20,
    },
    text: {
      color: '#fff',
      fontSize: 16,
      marginTop: 10,
    },
    content: {
      padding: 25,
    },
    textcontent: {
      marginTop: 20,
      fontWeight: 'bold',
    },
  });
  