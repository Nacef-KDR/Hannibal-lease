import React, {Component} from 'react';
import {View, TouchableOpacity,StyleSheet, FlatList} from 'react-native';
import {Image} from 'react-native';
//import {createStackNavigator} from 'react-navigation-stack';
//import { StackNavigator } from 'react-navigation';
import {
  Button,
  Card,
  Title,
  Paragraph,
  Banner,
  ActivityIndicator,
} from 'react-native-paper';
import DataService from '../../services/data.services';
//import { useNavigation } from "@react-navigation/native";

class ActifEnVente extends Component {
  
    state = {
    visible: true,
    dataSource: [],
    isLoading: true,
  };


  componentDidMount = async () => {
    let ActifVente = await DataService.get('Publication/ForPassenger');
    this.setState({dataSource: JSON.parse(ActifVente), isLoading: false});
  };

  renderSeparator = () => {
    return (
      <View
        style={{height: 1, width: '100%', backgroundColor: 'lightgrey'}}></View>
    );
  };

  render() {
    
    //const {navigate} = this.props.navigation;
    
    return this.state.isLoading ? (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#8D1812" />
      </View>
    ) : (
      <View>
        <Banner
          visible={this.state.visible}
          actions={[
            {
              label: 'Ok',
              color: '#4C5266',
              onPress: () => this.setState({visible: false}),
            },
          ]}
          icon={({size}) => (
            <Image
              source={require('../../../assets/logo.png')}
              style={{
                width: size,
                height: size,
              }}
            />
          )}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. corrupti id
          eaque hic!
        </Banner>
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={(dataItem) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('DetailsActifEnVente', {id: dataItem.item.id})
              }>
              <Card>
                <Card.Content>
                  <Title>{dataItem.item.titre}</Title>
                  <Paragraph>{dataItem.item.description}</Paragraph>
                </Card.Content>
                <Card.Cover
                  source={{
                    uri:
                      'http://51.75.142.119:8384/Publications/' +
                      dataItem.item.id +
                      '/' +
                      dataItem.item.lienPhoto,
                  }}
                />
                <Card.Actions>
                  <Button
                    color="#8D1812"
                    onPress={() =>
                      this.props.navigation.navigate('DetailsActifEnVente', {id: dataItem.item.id})
                    }>
                    Consulter
                  </Button>
                </Card.Actions>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>
    )};
  }


export default ActifEnVente;
const styles= StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
  });