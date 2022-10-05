import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import Appearences from '../../config/Appearences'
import {TextInput, Button} from 'react-native-paper';
import DataService from '../../services/data.services';
import LocalStorage from '../../storage/LocalStorage';


class AjoutReclamation extends Component {
  state = {
    currentUserId: 0,
  };

  componentDidMount = async () => {
    let userData = await LocalStorage.getUserProfile();
    if (userData != null) {
      this.setState({currentUserId: userData.id});
    }
  };

  addReclamation = async (rec) => {
    let Reclm = {
      subjectRec: rec.subjectRec,
      BodyRec: rec.BodyRec,
      UserId: this.state.currentUserId,
    };

    console.log('reqReclm:' + JSON.stringify(Reclm));
    await DataService.post('Reclamation', Reclm).then(
      (reqReclm) => {
        if (reqReclm.errors == null) {
          this.props.navigation.navigate('ListReclamation');
          alert('Réclamation envoyé!');
        } else {
          Alert.alert('error', reqReclm.errors[0].message, [
            {
              text: 'Ok',
            },
          ]);
        }
      },
      (err) => {
        console.log('erreur envoi reclamation:' + err);
      },
    );
  };

  render() {
    const {container, textInput, button} = style;
    let BodyRec = this.state.BodyRec;
    let subjectRec = this.state.subjectRec;
    let reclamation = {
      BodyRec: BodyRec,
      subjectRec: subjectRec,
    };

    return (
      <View style={container}>
        <TextInput
          style={textInput}
          label="Objet"
          onChangeText={(text) => (reclamation.subjectRec = text)}
        />
        <TextInput
          multiline={true}
          numberOfLines={6}
          style={textInput}
          label="Réclamation"
          onChangeText={(text) => (reclamation.BodyRec = text)}
        />
        <Button
          style={button}
          large
          mode="contained"
          onPress={() => this.addReclamation(reclamation)}>
          Envoyer
        </Button>
      </View>
    );
  }
}

export default AjoutReclamation;
const styles= StyleSheet.create({
    container: {
      alignContent: 'center',
      alignItems: 'center',
      marginBottom: 15,
      paddingTop: 15,
    },
    textInput: {
      width: '90%',
      backgroundColor: Appearences.Registration.boxColor,
      paddingEnd: 15,
      marginTop: 15,
      paddingBottom: 0,
      paddingTop: 0,
      fontSize: Appearences.Registration.fontSize,
      color: Appearences.Colors.headingGrey,
      borderRadius: 5,
    },
    button: {
      width: '90%',
      marginTop: 15,
    },
  });