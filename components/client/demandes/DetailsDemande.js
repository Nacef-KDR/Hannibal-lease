import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ScrollView,StyleSheet} from 'react-native';
import {List, Button} from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome5';

import Moment from 'moment';

import LocalStorage from '../../storage/LocalStorage';
import DataService from '../../services/data.services';
import fileHelper from '../../helpers/FileHelper';

class DetailsDemande extends Component {
  state = {
    demande: [],
    id: 0,
    userData: null,
    listPhase: [],
    listMateriel: [],
    listDocs: [],
    listRDV: [],
  };

  componentDidMount = async () => {
    //Get demande Id
    this.setState({id: this.props.route.params.id});
    //Get demande
    let demandeData = await DataService.get(
      'demande/' + this.props.route.params.id,
    );
    this.setState({demande: JSON.parse(demandeData)});
    //Get USerData from storage
    await LocalStorage.getUserProfile().then((userProfileData) => {
      this.setState({userData: userProfileData});
    });

    //Get Phases demande
    await DataService.get(
      'DemandePhase/Demande/' + this.props.route.params.id,
    ).then((reqPhase) => {
      this.setState({listPhase: JSON.parse(reqPhase)});
    });

    //Get materiels demande
    await DataService.get(
      'DemandeMateriel/Demande/' + this.props.route.params.id,
    ).then((reqMat) => {
      this.setState({listMateriel: JSON.parse(reqMat)});
    });

    //Get document demande
    await DataService.get(
      'DemandeDocument/Demande/' + this.props.route.params.id,
    ).then((reqDocs) => {
      this.setState({listDocs: JSON.parse(reqDocs)});
    });

    //Get RDV demande
    await DataService.get(
      'DemandeRDV/Demande/' + this.props.route.params.id,
    ).then((reqRDV) => {
      this.setState({listRDV: JSON.parse(reqRDV)});
    });
  };

  addDemandeCession = async (ddeSAVId) => {
    let model = {
      DemandeId: this.state.id,
      Statut: 'Nouveau',
      TypeSAVdemandeId: ddeSAVId,
      DateDemande: new Date().toLocaleDateString(),
    };

    await DataService.post('SAVDemande', model).then(
      (reqDDeCess) => {
        alert('Demande envoyé!');
        if (reqDDeCess.errors != null) {
          Alert.alert('error', reqDDeCess.errors[0].message, [
            {
              text: 'Ok',
            },
          ]);
        }
      },
      (err) => {
        console.log('Problème ajout demande cession:' + err);
      },
    );
  };

  addDeclarationSinistre = async () => {
    let sinistre = {
      TypeSAVdemandeId: 3,
      DateDemande: new Date().toLocaleDateString(),
      DemandeId: this.state.id,
      Statut: 'Nouveau',
    };

    await DataService.post('SAVDemande', sinistre).then(
      (reqSinistre) => {
        if (reqSinistre.errors == null) {
          // this.props.navigation.navigate('Sinistre');
          alert('Sinistre envoyé!');
        } else {
          Alert.alert('error', reqSinistre.errors[0].message, [
            {
              text: 'Ok',
            },
          ]);
        }
      },
      (err) => {
        console.log('erreur envoi de sinistre:' + err);
      },
    );
  };

  renderPhases(listPhase, itemStyle) {
    if (listPhase != []) {
      return listPhase.map((phaseDde) => {
        return (
          <TouchableOpacity>
            <List.Item
              style={itemStyle}
              title={Moment(phaseDde.datePhase).format('DD/MM/YYYY')}
              description={phaseDde.document}
              right={(props) => (
                <View {...props}>
                  <Text style={{color: '#8D1812'}}>{phaseDde.etat}</Text>
                </View>
              )}
            />
          </TouchableOpacity>
        );
      });
    } else {
      return <TouchableOpacity></TouchableOpacity>;
    }
  }

