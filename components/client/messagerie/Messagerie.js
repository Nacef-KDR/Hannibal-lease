import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {List, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Moment from 'moment';
import LocalStorage from '../../storage/LocalStorage';
import DataService from '../../services/data.services';


class Messagerie extends Component {
  state = {
    dataSource: [],
    isLoading: true,
  };

  componentDidMount = async () => {
    this.getMsgs();
  };

  getMsgs = async () => {
    let userData = await LocalStorage.getUserProfile();
    if (userData != null) {
      let messages = await DataService.get('Message/User/' + userData.id);
      this.setState({dataSource: JSON.parse(messages), isLoading: false});
    }
  };

  Archived(id) {
    DataService.post('Message/Archived/' + id);
    //this.getMsgs();
  }

  render() {
    const {container, item, text, activator} = style;
    const {dataSource} = this.state;
    const {navigate} = this.props.navigation;

    return this.state.isLoading ? (
      <View style={activator}>
        <ActivityIndicator size="large" color="#8D1812" />
      </View>
    ) : (
      <View style={container}>
        <View>
          <Button
            style={{
              alignSelf: 'flex-end',
              backgroundColor: '#8D1812',
              color: 'white',
              width: 15,
              marginBottom: 10,
              marginTop: 10,
            }}
            large
            mode="contained"
            onPress={() => this.props.navigation.navigate('SendMsg')}>
            <Icon name="plus" size={10} />
          </Button>
        </View>
        <Text style={text}>Mes messages</Text>
        <View>
          {dataSource.length == 0 ? (
            <List.Item
              style={item}
              title="Vous n'avez reçu aucun message"
              description=""
            />
          ) : (
            <List.AccordionGroup>
              <FlatList
                data={this.state.dataSource}
                keyExtractor={(dataItem, index) => dataItem.id}
                renderItem={(dataItem) => (
                  <List.Accordion
                    id={dataItem.item.id}
                    style={item}
                    title={dataItem.item.emetteurName}
                    description={dataItem.item.subject}
                    left={(props) => (
                      <Icon
                        {...props}
                        name="envelope"
                        size={20}
                        color="#8D1812"
                        style={{marginTop: 10}}
                      />
                    )}>
                    <View style={{paddingTop: 25, paddingBottom: 25}}>
                      <View style={{flexDirection: 'row'}}>
                        <Icon
                          name="calendar"
                          size={15}
                          color="#8D1812"
                          style={{marginRight: 7}}
                        />
                        <Text>
                          {Moment(dataItem.item.dateMsg).format('DD/MM/YYYY')}
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row', marginTop: 8}}>
                        <Icon
                          name="user-tie"
                          size={15}
                          color="#8D1812"
                          style={{marginRight: 7}}
                        />
                        <Text>{dataItem.item.emetteurName}</Text>
                      </View>
                      <View style={{flexDirection: 'row', marginTop: 8}}>
                        <Icon
                          name="envelope-open-text"
                          size={15}
                          color="#8D1812"
                          style={{marginRight: 7}}
                        />
                        <Text style={{width: 300}}>
                          {dataItem.item.bodyMsg}
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row', marginTop: 15}}>
                        <TouchableOpacity
                          onPress={() =>
                            navigate('RepondreMsg', {
                              id: dataItem.item.emetteurId,
                            })
                          }>
                          <Text style={{color: '#8D1812', marginRight: 7}}>
                            Répondre
                          </Text>
                        </TouchableOpacity>
                        {/* <Text style={{color: '#8D1812', marginRight: 7}}>|</Text>
                  <TouchableOpacity onPress={() => this.Archived(dataItem.item.id)}>
                    <Text style={{color: '#8D1812', marginRight: 7}}>Archiver</Text>
                  </TouchableOpacity>
                  <Text style={{color: '#8D1812', marginRight: 7}}>|</Text>
                  <Text style={{color: '#8D1812'}}>Marquer comme non lue</Text> */}
                      </View>
                    </View>
                  </List.Accordion>
                )}
              />
            </List.AccordionGroup>
          )}
        </View>
      </View>
    );
  }
}

export default Messagerie;
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
