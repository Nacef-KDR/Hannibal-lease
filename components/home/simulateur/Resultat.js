import React, {Component} from 'react';
import {TextInput, Button, Text} from 'react-native-paper';
import {View,StyleSheet, ScrollView} from 'react-native';



import RNHTMLtoPDF from 'react-native-html-to-pdf';
//import RNPrint from 'react-native-print';
import * as Print from 'expo-print';
import DataService from '../../services/data.services';

class Resultat extends Component {
  state = {
    tauxInteret: 0,
    listEcheance: [],
  };

  componentDidMount = async () => {
    let NTR = await DataService.get('ParametrageSimulateur/actuelle');
    this.setState({tauxInteret: JSON.parse(NTR).tauxInteret / 100});
    let listEcheance = Array.apply(null, {
      length: this.props.route.params.dureeRemboursementEnMois,
    })
      .map(Number.call, Number)
      .splice(2, this.props.route.params.dureeRemboursementEnMois - 1);
    this.setState({listEcheance: listEcheance});
    console.log(this.state.listEcheance);
  };

  round(number, precision) {
    var factor = Math.pow(10, precision);
    var tempNumber = number * factor;
    var roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
  }

  calculer() {
    const montantEnMilleDinars = parseFloat(
      this.props.route.params.montantEnMilleDinars,
    );
    const montantTVA = parseFloat(this.props.route.params.montantTVA);
    const mntAutoFinancement = parseFloat(
      this.props.route.params.mntAutoFinancement,
    );
    const dureeRemboursementEnMois = parseInt(
      this.props.route.params.dureeRemboursementEnMois,
    );
    const valeurResiduelle = parseFloat(
      this.props.route.params.valeurResiduelle,
    );
    const tauxInteret = this.state.tauxInteret;

    console.log('tauxInteret  : ' + tauxInteret);
    console.log('montantEnMilleDinars : ' + montantEnMilleDinars);
    console.log('montantTVA : ' + montantTVA);
    console.log('mntAutoFinancement : ' + mntAutoFinancement);
    console.log('dureeRemboursementEnMois : ' + dureeRemboursementEnMois);
    console.log('valeurResiduelle : ' + valeurResiduelle);

    let montantFinancementHT = montantEnMilleDinars - montantTVA;
    let montantAutoFinancementHT =
      mntAutoFinancement /
      this.round(1 + montantTVA / (montantEnMilleDinars - montantTVA), 2);

    let Ax = 0;

    if (mntAutoFinancement > 0) {
      Ax =
        ((1 /
          (1 -
            1 /
              Math.exp(
                (dureeRemboursementEnMois - 1) *
                  Math.log(1 + this.round(tauxInteret / 12, 8)),
              ))) *
          ((montantFinancementHT - montantAutoFinancementHT) *
            (1 + this.round(tauxInteret / 12, 8)) -
            valeurResiduelle /
              Math.exp(
                (dureeRemboursementEnMois - 1) *
                  Math.log(1 + this.round(tauxInteret / 12, 8)),
              )) *
          this.round(tauxInteret / 12, 8)) /
        (1 + this.round(tauxInteret / 12, 8));
    } else {
      Ax =
        ((1 /
          (1 -
            1 /
              Math.exp(
                dureeRemboursementEnMois *
                  Math.log(1 + this.round(tauxInteret / 12, 8)),
              ))) *
          ((montantFinancementHT -
            valeurResiduelle /
              Math.exp(
                dureeRemboursementEnMois *
                  Math.log(1 + this.round(tauxInteret / 12, 8)),
              )) *
            this.round(tauxInteret / 12, 8))) /
        (1 + this.round(tauxInteret / 12, 8));
    }

    let mensulaiteHT = parseFloat(Ax).toFixed(3);
    let mensualite = parseFloat(
      mensulaiteHT *
        (montantTVA == 0
          ? 1.19
          : this.round(
              1 + montantTVA / (montantEnMilleDinars - montantTVA),
              2,
            )),
    ).toFixed(3);
    let coutTotal = parseFloat(
      mensulaiteHT *
        (dureeRemboursementEnMois - (mntAutoFinancement == 0.0 ? 0 : 1)) +
        mntAutoFinancement /
          this.round(1 + montantTVA / (montantEnMilleDinars - montantTVA), 2),
    ).toFixed(3);
    let coutCreditTTC = parseFloat(
      mensualite *
        (dureeRemboursementEnMois - (mntAutoFinancement == 0.0 ? 0 : 1)) +
        mntAutoFinancement,
    ).toFixed(3);
    
    return {
      dureeRemboursementEnMois: dureeRemboursementEnMois,
      montantFinancementHT: montantFinancementHT,
      montantEnMilleDinars: montantEnMilleDinars,
      montantTVA: montantTVA,
      mntAutoFinancement: mntAutoFinancement,
      mensulaiteHT: mensulaiteHT,
      mensualite: mensualite,
      coutTotal: coutTotal,
      coutCreditTTC: coutCreditTTC,
    };
  }

