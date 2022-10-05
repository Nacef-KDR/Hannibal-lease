import React from 'react';
import {View, TouchableOpacity, ImageBackground, Text,StyleSheet,} from 'react-native';
//import { FontAwesome5 } from '@expo/vector-icons'; 
//import FontAwesome5 from 'react-native-vector-FontAwesome5s/FontAwesome';
import {FontAwesome5} from '@expo/vector-icons';
function HomeE2 ({navigation}) {
 
    
    
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/background3.jpg')}
          style={styles.image}>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => navigation.navigate('Simulateur')}>
              <View style={styles.box} backgroundColor="#8D1812">
                <FontAwesome5 name="calculator" size={30} color="#fff" style={styles.IonFontAwesome5s} />
                <Text style={styles.textBox1}>Simulez</Text>
                <Text style={styles.textBox1}>votre crédit</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ActifEnVente')}>
              <View style={styles.box} backgroundColor="#e7e7e7">
                <FontAwesome5 name="car-alt" size={35} style={styles.FontAwesome5} />
                <Text style={styles.textBox3}>Galerie</Text>
                <Text style={styles.textBox3}>actifs en vente</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => navigation.navigate('Sign in')}>
              <View style={styles.box} backgroundColor="#fff">
                <FontAwesome5 name="user-alt" size={35} style={styles.FontAwesome5} />
                <Text style={styles.textBox2}>Espace client</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('DemandeCredit')}>
              <View style={styles.box} backgroundColor="#4C5266">
                <FontAwesome5
                  name="hands-helping"
                  size={35}
                  color="#fff"
                  style={styles.FontAwesome5}
                />
                <Text style={styles.textBox1}>Demande</Text>
                <Text style={styles.textBox1}>de financement</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Apropos')}>
            <View style={styles.hexagon}>
              <View style={styles.hexagonInner}>
                <FontAwesome5 name="info-circle" size={25} color="#fff" style={FontAwesome5} />
              </View>
              <View style={styles.hexagonBefore} />
              <View style={styles.hexagonAfter} />
            </View>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }


export default HomeE2;


const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  image: {
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  box: {
    width: 170,
    height: 130,
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    padding: 10,
    marginRight: '3%',
  },
  textBox1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
  },
  textBox2: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 40,
  },
  textBox3: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  FontAwesome5: {
    alignSelf: 'center',
    marginBottom: 5,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: '3%',
    alignSelf: 'center',
  },
  hexagon: {
    width: 100,
    height: 55,
    marginLeft: '37.5%',
    marginTop: '2%',
  },
  hexagonInner: {
    width: 100,
    height: 55,
    backgroundColor: '#8D1812', 
  },
  hexagonAfter: {
    position: 'absolute',
    bottom: -25,
    left: 0,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 50,
    borderLeftColor: 'transparent',
    borderRightWidth: 50,
    borderRightColor: 'transparent',
    borderTopWidth: 25,
    borderTopColor: '#8D1812',
  },
  hexagonBefore: {
    position: 'absolute',
    top: -25,
    left: 0,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 50,
    borderLeftColor: 'transparent',
    borderRightWidth: 50,
    borderRightColor: 'transparent',
    borderBottomWidth: 25,
    borderBottomColor: '#8D1812',
  },
});
