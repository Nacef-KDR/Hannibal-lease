import React, {Component} from 'react';
import {View, Text ,StyleSheet} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import Moment from 'moment';
import DataService from '../../services/data.services';


class DetailsActifEnVente extends Component {
  state = {
    visible: true,
    dataActifVente: [],
  };

  componentDidMount = async () => {
    this.setState({id: this.props.route.params.id});
    let ActifVente = await DataService.get(
      'Publication/' + this.props.route.params.id,
    );
    this.setState({dataActifVente: JSON.parse(ActifVente)});
  };

  render() {
  
    const dataActifVente = this.state.dataActifVente;
    return (
      <View style={styles.container}>
        <Card>
          <Card.Cover
            source={{
              uri:
                'http://51.75.142.119:8384/Publications/' +
                dataActifVente.id +
                '/' +
                dataActifVente.lienPhoto,
            }}
          />
          <Card.Content>
            <Text style={styles.right}>
              {' '}
              {Moment(dataActifVente.datePublication).format('DD/MM/YYYY')}
            </Text>
            <Title>{dataActifVente.titre}</Title>
            <Paragraph>{dataActifVente.description}</Paragraph>
          </Card.Content>
        </Card>
      </View>
    );
  }
}

export default DetailsActifEnVente;
const styles = StyleSheet.create({
    container: {
        marginTop: 20
    },
    right: {
      textAlign: 'right',
      marginTop: 20
    },
  });
  