  printPDF = async () => {
    const results = await RNHTMLtoPDF.convert({
      html:
        '<div style="text-align:center;"><img src="../../../../assets/images/logo-full.png" /></div><div style="text-align:center;"><h1>ECHEANCIER DE REMBOURSEMENT</h1></div><table width="100%"><tr width="100%"><td width="10%">N° ECHEANCE</td><td width="20%">FINANCEMENT HT</td><td width="20%">TVA / ACHAT</td><td width="15%">LOYER HT</td><td width="15%">TVA</td><td width="15%">LOYER TTC</td></tr><tr width="100%"><td width="10%">1</td><td width="20%">' +
        parseFloat(this.calculer().montantFinancementHT).toFixed(3) +
        '</td><td width="20%">' +
        parseFloat(this.calculer().montantTVA).toFixed(3) +
        '</td><td width="15%">' +
        parseFloat(this.calculer().mntAutoFinancement / (1 + 0.19)).toFixed(3) +
        '</td><td width="15%">' +
        parseFloat(
          this.calculer().mntAutoFinancement -
            this.calculer().mntAutoFinancement / (1 + 0.19),
        ).toFixed(3) +
        '</td><td width="15%">' +
        parseFloat(this.calculer().mntAutoFinancement).toFixed(3) +
        '</td></tr>' +
        this.state.listEcheance.map((obj) => {
          return (
            '<tr width="100%"><td width="10%">' +
            obj +
            '</td><td width="20%"></td><td width="20%"></td><td width="15%">' +
            this.calculer().mensulaiteHT +
            '</td><td width="15%">' +
            parseFloat(
              this.calculer().mensualite - this.calculer().mensulaiteHT,
            ).toFixed(3) +
            '</td><td width="15%">' +
            parseFloat(this.calculer().mensualite).toFixed(3) +
            '</td></tr>'
          );
        }) +
        '<tr width="100%"><td width="10%">' +
        +this.calculer().dureeRemboursementEnMois +
        '</td><td width="20%">' +
        parseFloat(this.calculer().montantFinancementHT).toFixed(3) +
        '</td><td width="20%">' +
        parseFloat(this.calculer().montantTVA).toFixed(3) +
        '</td><td width="15%">' +
        parseFloat(this.calculer().coutTotal).toFixed(3) +
        '</td><td width="15%">' +
        parseFloat(
          this.calculer().coutCreditTTC - this.calculer().coutTotal,
        ).toFixed(3) +
        '</td><td width="15%">' +
        parseFloat(this.calculer().coutCreditTTC).toFixed(3) +
        '</td></tr></table>',
      fileName: 'echeancier',
      base64: true,
    });
    const printToFile = async () => {
      // On iOS/android prints the given html. On web prints the HTML from the current page.
      const { uri } = await Print.printToFileAsync({html});
      console.log('File has been saved to:', uri);
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    }
   // await RNPrint.print({filePath: results.filePath});
  };

  render() {
    
    const {mensulaiteHT, mensualite} = this.calculer();

    return (
      <ScrollView>
        <View style={styles.container}>
          <TextInput
            label={'Loyer Mensuel HT : ' + mensulaiteHT}
            editable={false}
            style={styles.input}
          />
          <TextInput
            label={'Loyer Mensuel TTC : ' + mensualite}
            editable={false}
            style={styles.input}
          />
          <View style={{marginBottom: 15}}>
            <Text>
              {'\u2022'}
              <Text>Cotation à titre indicatif.</Text>
            </Text>
          </View>
          <Button
            large
            mode="contained"
            style={styles.button}
            onPress={() => this.props.navigation.navigate('DemandeCredit')}>
            Demande de financement leasing
          </Button>
          <Button
            large
            mode="contained"
            style={{backgroundColor: '#4C5266', marginTop: 15}}
            onPress={this.printPDF}>
            Imprimer
          </Button>
        </View>
      </ScrollView>
    );
  }
}

export default Resultat;
const styles = StyleSheet.create({
    container: {
      alignContent: 'center',
      backgroundColor: 'white',
      justifyContent: 'center',
      padding: 30,
      height: '100%',
    },
    input: {
      marginBottom: 10,
    },
    button: {
      color: 'white',
      backgroundColor: '#8D1812',
    },
  });
  