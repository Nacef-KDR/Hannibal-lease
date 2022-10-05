/*import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import DataService from '../services/data.services';
import LocalStorage from '../storage/LocalStorage';
import {Constants, Notifications, Permissions} from 'expo';
import {List} from 'react-native-paper';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';

class Notification extends Component {
  state = {dataSource: [], isLoading: true};

  componentDidMount = async () => {
    this.getList();
  };

  getList = async () => {
    let userData = await LocalStorage.getUserProfile();
    if (userData != null) {
      console.log(userData);
      let listNotif = await DataService.get('Notification/User/' + userData.id);
      this.setState({dataSource: JSON.parse(listNotif), isLoading: false});
    }
  };

  changeStatut(id) {
    DataService.put('Notification/' + id);
    this.getList();
  }

  Delete(id) {
    DataService.delete('Notification/' + id);
    this.getList();
  }

  render() {
    const {dataSource} = this.state;
    const {container, item, text, activator} = style;
    return this.state.isLoading ? (
      <View style={activator}>
        <ActivityIndicator size="large" color="#8D1812" />
      </View>
    ) : (
      <View style={container}>
        <Text
          style={{
            marginTop: 35,
            marginBottom: 15,
            marginStart: 10,
            fontWeight: 'bold',
          }}>
          Mes Notifications
        </Text>
        <View>
          {dataSource.length == 0 ? (
            <List.Item
              style={item}
              title="Aucune notification"
              description=""
            />
          ) : (
            <FlatList
              data={this.state.dataSource}
              renderItem={({item}) =>
                item.statutNotif == false ? (
                  <TouchableOpacity onPress={() => this.changeStatut(item.id)}>
                    <List.Item
                      style={{
                        borderBottomColor: 'lightgrey',
                        borderBottomWidth: 1,
                      }}
                      title={
                        <View style={{flexDirection: 'row'}}>
                          <Icon
                            name="bell"
                            size={20}
                            style={{
                              marginRight: 10,
                              marginBottom: 10,
                              fontWeight: 'bold',
                            }}
                          />
                          <Text
                            style={{
                              fontWeight: 'bold',
                            }}>
                            {Moment(item.dateNotif).format('DD/MM/YYYY')}
                          </Text>
                        </View>
                      }
                      description={item.bodyNotif}
                      right={(props) => (
                        <View {...props}>
                          <TouchableOpacity
                            onPress={() => this.Delete(item.id)}>
                            <Icon name="trash-alt" size={13} />
                          </TouchableOpacity>
                        </View>
                      )}
                      horizontal={false}
                    />
                  </TouchableOpacity>
                ) : (
                  <List.Item
                    style={{
                      borderBottomColor: 'lightgrey',
                      borderBottomWidth: 1,
                    }}
                    title={
                      <View style={{flexDirection: 'row'}}>
                        <Icon
                          name="bell"
                          size={20}
                          style={{marginRight: 10, marginBottom: 10}}
                        />
                        <Text>
                          {Moment(item.dateNotif).format('DD/MM/YYYY')}
                        </Text>
                      </View>
                    }
                    description={item.bodyNotif}
                    right={(props) => (
                      <View {...props}>
                        <TouchableOpacity onPress={() => this.Delete(item.id)}>
                          <Icon name="trash-alt" size={13} />
                        </TouchableOpacity>
                      </View>
                    )}
                    horizontal={false}
                  />
                )
              }
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

export default Notification;

//import PushNotification from 'react-native-push-notification';


const showNotification = (title, message) => {
  PushNotification.localNotification({
    title: title,
    message: message,
  });
};

const handleScheduleNotification = (title, message) => {
  PushNotification.localNotificationSchedule({
    title: title,
    message: message,
    date: new Date(Date.now() + 5 * 1000),
  });
};

const handleCancel = () => {
  PushNotification.cancelAllLocalNotifications();
};

export {showNotification, handleScheduleNotification, handleCancel};
*/