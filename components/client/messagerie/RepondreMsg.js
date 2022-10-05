import React, {Component} from 'react';
import {StyleSheet,View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import {TextInput, Button} from 'react-native-paper';
import LocalStorage from '../../storage/LocalStorage';
import DataService from '../../services/data.services';
import Appearences from '../../config/Appearences';


class RepondreMsg extends Component {
  state = {
    dataSource: [],
    users: [],
    role: '',
    email: '',
    currentUserId: 0,
    DestinataireId: 0,
  };

  componentDidMount = async () => {
    this.setState({DestinataireId: this.props.route.params.id});
    let userData = await LocalStorage.getUserProfile();
    if (userData != null) {
      this.setState({role: userData.role});
      this.setState({currentUserId: userData.id});
      this.setState({email: userData.email});
    }
    this.GetUsers(this.state.currentUserId);
  };

  GetUsers = async (id) => {
    if (this.state.role == 'Commercial') {
      let usersComm = await DataService.get('Message/User/Commercial/' + id);
      this.setState({users: JSON.parse(usersComm)});
    } else if (this.state.role == 'Admin') {
      let usersAdm = await DataService.get('Message/Destinataire/User/' + id);
      this.setState({users: JSON.parse(usersAdm)});
    } else if (this.state.role == 'Client') {
      let usersClt = await DataService.get('Message/Commercial/User/' + id);
      this.setState({users: JSON.parse(usersClt)});
    } else if (this.state.role == 'ChefAgence') {
      let usersChfAg = await DataService.get('Message/Destinataire/User/' + id);
      this.setState({users: JSON.parse(usersChfAg)});
    }
  };

  addMessage = async (msge) => {
    let Msg = {
      subject: msge.obj,
      from: this.state.email,
      BodyMsg: msge.msg,
      DestinataireId: msge.DestinataireId,
      EmetteurId: this.state.currentUserId,
    };

    console.log('reqMsg:' + JSON.stringify(Msg));
    await DataService.post('Message', Msg).then(
      (reqMsg) => {
        if (reqMsg.errors == null) {
          this.props.navigation.navigate('Messagerie');
          alert('Message envoyé!');
        } else {
          Alert.alert('error', reqMsg.errors[0].message, [
            {
              text: 'Ok',
            },
          ]);
        }
      },
      (err) => {
        console.log('erreur envoi message:' + err);
      },
    );
  };

  render() {
    
    let msg = this.state.msg;
    let obj = this.state.obj;
    let DestinataireId = this.state.DestinataireId;
    let message = {
      msg: msg,
      obj: obj,
      DestinataireId: DestinataireId,
    };

    return (
      <View style={styles.container}>
        {/* <Text>SendMsg</Text> */}
        <Picker
          style={styles.picker}
          selectedValue={DestinataireId}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({DestinataireId: itemValue});
          }}>
          <Picker.Item label="" value="" />
          {this.state.users.map((user) => {
            return (
              <Picker.Item
                label={user.firstName + ' ' + user.lastName}
                value={user.id}
              />
            );
          })}
        </Picker>
        <TextInput
          style={styles.textInput}
          label="Objet"
          onChangeText={(text) => (message.obj = text)}
        />
        <TextInput
          style={styles.textInput}
          label="Message"
          onChangeText={(text) => (message.msg = text)}
        />
        <Button
          style={styles.button}
          large
          mode="contained"
          onPress={() => this.addMessage(message)}>
          Envoyer
        </Button>
      </View>
    );
  }
}

export default RepondreMsg;
const styles= StyleSheet.create({
    container: {
      alignContent: 'center',
      alignItems: 'center',
      marginBottom: 15,
      paddingTop: 15,
    },
    picker: {
      height: 50,
      marginTop: 15,
      width: '90%',
      backgroundColor: '#fff',
      color: 'grey',
    },
    textInput: {
      height: Appearences.Registration.itemHeight,
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
    }
  });
  