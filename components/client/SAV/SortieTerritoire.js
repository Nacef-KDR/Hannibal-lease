import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import {List, Searchbar} from 'react-native-paper';
import Moment from 'moment';
import LocalStorage from '../../storage/LocalStorage';
import DataService from '../../services/data.services';


class SortieTerritoire extends Component {
  state = {search: '', dataSource: [], isLoading: true, arrayholder: []};

  componentDidMount = async () => {
    let userData = await LocalStorage.getUserProfile();
    if (userData != null) {
      let listDdeSAV = await DataService.get('SAVDemande/User/' + userData.id);
      this.setState(
        {dataSource: JSON.parse(listDdeSAV), isLoading: false},
        function () {
          this.arrayholder = JSON.parse(listDdeSAV);
        },
      );
    }
  };

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function (item) {
      const itemData = item.id.toString()
        ? item.id.toString().toUpperCase()
        : ''.toUpperCase();
      const textData = text.toString().toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({dataSource: newData, search: text});
  }

  render() {
    const {container, input, item, text, activator} = style;
    const {dataSource} = this.state;
    const {navigate} = this.props.navigation;
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
        <Text style={text}>Liste des demandes</Text>
        <View>
          {dataSource.length == 0 ? (
            <List.Item style={item} title="Aucune demande" description="" />
          ) : (
            <FlatList
              data={this.state.dataSource}
              renderItem={({item}) =>
                item.typeSAVdemandeId == 5 ? (
                  <TouchableOpacity
                    onPress={() => navigate('DetailsSAV', {id: item.id})}>
                    <List.Item
                      style={{
                        borderBottomColor: 'lightgrey',
                        borderBottomWidth: 1,
                      }}
                      title={item.id}
                      right={(props) => (
                        <View {...props}>
                          <Text style={{color: '#8D1812'}}>{item.statut}</Text>
                          <Text>
                            {Moment(item.dateDemande).format('DD/MM/YYYY')}
                          </Text>
                        </View>
                      )}
                    />
                  </TouchableOpacity>
                ) : (
                  <View />
                )
              }
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

export default SortieTerritoire;
