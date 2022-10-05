import React, {Component} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {View,StyleSheet, ScrollView} from 'react-native';
import {Picker} from '@react-native-picker/picker';


// import TextInputMask from 'react-native-text-input-mask';
// import CurrencyInput from 'react-currency-input-field';
// import NumberFormat from 'react-number-format';

class Simulateur extends Component {
  state = {
    typeCredit: '',
    montantTVA: 0.0,
    montantTTC: 0.0,
    montantHT: 0.0,
    montantEnMilleDinars: 0.0,
    TxtMontantHT: '',
    TxtMontantTVA: '',
    TxtMontantTTC: '',
    mntFinalHT: '',
    TxtmontantEnMilleDinars: '',
    resid: '',
    mntAutoFinancement: '',
    Txtautofi: '',
    dureeRemboursementEnMois: '',
  };

  componentDidMount = async () => {};

  render() {
    

    var mntAutoFinancement = this.state.mntAutoFinancement;
    var montantEnMilleDinars = parseFloat(this.state.montantEnMilleDinars);
    var montantTVA = parseFloat(this.state.montantTVA);
    var mntFinalHT = montantEnMilleDinars - montantTVA;
    if (this.state.typeCredit == 'Immobilier') {
      var valeurResiduelle = montantEnMilleDinars * 0.01;
    } else {
      var valeurResiduelle = 1;
    }
    var TxtMontantTTC = Number.isNaN(Number(TxtMontantTTC))
      ? '0.000'
      : Number(TxtMontantTTC)
          .toFixed(3)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return (
      <ScrollView>
        <View style={styles.container}>
          <Picker
            style={{
              height: 55,
              marginBottom: 10,
              color: 'grey',
              backgroundColor: '#e5e4e2',
            }}
            selectedValue={this.state.typeCredit}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({typeCredit: itemValue})
            }>
            <Picker.Item label="Type de crédit" value="" />
            <Picker.Item label="Véhicule Automobile particulier" value="Auto" />
            <Picker.Item
              label="Véhicule Automobile utilitaire"
              value="Transport"
            />
            <Picker.Item label="Véhicule transport lourd" value="Lourd" />
            <Picker.Item label="Engins et matériels de BTP" value="BTP" />
            <Picker.Item
              label="Equipement industriel et professionnel"
              value="Industriel"
            />
            <Picker.Item
              label="Immobilier à usage professionnel"
              value="Immobilier"
            />
          </Picker>
          <TextInput
            label="Montant final de financement TTC"
            keyboardType="numeric"
            style={styles.input}
            value={
              (this.state.TxtmontantEnMilleDinars = Number.isNaN(
                Number(montantEnMilleDinars),
              )
                ? '0.000'
                : Number(montantEnMilleDinars).toFixed(3))
            }
            onChangeText={(montantEnMilleDinars) => {
              this.setState({montantEnMilleDinars});
            }}
          />
          <TextInput
            label="Montant TVA"
            keyboardType="numeric"
            style={styles.input}
           // value={this.state.TxtMontantTVA}
            value={
              (this.state.TxtMontantTVA = Number.isNaN(Number(montantTVA))
                ? '0.000'
                : Number(montantTVA).toFixed(3))
            }
            onChangeText={(montantTVA) => {
              this.setState({montantTVA});
            }}
          />
          <TextInput
            label={'Base locative : ' + mntFinalHT}
            editable={false}
            style={styles.input}
          />
          {this.state.typeCredit == 'Immobilier' ? (
            <TextInput
              label={'Valeur résiduelle : ' + valeurResiduelle}
              editable={false}
              style={styles.input}
            />
          ) : (
            <TextInput
              label={'Valeur résiduelle :  1.000'}
              editable={false}
              style={styles.input}
            />
          )}
          <View>
            <TextInput
              label="Montant d’autofinancement (TTC)"
              keyboardType="numeric"
              style={styles.input}
            //  value={this.state.Txtautofi}
              value={
                (this.state.Txtautofi = Number.isNaN(Number(mntAutoFinancement))
                  ? '0.000'
                  : Number(mntAutoFinancement).toFixed(3))
              }
              onChangeText={(mntAutoFinancement) => {
                this.setState({mntAutoFinancement});
              }}
            />
            <Picker
              style={{
                height: 55,
                marginBottom: 10,
                color: 'grey',
                backgroundColor: '#e5e4e2',
              }}
              selectedValue={this.state.dureeRemboursementEnMois}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({dureeRemboursementEnMois: itemValue})
              }>
              <Picker.Item label="N° Mois" value="" />
              <Picker.Item label="24" value="24" />
              <Picker.Item label="30" value="30" />
              <Picker.Item label="36" value="36" />
              <Picker.Item label="48" value="48" />
              <Picker.Item label="54" value="54" />
              <Picker.Item label="60" value="60" />
              <Picker.Item label="72" value="72" />
              <Picker.Item label="84" value="84" />
            </Picker>
            <Button
              large
              style={styles.button}
              color="#ffff"
              onPress={() =>
                this.props.navigation.navigate('Resultat', {
                  typeCredit: this.state.typeCredit,
                  montantEnMilleDinars: montantEnMilleDinars,
                  montantTVA: this.state.montantTVA,
                  mntAutoFinancement: this.state.mntAutoFinancement,
                  dureeRemboursementEnMois: this.state.dureeRemboursementEnMois,
                  valeurResiduelle: valeurResiduelle,
                })
              }>
              Calculer
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Simulateur;
const styles = StyleSheet.create({
    container: {
      alignContent: 'center',
      backgroundColor: 'white',
      justifyContent: 'center',
      padding: 30,
      paddingBottom: 130,
      height: '100%',
    },
    input: {
      marginBottom: 10,
    },  
    button: {
      color: '#ffff',
      backgroundColor: '#4C5266',
      borderRadius: 5,
    },
    style_row_view: {
      flex: 1,
      flexDirection: 'row',
      height: 57,
      backgroundColor: '#FFFFFF',
    },
    
  });
  