  renderMateriels(listMateriel, itemStyle) {
    if (listMateriel != []) {
      return listMateriel.map((materiel) => {
        return (
          <View style={{borderBottomWidth: 2, borderBottomColor: '#0000'}}>
            <TouchableOpacity>
              <List.Item
                style={itemStyle}
                title={materiel.qte + ' ' + materiel.typeMateriel}
                description={materiel.marque}
                right={(props) => (
                  <View {...props}>
                    <Text style={{color: '#8D1812'}}>{materiel.etat}</Text>
                    <Text>{materiel.tva} P.TVA</Text>
                  </View>
                )}
              />
            </TouchableOpacity>
            {materiel.lienPhoto != null && materiel.lienPhoto.length != 0 ? (
              <TouchableOpacity
                onPress={() =>
                  fileHelper.download(
                    '/Demandes/' +
                      materiel.demandeId +
                      '/MaterielDocs/' +
                      materiel.lienPhoto,
                  )
                }>
                <List.Item
                  style={itemStyle}
                  title={'Photo ' + materiel.typeMateriel}
                  right={(props) => (
                    <Icon
                      {...props}
                      name="download"
                      size={15}
                      color="#8D1812"
                      onPress={() =>
                        fileHelper.download(
                          '/Demandes/' +
                            materiel.demandeId +
                            '/MaterielDocs/' +
                            materiel.lienPhoto,
                        )
                      }
                    />
                  )}
                />
              </TouchableOpacity>
            ) : (
              <View />
            )}
            {materiel.lienFactureProforma != null &&
            materiel.lienFactureProforma.length != 0 ? (
              <TouchableOpacity
                onPress={() =>
                  fileHelper.download(
                    '/Demandes/' +
                      materiel.demandeId +
                      '/MaterielDocs/' +
                      materiel.lienFactureProforma,
                  )
                }>
                <List.Item
                  style={itemStyle}
                  title={'Facture Proforma ' + materiel.typeMateriel}
                  right={(props) => (
                    <Icon
                      {...props}
                      name="download"
                      size={15}
                      color="#8D1812"
                      onPress={() =>
                        fileHelper.download(
                          '/Demandes/' +
                            materiel.demandeId +
                            '/MaterielDocs/' +
                            materiel.lienFactureProforma,
                        )
                      }
                    />
                  )}
                />
              </TouchableOpacity>
            ) : (
              <View />
            )}
          </View>
        );
      });
    } else {
      return <TouchableOpacity></TouchableOpacity>;
    }
  }

  renderDocs(listDocs, itemStyle) {
    if (listDocs != []) {
      return listDocs.map((doc) => {
        return (
          <TouchableOpacity
            onPress={() =>
              fileHelper.download(
                '/Demandes/' + doc.demandeId + '/Documents/' + doc.lienDocument,
              )
            }>
            <List.Item
              style={itemStyle}
              left={(props) => (
                <Text
                  style={{
                    color: '#0d0d0d',
                    textAlign: 'justify',
                    marginLeft: 20,
                  }}>
                  {doc.typeDocument}
                </Text>
              )}
              right={(props) => (
                <View
                  {...props}
                  style={{position: 'absolute', textAlign: 'left'}}>
                  <Icon
                    {...props}
                    name="download"
                    size={15}
                    color="#8D1812"
                    onPress={() =>
                      fileHelper.download(
                        '/Demandes/' +
                          doc.demandeId +
                          '/Documents/' +
                          doc.lienDocument,
                      )
                    }
                  />
                </View>
              )}
            />
          </TouchableOpacity>
        );
      });
    } else {
      return <TouchableOpacity></TouchableOpacity>;
    }
  }

  renderRDV(listRDV, itemStyle) {
    if (listRDV != []) {
      return listRDV.map((RDV) => {
        return (
          <TouchableOpacity>
            <List.Item
              style={itemStyle}
              title=""
              left={(props) => (
                <Text style={{color: '#8D1812'}}>{RDV.agence}</Text>
              )}
              right={(props) => (
                <View {...props} style={{marginBottom: 40}}>
                  <Text>
                    {Moment(RDV.dateRDV).format('DD/MM/YYYY')}{' '}
                    {Moment(RDV.heureRDV).format('HH:mm')}
                  </Text>
                  <Text>{RDV.typeContact}</Text>
                </View>
              )}
            />
          </TouchableOpacity>
        );
      });
    } else {
      return <TouchableOpacity></TouchableOpacity>;
    }
  }

