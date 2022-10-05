import React, {Component} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';

import {List, Searchbar} from 'react-native-paper';
import Moment from 'moment';
import LocalStorage from '../../storage/LocalStorage';
import DataService from '../../services/data.services';


class Facture extends Component {
  state = {search: '', dataSource: [], isLoading: true, arrayholder: []};

  componentDidMount = async () => {
    let userData = await LocalStorage.getUserProfile();
    if (userData != null) {
      let listFacture = await DataService.get('Facture/User/' + userData.id);
      this.setState(
        {dataSource: JSON.parse(listFacture), isLoading: false},
        function () {
          this.arrayholder = JSON.parse(listFacture);
        },
      );
    }
  };

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function (item) {
      const itemData = item.reference
        ? item.reference.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({dataSource: newData, search: text});
  }

  render() {
    const {container, input, activator, item, text} = style;
    const {dataSource} = this.state;
    return this.state.isLoading ? (
      <View style={activator}>
        <ActivityIndicator size="large" color="#8D1812" />
      </View>
    ) : (
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
        <Text style={text}>Liste des factures</Text>
        <View>
          {dataSource.length == 0 ? (
            <List.Item style={item} title="Aucune facture" description="" />
          ) : (
            <FlatList
              data={this.state.dataSource}
              renderItem={({item}) => (
                <List.Item
                  style={{
                    borderBottomColor: 'lightgrey',
                    borderBottomWidth: 1,
                  }}
                  title={item.reference}
                  description={item.demandeId}
                  right={(props) => (
                    <View {...props}>
                      <Text style={{color: '#8D1812'}}>
                        {item.libelleFacture}
                      </Text>
                      <Text>
                        {Moment(item.dateFacture).format('DD/MM/YYYY')}
                      </Text>
                    </View>
                  )}
                />
              )}
              keyExtractor={item.id}
              enableEmptySections={true}
              style={{backgroundColor: '#ffff'}}
            />
          )}
        </View>
      </View>
    );
  }
}

export default Facture;
