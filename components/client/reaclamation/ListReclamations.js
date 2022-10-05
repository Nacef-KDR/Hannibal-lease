import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  
} from 'react-native';

import {List, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Moment from 'moment';
import LocalStorage from '../../storage/LocalStorage';
import DataService from '../../services/data.services';


export default class ListReclamation extends Component {
  state = {
    dataSource: [],
    isLoading: true,
  };

  componentDidMount = async () => {
    this.getReclamation();
  };

  getReclamation = async () => {
    let userData = await LocalStorage.getUserProfile();
    if (userData != null) {
      let reclamation = await DataService.get(
        'Reclamation/User/Send/' + userData.id,
      );
      this.setState({dataSource: JSON.parse(reclamation), isLoading: false});
    }
  };

  Delete(id) {
    DataService.delete('Reclamation/' + id);
    this.getReclamation();
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
            onPress={() => this.props.navigation.navigate('AjoutReclamation')}>
            <Icon name="plus" size={10} />
          </Button>
        </View>
        <Text style={text}>Mes réclamations</Text>
        <View>
          {dataSource.length == 0 ? (
            <List.Item
              style={item}
              title="Vous n'avez reçu aucune réclamation"
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
                    title={dataItem.item.subjectRec}
                    //description={dataItem.item.subjectRec}
                    left={(props) => (
                      <Icon
                        {...props}
                        name="warning"
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
                          {Moment(dataItem.item.dateRec).format('DD/MM/YYYY')}
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row', marginTop: 8}}>
                        <Icon
                          name="file-text-o"
                          size={15}
                          color="#8D1812"
                          style={{marginRight: 7}}
                        />
                        <Text style={{width: 300}}>
                          {dataItem.item.bodyRec}
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row', marginTop: 15}}>
                        <TouchableOpacity
                          onPress={() =>
                            navigate('AjoutReclamation', {id: dataItem.item.id})
                          }>
                          <Text style={{color: '#8D1812', marginRight: 7}}>
                            Répondre
                          </Text>
                        </TouchableOpacity>
                        <Text style={{color: '#8D1812', marginRight: 7}}>
                          |
                        </Text>
                        <TouchableOpacity
                          onPress={() => this.Delete(dataItem.item.id)}>
                          <Text style={{color: '#8D1812', marginRight: 7}}>
                            Supprimer
                          </Text>
                        </TouchableOpacity>
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
