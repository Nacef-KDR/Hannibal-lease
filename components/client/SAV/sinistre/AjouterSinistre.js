import React, {Component} from 'react';
import {View, Text,StyleSheet, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';

import DateTimePicker from '@react-native-community/datetimepicker';
import LocalStorage from '../../../storage/LocalStorage';
import DataService from '../../../services/data.services';


class AjouterSinistre extends Component {
  state = {
    dataSource: [],
    dateSinistre: new Date(),
    typeSinistreId: '',
    idDemande: 0,
  };

  componentDidMount = async () => {
    let userData = await LocalStorage.getUserProfile();
    if (userData != null) {
      let DdeSAV = await DataService.get(
        'SAVDemande/Demande/User/' + userData.id,
      );
      this.setState({dataSource: JSON.parse(DdeSAV)});
    }
  };

  setDate = (event, dateSinistre) => {
    dateSinistre == null
      ? new Date()
      : (dateSinistre = dateSinistre || this.state.state);
    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      dateSinistre: dateSinistre == null ? new Date() : dateSinistre,
    });
  };
  show = (mode) => {
    this.setState({
      show: true,
      mode,
    });
  };
  datepicker = () => {
    this.show('date');
  };
  showDate = () => {
    this.setState({
      showDate: !this.state.showSate,
      mode: 'date',
    });
  };

  addSinistre = async () => {
    let sinistre = {
      TypeSAVdemandeId: 3,
      DemandeId: this.state.idDemande,
      Statut: 'Nouveau',
      DateDemande: this.state.dateSinistre.toLocaleDateString(),
      TypeSinistre: this.state.typeSinistreId,
    };
    console.log('reqSinistre:' + JSON.stringify(sinistre));
    await DataService.post('SAVDemande', sinistre).then(
      (reqSinistre) => {
        if (reqSinistre.errors == null) {
          this.props.navigation.navigate('Sinistre');
          alert('Sinistre envoyé!');
        } else {
          Alert.alert('error', reqSinistre.errors[0].message, [
            {
              text: 'Ok',
            },
          ]);
        }
      },
      (err) => {
        console.log('erreur envoi de sinistre:' + err);
      },
    );
  };

  render() {
    const {row, button, container, picker, box} = style;
    const {show, mode, dataSource} = this.state;
    let dateSinistre = this.state.dateSinistre;
    let typeSinistreId = this.state.typeSinistreId;
    let idDemande = this.state.idDemande;

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={{fontSize: 14, marginTop: 15, marginRight: 18}}>
            N° Demande
          </Text>
          <Picker
            style={{
              height: 50,
              marginBottom: 15,
              width: '72%',
              backgroundColor: '#fff',
              color: 'grey',
            }}
            selectedValue={idDemande}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({idDemande: itemValue})
            }>
            <Picker.Item label="" value="" key={0} />
            {dataSource.map((dmd) => {
              return <Picker.Item label={dmd.id} value={dmd.id} key={dmd.id} />;
            })}
          </Picker>
        </View>
        <View style={styles.row}>
          <Text style={{fontSize: 14, marginTop: 15, marginRight: 5}}>
            Type Sinistre
          </Text>
          <Picker
            style={{
              height: 50,
              marginBottom: 15,
              width: '72%',
              backgroundColor: '#fff',
              color: 'grey',
            }}
            selectedValue={typeSinistreId}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({typeSinistreId: itemValue});
            }}>
            <Picker.Item label="" value="" key={0} />
            <Picker.Item label="Vol" value="Vol" key={1} />
            <Picker.Item label="Epave" value="Epave" key={2} />
            <Picker.Item
              label="Sinistre standard"
              value="Sinistre standard"
              key={3}
            />
          </Picker>
        </View>
        <View style={styles.row}>
          <Text style={{fontSize: 14, marginTop: 15, marginRight: 10}}>
            Choisir une date
          </Text>
          <TouchableOpacity onPress={this.datepicker}>
            <View style={styles.box} backgroundColor="#fff" pointerEvents="none">
              <Text>{this.state.dateSinistre.toLocaleDateString()}</Text>
            </View>
          </TouchableOpacity>
        </View>
        {show && (
          <DateTimePicker
            value={dateSinistre}
            mode={mode}
            minimumDate={new Date()}
            dateFormat="DD-MM-YYYY"
            display="default"
            onChange={this.setDate}
          />
        )}
        <Button
          style={styles.button}
          large
          mode="contained"
          onPress={() => this.addSinistre()}>
          Ajouter
        </Button>
      </View>
    );
  }
}

export default AjouterSinistre;
const styles = StyleSheet.create({
    container:{
      alignContent: 'center',
      marginTop: 20,
    },
    container: {
      alignContent: 'center',
      alignItems: 'center',
      marginBottom: 15,
      paddingTop: 15,
    },
    button: {
      width: '90%',
      marginTop: 15,
    },
    box: {
      padding: 15,
      marginBottom: 5,
      color: 'grey',
      width: 250
    },
    row: {
      flexDirection: 'row',
    }
  });
  