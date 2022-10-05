import React , {Component} from 'react';
import {View, Text, ScrollView,Dimensions,StyleSheet} from 'react-native';
import DataService from '../services/data.services';

import LocalStorage from '../storage/LocalStorage';


class DashboardClient extends Component {
  state = {
    stat: [],
    isLoading: true,
    NbrDdeCoursEtude: 0,
    NbreDdeComplementInfo: 0,
    NbrDdeRejetee: 0,
    NbrDdeAccorde: 0,
  };

  componentDidMount = async () => {
    let userData = await LocalStorage.getUserProfile();
    if (userData != null) {
      let dataSource = await DataService.get('DashBoard/' + userData.id);
      this.setState({stat: JSON.parse(dataSource), isLoading: false});
    }
  };

  render() {
    const chartConfig = {
      backgroundGradientFrom: '#1E2923',
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: '#08130D',
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2,
      barPercentage: 0.5,
      useShadowColorFromDataset: false,
    };
    const data = [
      {
        name: 'En cours',
        population: 743660,
        color: '#8D1812',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Renvoyées',
        population: 527612,
        color: 'grey',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Rejetées',
        population: 738000,
        color: '#ffffff',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Accordées',
        population: 1192000,
        color: '#4C5266',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
    ];
    const screenWidth = Dimensions.get('window').width;
    const {text, row, box, boxtext, boxtext2} = style;
    const stat = this.state.stat;

    return (
      <ScrollView>
        <View>
          <View style={styles.row}>
            <View style={styles.box} backgroundColor="#8D1812">
              <Text style={styles.boxtext}>{stat.nbrDemandeEnCoursEtude}</Text>
              <Text style={styles.boxtext}>Demandes en cours</Text>
            </View>
            <View style={styles.box} backgroundColor="grey">
              <Text style={styles.boxtext}>{stat.nbrDemandeComplementInfo}</Text>
              <Text style={styles.boxtext}>
                Demandes renvoyées pour complément d'informations
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.box} backgroundColor="white">
              <Text style={styles.boxtext2}>{stat.nbrDemandeAccourdee}</Text>
              <Text style={styles.boxtext2}>Demandes accordées</Text>
            </View>
            <View style={styles.box} backgroundColor="#4C5266">
              <Text style={styles.boxtext}>{stat.nbrDemandeRejete}</Text>
              <Text style={styles.boxtext}>Demandes rejetées</Text>
            </View>
          </View>
          <View
            style={{alignContent: 'center', marginBottom: 20, marginTop: 25}}>
            <View style={styles.box} backgroundColor="#8D1812">
              <Text style={styles.boxtext}>{stat.nbrDemandeComplementInfo}</Text>
              <Text style={styles.boxtext}>Boite leaser commerciale</Text>
            </View>
          </View>
         
        </View>
      </ScrollView>
    );
  }
}

export default DashboardClient;


const styles= StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 25,
  },
  box: {
    width: 170,
    height: 170,
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    paddingTop: 50,
    marginRight: '3%',
  },
  boxtext: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'white',
  },
  boxtext2: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  row: {
    flexDirection: 'row',
    marginBottom: '3%',
    marginLeft: '7%',
    marginTop: '7%',
  },
});
