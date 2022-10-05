import React, {Component} from 'react';
import {
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

class AccueilDemande extends Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.head}>
            <ImageBackground
              source={require('../../../assets/background7.png')}
              style={styles.image}>
              <Icon name="cogs" size={35} color="#fff" style={styles.icon} />
              <Text style={styles.title}>Gestion de demandes</Text>
            </ImageBackground>
          </View>
          <View style={styles.containercontent}>
            <View style={styles.content}>
              <View style={styles.row}>
                <TouchableOpacity onPress={() => navigate('Accueil')}>
                  <View style={styles.box}>
                    <Icon
                      name="home"
                      size={25}
                      style={{
                        alignSelf: 'center',
                        marginBottom: 10,
                        color: '#8D1812',
                      }}
                    />
                    <Text style={{color: '#8D1812'}}>Accueil</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('ListDemandes')}>
                  <View style={styles.box}>
                    <Icon name="list-ul" size={25} style={styles.icon} />
                    <Text>Liste</Text>
                    <Text>des demandes</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('AjoutDemande')}>
                  <View style={styles.box}>
                    <Icon name="plus-square" size={25} style={styles.icon} />
                    <Text>Ajouter</Text>
                    <Text>une demande</Text>
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

export default AccueilDemande;


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
