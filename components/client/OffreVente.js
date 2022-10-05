import React, {Component} from 'react';
import {
  View,
  Alert,
  TouchableOpacity,
  FlatList,
  CheckBox,
  Text,
  StyleSheet,
} from 'react-native';

import {
  Button,
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
  List,
  Chip,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome5';
import DataService from '../services/data.services';
import LocalStorage from '../storage/LocalStorage';

class OffreVente extends Component {
  state = {
    visible: true,
    dataSource: [],
    TypesMat: [],
    TypesPub: [],
    isLoading: true,
    isChecked: false,
  };

  onClicCheckBox = (checkbox) => this.setState({isChecked: checkbox});

  componentDidMount = async () => {
    let userData = await LocalStorage.getUserProfile();
    if (userData != null) {
      let OffreVente = await DataService.get('Publication/ForPassenger');
      this.setState({dataSource: JSON.parse(OffreVente), isLoading: false});
    }
    let TypeMateriel = await DataService.get('References/TypeMateriel');
    this.setState({TypesMat: JSON.parse(TypeMateriel)});
  };

  renderSeparator = () => {
    return (
      <View
        style={{height: 1, width: '100%', backgroundColor: 'lightgrey'}}></View>
    );
  };

  randomColor = () => {
    let col = color[Math.floor(Math.random() * color.length)];
    return col;
  };

  render() {
    
    const {navigate} = this.props.navigation;
    const {isChecked} = this.state;
    return this.state.isLoading ? (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#8D1812" />
      </View>
    ) : (
      <View>
        <List.AccordionGroup>
          <List.Accordion
            id="1"
            style={styles.accordion}
            title="Type matériel"
            left={(props) => <Icon {...props} name="tag" size={15} />}>
            <FlatList
              data={this.state.TypesMat}
              renderItem={(dataItem) => (
                <View style={styles.checkboxContainer}>
                  <CheckBox
                    tintColors={{true: '#3c4454', false: 'black'}}
                    value={isChecked}
                    onValueChange={isChecked}
                  />
                  <Text style={styles.label}>{dataItem.item.name}</Text>
                </View>
              )}
              keyExtractor={(dataItem, index) => dataItem.id}
            />
          </List.Accordion>
        </List.AccordionGroup>
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={(dataItem) => (
            <TouchableOpacity
              onPress={() =>
                navigate('DetailsActifEnVente', {id: dataItem.item.id})
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
                      navigate('DetailsActifEnVente', {id: dataItem.item.id})
                    }>
                    Consulter
                  </Button>
                </Card.Actions>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

export default OffreVente;

const styles= StyleSheet.create({
    container: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    checkboxContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    label: {
      margin: 8,
    },
    titre: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10
    },
    accordion: {
      backgroundColor: '#fff',
      borderBottomColor: 'lightgrey',
      borderBottomWidth: 1,
    },
  });
  