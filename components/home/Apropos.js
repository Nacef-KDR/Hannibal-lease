import React from 'react';
import {View, Text, ImageBackground,StyleSheet,} from 'react-native';
//import FontAwesome5 from 'react-native-vector-FontAwesome5s/FontAwesome5';
import {FontAwesome5} from '@expo/vector-icons';
export default function Apropos () {
   
   

  
    

    return (
      <View>
        <ImageBackground
          source={require('../../assets/intro.jpg')}
          style={styles.image}>
          <View></View>
        </ImageBackground>
        <View style={styles.flex}>
          <View style={styles.circle}>
            <FontAwesome5 name="envelope" size={10} color="#ffffff" />
          </View>
          <Text style={{marginTop: 10}}>
            {' '}
            Email : contact@hannibalease.com.tn
          </Text>
        </View>
        <View style={styles.flex}>
          <View style={styles.circle}>
            <FontAwesome5 name="phone" size={10} color="#ffffff" />
          </View>
          <Text style={{marginTop: 10}}> Appelez nous : (+216) 71 139 400</Text>
        </View>
        <View style={styles.flex}>
          <View style={styles.circle}>
            <FontAwesome5 name="map-marker-alt" size={10} color="#ffffff" />
          </View>
          <Text style={{marginTop: 10}}>
            {' '}
            Adresse : Rue du Lac Leman - Les Berges du Lac 1053 Tunis - Tunisie
          </Text>
        </View>
      </View>
    );
  }

const styles= StyleSheet.create({
    image: {
      resizeMode: 'cover',
      width: '100%',
      height: 300,
    },
    circle: {
      backgroundColor: '#8D1812',
      color: '#ffff',
      borderRadius: 900,
      height: 30,
      width: 30,
      paddingTop: 10,
      alignContent: 'center',
      alignItems: 'center',
    },
    flex: {
      flexDirection: 'row',
      marginTop: 15,
      marginStart: 10,
      marginEnd: 20
    }
  });
  