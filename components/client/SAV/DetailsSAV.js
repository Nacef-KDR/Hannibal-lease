import React, {Component} from 'react';
import {View, Text,StyleSheet, ScrollView} from 'react-native';
import {List} from 'react-native-paper';


import Moment from 'moment';
import DataService from '../../services/data.services';

class DetailsSAV extends Component {
  state = {
    savDemande: [],
    id: 0,
  };

  componentDidMount = async () => {
    //Get SAVDemande Id
    this.setState({id: this.props.route.params.id});
    //Get SAVDemande
    let demandeData = await DataService.get(
      'SAVDemande/' + this.props.route.params.id,
    );
    this.setState({savDemande: JSON.parse(demandeData)});
  };

  render() {
    const {containerItems, item, text} = style;
    const savDemande = this.state.savDemande;
    return (
      <ScrollView>
        <View>
          <View style={styles.containerItems}>
            <Text style={text}>REFERENCE {savDemande.id}</Text>
            <List.Item
              style={styles.item}
              title={
                'Date SAV demande : ' +
                Moment(savDemande.dateDemande).format('DD/MM/YYYY')
              }
            />
            <List.Item
              style={styles.item}
              title={'Demandeur : ' + savDemande.nomDemandeur}
            />
            <List.Item
              style={styles.item}
              title={'Type SAV Demande : ' + savDemande.typeSAVdemandeName}
            />
            <List.Item
              style={styles.item}
              title={'Statut SAV Demande : ' + savDemande.statut}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default DetailsSAV;
const styles = StyleSheet.create({
    containerItems: {
      marginBottom: 30,
      marginTop: 20,
      paddingTop: 20,
      backgroundColor: '#fff',
    },
    item: {
      padding: 5,
      borderBottomColor: 'lightgrey',
      borderBottomWidth: 1,
    },
    text: {
      fontSize: 18,
      fontWeight: 'bold',
      marginStart: 15,
      marginBottom: 18,
    },
  });
  