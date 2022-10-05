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

class AccueilSAV extends Component {
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
              <Text style={styles.title}>Gestion SAV</Text>
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
                <TouchableOpacity onPress={() => navigate('Facture')}>
                  <View style={styles.box}>
                    <Icon name="clipboard-list" size={25} style={styles.icon} />
                    <Text>Suivi</Text>
                    <Text>facturation</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('Rachat')}>
                  <View style={styles.box}>
                    <Icon name="user-check" size={25} style={styles.icon} />
                    <Text>Demande</Text>
                    <Text>de rachat</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                <TouchableOpacity onPress={() => navigate('CessionVR')}>
                  <View style={styles.box}>
                    <Icon name="flag-checkered" size={25} style={styles.icon} />
                    <Text>Demande</Text>
                    <Text>cession VR</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigate('ChangementAssurance')}>
                  <View style={styles.box}>
                    <Icon name="scribd" size={25} style={styles.icon} />
                    <Text>Changement</Text>
                    <Text>d'assurance</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('SortieTerritoire')}>
                  <View style={styles.box}>
                    <Icon name="suitcase-rolling" size={25} style={styles.icon} />
                    <Text>Demande</Text>
                    <Text>de sortie</Text>
                    <Text>du territoire</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                <TouchableOpacity onPress={() => navigate('Sinistre')}>
                  <View style={styles.box}>
                    <Icon name="car-crash" size={25} style={styles.icon} />
                    <Text>Sinistre</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('Contrats')}>
                  <View style={styles.box}>
                    <Icon name="file" size={25} style={styles.icon} />
                    <Text>Liste</Text>
                    <Text>des Contrats</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('Impaye')}>
                  <View style={styles.box}>
                    <Icon name="list-ul" size={25} style={styles.icon} />
                    <Text>Liste</Text>
                    <Text>des impayés</Text>
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

export default AccueilSAV;


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
