import React, {Component} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
//import style from './../../styles';
import {List, Searchbar} from 'react-native-paper';
import Moment from 'moment';
import LocalStorage from '../../storage/LocalStorage';
import DataService from '../../services/data.services';
//import DataService from '../../../services/data.service';
//import LocalStorage from '../../../storage/LocalStorage';

class Impaye extends Component {
  state = {search: '', dataSource: [], isLoading: true, arrayholder: []};

  componentDidMount = async () => {
    let userData = await LocalStorage.getUserProfile();
    if (userData != null) {
      let listImpayes = await DataService.get(
        'SAVDemande/Impayes/User/' + userData.id,
      );
      this.setState(
        {dataSource: JSON.parse(listImpayes), isLoading: false},
        function () {
          this.arrayholder = JSON.parse(listImpayes);
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
        <Text style={text}>Liste des impayés</Text>
        <View>
          {dataSource.length == 0 ? (
            <List.Item style={item} title="Aucun impayé" description="" />
          ) : (
            <FlatList
              data={this.state.dataSource}
              renderItem={({item}) => (
                <List.Item
                  style={{
                    borderBottomColor: 'lightgrey',
                    borderBottomWidth: 1,
                  }}
                  title={item.refContrat}
                  right={(props) => (
                    <View {...props}>
                      <Text style={{color: '#8D1812'}}>{item.montant}</Text>
                      <Text>{Moment(item.echeance).format('DD/MM/YYYY')}</Text>
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

export default Impaye;
