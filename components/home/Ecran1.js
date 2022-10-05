import React from 'react';
import {View, ImageBackground, Text,StyleSheet,} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
function HomeE1 ({navigation}) {
  

    return (
      <View>
        <ImageBackground
          source={require('../../assets/intro.jpg')}
          style={styles.image}>
          <View style={styles.box}>
            <Text style={styles.title}>Bienvenue sur Hannibal Lease</Text>
            <Text style={styles.paragraph}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa.
            </Text>
            <Button
              style={styles.button}
              onPress={() => navigation.navigate('HomeE2')}>
              <Icon name="home" size={20} color="#ffffff" />
            </Button>
            
          </View>
        </ImageBackground>
      </View>
    );
  }

  

  
export default HomeE1;
const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  box: {
    width: '70%',
    height: '17%',
    marginTop: 40,
    alignSelf: 'center',
    alignContent: 'center',
    borderRadius: 15,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4C5266',
  },
  paragraph: {
    marginTop: 20,
    color: '#4C5266',
  },
  button: {
    marginTop: 260,
    backgroundColor: '#8D1812',
    color: '#ffff',
    borderRadius: 900,
    height: 60,
    width: 60,
    alignSelf: 'center',
    paddingTop: 5
  },
});
