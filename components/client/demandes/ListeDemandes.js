import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

import {List, Searchbar} from 'react-native-paper';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LocalStorage from '../../storage/LocalStorage';
import DataService from '../../services/data.services';

class ListDemandes extends Component {
  state = {
    search: '',
    dataSource: [],
    isLoading: true,
    arrayholder: [],
    visible: true,
    role: '',
  };

  openMenu = () => this.setState({visible: true});
  closeMenu = () => this.setState({visible: false});

  componentDidMount = async () => {
    this.getList();
  };

  getList = async () => {
    let userData = await LocalStorage.getUserProfile();
    if (userData != null) {
      this.setState({role: userData.role});
      console.log(userData);
      let listDde = await DataService.get('Demande/User/' + userData.id);
      this.setState(
        {dataSource: JSON.parse(listDde), isLoading: false},
        function () {
          this.arrayholder = JSON.parse(listDde);
        },
      );
    }
  };

  Delete(id) {
    DataService.delete('Demande/' + id);
    this.getList();
  }

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function (item) {
      const itemData =
        Moment(item.dateDemande).format('YYYY') + '-' + item.id.toString()
          ? Moment(item.dateDemande).format('YYYY') +
            '-' +
            item.id.toString().toUpperCase()
          : ''.toUpperCase();
      const textData = text.toString().toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({dataSource: newData, search: text});
  }

  render() {
    const {visible} = this.state;
    const {navigate} = this.props.navigation;
    const {dataSource} = this.state;
    const {container, input, item, text, activator} = style;
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
        <Text style={text}>Mes demandes</Text>
        <View>
          {dataSource.length == 0 ? (
            <List.Item style={item} title="Aucune demande" description="" />
          ) : (
            <FlatList
              data={this.state.dataSource}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => navigate('DetailsDemande', {id: item.id})}>
                  <List.Item
                    style={{
                      borderBottomColor: 'lightgrey',
                      borderBottomWidth: 1,
                    }}
                    title={
                      item.reference != null
                        ? item.reference
                        : Moment(item.dateDemande).format('YYYY') +
                          '-' +
                          item.id
                    }
                    description={item.demandeur}
                    right={(props) => (
                      <View {...props}>
                        <View style={{flexDirection: 'row'}}>
                          <View>
                            {item.statut == 'Rejete' ? (
                              <Text style={{color: '#8D1812'}}>Rejetée</Text>
                            ) : item.statut == 'Valide' ? (
                              <Text style={{color: '#8D1812'}}>Validée</Text>
                            ) : item.statut == 'ComplementInformation' ? (
                              <Text style={{color: '#8D1812'}}>
                                Complément d'information
                              </Text>
                            ) : (
                              <Text style={{color: '#8D1812'}}>
                                {item.statut}
                              </Text>
                            )}
                            <Text>
                              {Moment(item.dateDemande).format('DD/MM/YYYY')}
                            </Text>
                          </View>
                          {this.state.role == 'Client' ? (
                            <View style={{marginLeft: 10}}>
                              {item.statut == 'Nouveau' ||
                              item.statut == 'ComplementInformation' ||
                              item.statut == 'Rejete' ? (
                                <View>
                                  <TouchableHighlight
                                    onPress={() =>
                                      navigate('EditDemande', {id: item.id})
                                    }>
                                    <Icon
                                      name="edit"
                                      size={13}
                                      style={{
                                        color: '#8D1812',
                                        marginBottom: 15,
                                      }}
                                    />
                                  </TouchableHighlight>
                                </View>
                              ) : (
                                <View></View>
                              )}
                              {item.statut == 'Nouveau' ? (
                                <View>
                                  <TouchableHighlight
                                    onPress={() => this.Delete(item.id)}>
                                    <Icon name="trash-alt" size={13} />
                                  </TouchableHighlight>
                                </View>
                              ) : (
                                <View></View>
                              )}
                            </View>
                          ) : (
                            <View></View>
                          )}
                        </View>
                      </View>
                    )}
                    horizontal={false}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={item.id}
              key={item.id}
              enableEmptySections={true}
              style={{backgroundColor: '#ffff'}}
            />
          )}
        </View>
      </View>
    );
  }
}

export default ListDemandes;
const style = StyleSheet.create({
  container: {
    alignContent: 'center',
    marginBottom: 15,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    marginTop: 5,
    marginBottom: 20,
    marginStart: 5,
    marginEnd: 5,
    borderRadius: 45,
  },
  item: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  button: {
    marginEnd: 10,
    alignSelf: 'flex-end',
    backgroundColor: '#8D1812',
    color: 'white',
    width: 30,
  },
  text: {
    marginTop: 5,
    marginBottom: 15,
    marginStart: 10,
    fontWeight: 'bold',
  },
  activator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
