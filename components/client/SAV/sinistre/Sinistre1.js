import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {List, Searchbar, Button} from 'react-native-paper';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LocalStorage from '../../../storage/LocalStorage';
import DataService from '../../../services/data.services';

class Sinistre extends Component {
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
    const {container, input, button, item, text, activator, searchIcon} = style;
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
        <View>
          <Button
            style={{
              alignSelf: 'flex-end',
              backgroundColor: '#8D1812',
              color: 'white',
              width: 15,
              marginBottom: 10,
            }}
            mode="contained"
            onPress={() => this.props.navigation.navigate('AjouterSinistre')}>
            <Icon style={searchIcon} name="plus" size={12} />
          </Button>
        </View>
        <Text style={text}>Liste des sinistres</Text>
        <View>
          {dataSource.length == 0 ? (
            <List.Item style={item} title="Aucun sinistre" description="" />
          ) : (
            <FlatList
              data={this.state.dataSource}
              renderItem={({item}) =>
                item.typeSAVdemandeId == 3 ? (
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

export default Sinistre;
