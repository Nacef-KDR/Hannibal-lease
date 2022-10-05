import React, {Component} from 'react';
import {
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Badge} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import DataService from '../services/data.services';
import LocalStorage from '../storage/LocalStorage';


class Accueil extends Component {
  state = {dataSource: [], nbrNotif: 0, nbrMsg: 0};

  componentDidMount = async () => {
    this.getListNotif();
  };

  getListNotif = async () => {
    let userData = await LocalStorage.getUserProfile();
    if (userData != null) {
      console.log(userData);
      let listNotif = await DataService.get('Notification/User/' + userData.id);
      this.setState({dataSource: JSON.parse(listNotif)});

      let messages = await DataService.get('Message/User/' + userData.id);
      this.setState({
        nbrMsg: JSON.parse(messages).filter(
          (x) => x.statutMsg == false && x.isArchived == false,
        ).length,
      });

      this.setState({
        nbrNotif: JSON.parse(listNotif).filter((x) => x.statutNotif == false)
          .length,
      });
    }
  };

  render() {
  
    const {navigate} = this.props.navigation;
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.head}>
            <ImageBackground
              source={require('../../assets/background7.png')}
              style={styles.image}>
              <Icon name="home" size={35} color="#fff" style={styles.icon} />
              <Text style={styles.title}>Accueil</Text>
            </ImageBackground>
          </View>
          <View style={styles.containercontent}>
            <View style={styles.content}>
              <View style={styles.row}>
                <View style={styles.box}>
                  <TouchableOpacity
                    onPress={() => navigate('Dashboard client')}>
                    <Icon name="pie-chart" size={25} style={styles.icon} />
                    <Text>Tableau</Text>
                    <Text>de bord</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.box}>
                  <TouchableOpacity onPress={() => navigate('Profil')}>
                    <Icon name="user" size={25} style={styles.icon} />
                    <Text>Profil</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.box}>
                  <TouchableOpacity onPress={() => navigate('AccueilDemande')}>
                    <Icon name="list-ul" size={25} style={styles.icon} />
                    <Text>Demandes</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.box}>
                  <TouchableOpacity onPress={() => navigate('AccueilSAV')}>
                    <Icon name="cogs" size={25} style={styles.icon} />
                    <Text>SAV</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => navigate('OffreVente')}>
                  <View style={styles.box}>
                    <Icon name="opencart" size={25} style={styles.icon} />
                    <Text>Offre de vente</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('Messagerie')}>
                  <View style={styles.box}>
                    <Icon name="envelope" size={25} style={styles.icon} />
                    <Badge
                      style={{
                        position: 'absolute',
                        right: 28,
                        top: -7,
                        backgroundColor: '#8D1812',
                      }}>
                      {this.state.nbrMsg}
                    </Badge>
                    <Text>Messagerie</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                <TouchableOpacity onPress={() => navigate('ListReclamation')}>
                  <View style={styles.box}>
                    <Icon name="warning" size={25} style={styles.icon} />
                    <Text>Réclamation</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('Notification')}>
                  <View style={styles.box}>
                    <Icon name="bell" size={25} style={styles.icon} />
                    <Badge
                      style={{
                        position: 'absolute',
                        right: 28,
                        top: -7,
                        backgroundColor: '#8D1812',
                      }}>
                      {this.state.nbrNotif}
                    </Badge>
                    <Text>Notifications</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('Sign in')}>
                  <View style={styles.box}>
                    <Icon
                      name="power-off"
                      size={25}
                      style={{
                        alignSelf: 'center',
                        marginBottom: 10,
                        color: '#8D1812',
                      }}
                    />
                    <Text style={{color: '#8D1812'}}>Deconnexion</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Accueil;


const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    backgroundColor: '#fff',
    height: '100%',
  },
  head: {
    height: 220,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    alignSelf: 'center',
  },
  containercontent: {
    width: '100%',
    height: '100%',
  },
  image: {
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  content: {
    height: 300,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  row: {
    flex: 1,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    width: 100,
    alignItems: 'center',
    textAlign: 'center',
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 10,
  },
});