  render() {
    const {
      containerAccordion,
      containerItems,
      item,
      item1,
      accordion,
      text,
      button,
    } = style;
    const demande = this.state.demande;
    const userData = this.state.userData;
    const listPhase = this.state.listPhase;
    const listMateriel = this.state.listMateriel;
    const listDocs = this.state.listDocs;
    const listRDV = this.state.listRDV;
    const {navigate} = this.props.navigation;

    return (
      <ScrollView>
        <View>
          <Button
            style={button}
            mode="contained"
            color="#fff"
            onPress={() => navigate('EditDemande', {id: this.state.id})}>
            <Icon name="edit" size={10} style={{color: '#ffff'}} />
          </Button>
          {demande.statut == 'Facture' ? (
            <List.AccordionGroup>
              <List.Accordion
                style={{backgroundColor: '#ffff', marginTop: 10}}
                id="1"
                title="Action"
                left={(props) => <Icon {...props} name="cogs" size={15} />}>
                <View
                  style={{
                    alignContent: 'flex-start',
                    backgroundColor: '#ffff',
                  }}>
                  <Button onPress={() => this.addDemandeCession(1)}>
                    Demande de rachat
                  </Button>
                  <Button onPress={() => this.addDemandeCession(2)}>
                    Demande de cession VR
                  </Button>
                  <Button onPress={() => this.addDemandeCession(4)}>
                    Changement type Assurance
                  </Button>
                  <Button onPress={() => this.addDemandeCession(5)}>
                    Demande Sortie du Territoire
                  </Button>
                  <Button onPress={() => this.addDeclarationSinistre()}>
                    Déclaration sinistre
                  </Button>
                </View>
              </List.Accordion>
            </List.AccordionGroup>
          ) : (
            <View />
          )}
          <View style={containerItems}>
            <Text style={text}>
              REFERENCE{' '}
              {demande.reference != null
                ? demande.reference
                : Moment(demande.dateDemande).format('YYYY') + '-' + demande.id}
            </Text>
            <List.Item
              style={item1}
              title={
                'Date demande : ' +
                Moment(demande.dateDemande).format('DD/MM/YYYY')
              }
            />
            <List.Item
              style={item1}
              title={'Demandeur : ' + demande.demandeur}
            />
            <List.Item style={item1} title={'Profile : ' + userData?.profile} />
            <List.Item
              style={item1}
              title={'Téléphone : ' + userData?.telFix}
            />
            <List.Item style={item1} title={'Mobile : ' + userData?.mobile} />
            {demande.statut == 'Rejete' ? (
              <List.Item style={item1} title={'Statut : Rejetée'} />
            ) : demande.statut == 'Valide' ? (
              <List.Item style={item1} title={'Statut : Validée'} />
            ) : demande.statut == 'ComplementInformation' ? (
              <List.Item
                style={item1}
                title={"Statut : Complément d'information"}
              />
            ) : (
              <List.Item style={item1} title={'Statut : ' + demande.statut} />
            )}
            {(userData?.role == 'Admin' || userData?.role == 'ChefAgence') &&
            demande.commercial != ' ' &&
            demande.commercial != null ? (
              <List.Item
                style={item1}
                title={'Commercial : ' + demande.commercial}
              />
            ) : (
              <View></View>
            )}
          </View>
          <View style={containerAccordion}>
            <Text style={text}>Détails</Text>
            <List.AccordionGroup>
              <List.Accordion
                id="1"
                style={accordion}
                title="Phases de demandes"
                left={(props) => <Icon {...props} name="asterisk" size={15} />}>
                {this.renderPhases(listPhase, item)}
              </List.Accordion>
              <List.Accordion
                id="2"
                style={accordion}
                title="Liste de matériels"
                left={(props) => <Icon {...props} name="car" size={20} />}>
                {this.renderMateriels(listMateriel, item)}
              </List.Accordion>
              <List.Accordion
                id="3"
                title="Liste des documents"
                left={(props) => <Icon {...props} name="file-alt" size={20} />}>
                {this.renderDocs(listDocs, item)}
              </List.Accordion>
              <List.Accordion
                id="4"
                style={accordion}
                title="Rendez-vous"
                left={(props) => (
                  <Icon {...props} name="calendar-alt" size={20} />
                )}>
                {this.renderRDV(listRDV, item)}
              </List.Accordion>
            </List.AccordionGroup>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default DetailsDemande;
const styles = StyleSheet.create({
    containerAccordion: {
      backgroundColor: '#fff',
      paddingTop: 20,
    },
    containerItems: {
      marginBottom: 30,
      marginTop: 20,
      paddingTop: 20,
      backgroundColor: '#fff',
    },
    item: {
      borderBottomColor: 'lightgrey',
      borderBottomWidth: 1,
    },
    item1: {
      padding: 5,
      borderBottomColor: 'lightgrey',
      borderBottomWidth: 1,
    },
    accordion: {
      backgroundColor: '#fff',
      borderBottomColor: 'lightgrey',
      borderBottomWidth: 1,
    },
    text: {
      fontSize: 18,
      fontWeight: 'bold',
      marginStart: 15,
      marginBottom: 18,
    },
    button: {
      marginEnd: 10,
      alignSelf: 'flex-end',
      backgroundColor: '#8D1812',
      color: '#fff',
    },
  });