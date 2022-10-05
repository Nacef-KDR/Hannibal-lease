import React, {Component} from 'react';
import {Text, View, ActivityIndicator, ScrollView} from 'react-native';

import {List, Searchbar, Card, Title, Paragraph} from 'react-native-paper';
import Moment from 'moment';
import LocalStorage from '../../storage/LocalStorage';
import DataService from '../../services/data.services';
//import DataService from '../../../services/data.service';
//import LocalStorage from '../../../storage/LocalStorage';

class Contrat extends Component {
  state = {search: '', dataSource: [], isLoading: true, arrayholder: []};

  componentDidMount = async () => {
    let userData = await LocalStorage.getUserProfile();
    if (userData != null) {
      let listContrat = await DataService.get(
        'SAVDemande/Contrat/User/' + userData.id,
      );
      this.setState(
        {dataSource: JSON.parse(listContrat), isLoading: false},
        function () {
          this.arrayholder = JSON.parse(listContrat);
        },
      );
    }
  };

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function (item) {
      const itemData = item.refContrat
        ? item.refContrat.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({dataSource: newData, search: text});
  }

  render() {
    const {container, input, item, text, activator} = style;
    const {dataSource} = this.state;

    return this.state.isLoading ? (
      <View style={activator}>
        <ActivityIndicator size="large" color="#f06802" />
      </View>
    ) : (
      <ScrollView>
        <View style={container}>
          <Searchbar
            style={input}
            round
            searchIcon={{size: 25}}
            theme={{
              colors: {primary: '#000', underlineColor: 'transparent'},
            }}
            onChangeText={(text) => this.SearchFilterFunction(text)}
            onClear={(text) => this.SearchFilterFunction('')}
            placeholder="Rechercher par référence"
            value={this.state.search}
          />
          <Text style={text}>Liste des contrats</Text>
          <View>
            {dataSource.length == 0 ? (
              <List.Item style={item} title="Aucun contrat" description="" />
            ) : (
              dataSource.map((cnt) => {
                return (
                  <Card style={{marginBottom: 20}}>
                    <Card.Content>
                      <Title>Référence : {cnt.refContrat}</Title>
                      <Paragraph>Financement : {cnt.financement}</Paragraph>
                      <Paragraph>Materiel : {cnt.materiel}</Paragraph>
                      <Paragraph>
                        Date mise en force :{' '}
                        {Moment(cnt.dateMEF).format('DD/MM/YYYY')}
                      </Paragraph>
                      <Paragraph>
                        Date fin contrat :{' '}
                        {Moment(cnt.dateFin).format('DD/MM/YYYY')}
                      </Paragraph>
                      <Paragraph>Echeance : {cnt.echeance}</Paragraph>
                      <Paragraph>Loyer TTC : {cnt.loyerTTC}</Paragraph>
                    </Card.Content>
                  </Card>
                );
              })
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Contrat;
