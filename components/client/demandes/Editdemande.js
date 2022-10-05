import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ScrollView,StyleSheet, Linking} from 'react-native';
import {List, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Moment from 'moment';
//import fileHelper from '../../../../helpers/fileHelper';
import DocumentPicker from 'react-native-document-picker';
import DataService from '../../services/data.services';
import LocalStorage from '../../storage/LocalStorage';
import fileHelper from '../../helpers/FileHelper';

class EditDemande extends Component {
  state = {
    demande: [],
    id: 0,
    idDemande: 0,
    userData: null,
    listPhase: [],
    listMateriel: [],
    listDocs: [],
    listDocsNnTel: [],
    listRDV: [],
    profile: '',
    nomImgMat: '',
    nomImgProformaMat: '',
  };

  componentDidMount = async () => {
    //Get demande Id
    this.setState({id: this.props.route.params.id});
    this.setState({idDemande: this.props.route.params.id});
    //Get demande
    let demandeData = await DataService.get(
      'demande/' + this.props.route.params.id,
    );
    this.setState({demande: JSON.parse(demandeData)});
    //Get USerData from storage
    await LocalStorage.getUserProfile().then((userProfileData) => {
      this.setState({userData: userProfileData});
      this.setState({profile: this.state.userData.profile});
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
      console.log('listDocs', this.state.listDocs);
    });

    //Get RDV demande
    await DataService.get(
      'DemandeRDV/Demande/' + this.props.route.params.id,
    ).then((reqRDV) => {
      this.setState({listRDV: JSON.parse(reqRDV)});
    });

    await DataService.get(
      'References/DemandeDocumentModel/' +
        '/' +
        this.state.profile +
        '/' +
        false,
    ).then((req) => {
      this.setState({listDocsNnTel: JSON.parse(req)});
      console.log('listDocsNnTel', this.state.listDocsNnTel);
    });
  };

  getlistDocs = async () => {
    //Get document demande
    await DataService.get(
      'DemandeDocument/Demande/' + this.state.idDemande,
    ).then((reqDocs) => {
      this.setState({listDocs: JSON.parse(reqDocs)});
      console.log('listDocs', this.state.listDocs);
    });
  };

  uploadImageMateriel = async () => {
    let file = null;
    const res = await DocumentPicker.pick({
      type: [
        DocumentPicker.types.pdf,
        DocumentPicker.types.images,
        DocumentPicker.types.plainText,
      ],
      // DocumentPicker.types.allFiles
    });
    file = res;

    const idDemande = this.state.idDemande;
    this.state.nomFichierImageMateriel =
      'photo_materiel_demande_1_' +
      idDemande +
      '.' +
      file.name.split('.').pop();
    await DataService.postImage(
      'Demande/' + idDemande + '/MaterielDocs/photo/1',
      res.name,
      res,
    ).then((req) => {
      console.log('upload photo:' + req);
    });
    this.setState({nomImgMat: res.name});
  };

  uploadFactureMateriel = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      const idDemande = this.state.idDemande;
      this.state.nomFichierProformaMateriel =
        'facture_materiel_demande_1_' +
        idDemande +
        '.' +
        res.name.split('.').pop();

      let res1 = await DataService.postImage(
        'Demande/' + idDemande + '/MaterielDocs/facture/1',
        res.name,
        res,
      );
      this.setState({nomImgProformaMat: res.name});

      console.log('res:' + res1);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  upload = async (typeDocumentId) => {
    let file = null;
    const res = await DocumentPicker.pick({
      type: [
        DocumentPicker.types.pdf,
        DocumentPicker.types.images,
        DocumentPicker.types.plainText,
      ],
      // DocumentPicker.types.allFiles
    });
    file = res;
    const idDemande = this.state.idDemande;

    let demandeDocModel = {
      demandeId: idDemande,
      typeDocumentId: typeDocumentId,
      lienDocument:
        'docs_' +
        idDemande +
        '_' +
        typeDocumentId +
        '.' +
        file.name.split('.').pop(),
    };

    await DataService.post('DemandeDocument', demandeDocModel).then((res1) => {
      let urlUpload =
        'DemandeDocument/Demande/' +
        idDemande +
        '/UploadDemandeDoc/' +
        typeDocumentId;
      DataService.postImage(urlUpload, res.name, res).then((res2) => {
        console.log(res2);
      });
    });
    this.getlistDocs();
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
          <View>
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
            {materiel.lienPhoto.length != 0 ? (
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
              <View>
                {this.state.nomImgMat != '' ? (
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 14}}>{this.state.nomImgMat}</Text>
                    <Icon
                      name="check-square"
                      size={18}
                      style={{color: '#22780F', marginLeft: 12}}
                    />
                  </View>
                ) : (
                  <View />
                )}
                <Button
                  style={{
                    marginTop: 15,
                    borderRadius: 5,
                    color: 'white',
                  }}
                  onPress={() => {
                    this.uploadImageMateriel();
                  }}>
                  Télécharger photo du materiel
                </Button>
              </View>
            )}
            {materiel.lienFactureProforma.length != 0 ? (
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
              <View>
                {this.state.nomImgProformaMat != '' ? (
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 14}}>
                      {this.state.nomImgProformaMat}
                    </Text>
                    <Icon
                      name="check-square"
                      size={18}
                      style={{color: '#22780F', marginLeft: 12}}
                    />
                  </View>
                ) : (
                  <View />
                )}
                <Button
                  style={{
                    marginTop: 15,
                    borderRadius: 5,
                    color: 'white',
                  }}
                  onPress={() => {
                    this.uploadFactureMateriel();
                  }}>
                  Télécharger la facture proforma
                </Button>
              </View>
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

  renderDocsnn(listDocsNnTel, itemStyle) {
    if (listDocsNnTel != []) {
      return listDocsNnTel.map((docnn) => {
        return (
          <View>
            <TouchableOpacity>
              <List.Item
                style={itemStyle}
                left={(props) => (
                  <View style={{flexDirection: 'row'}}>
                    {this.state.listDocs.map((dc) =>
                      dc.typeDocument == docnn.typeDocument.name ? (
                        <Button
                          style={{
                            backgroundColor: '#8D1812',
                          }}
                          mode="contained"
                          color="#fff">
                          <Icon
                            name="edit"
                            size={10}
                            style={{color: '#ffff'}}
                          />
                        </Button>
                      ) : (
                        <View />
                      ),
                    )}
                    <Text
                      style={{
                        color: '#0d0d0d',
                        textAlign: 'justify',
                        marginLeft: 20,
                      }}>
                      {docnn.typeDocument.name}
                    </Text>
                  </View>
                )}
                right={(props) => (
                  <View
                    {...props}
                    style={{position: 'absolute', textAlign: 'left'}}>
                    <Icon {...props} name="upload" size={15} color="#8D1812" />
                  </View>
                )}
                horizontal={false}
                onPress={() => this.upload(docnn.typeDocumentId)}
              />
            </TouchableOpacity>
          </View>
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
                    {Moment(RDV.dateRDV).format('DD/MM/YYYY HH:mm')}{' '}
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
    const listDocsNnTel = this.state.listDocsNnTel;
    const listRDV = this.state.listRDV;
    const {navigate} = this.props.navigation;

    return (
      <ScrollView>
        <View>
          <Button
            style={styles.button}
            mode="contained"
            color="#fff"
            onPress={() => navigate('ListDemandes')}>
            <Icon name="check" size={10} style={{color: '#ffff'}} />
          </Button>
          <View style={styles.containerItems}>
            <Text style={styles.text}>
              REFERENCE{' '}
              {demande.reference != null
                ? demande.reference
                : Moment(demande.dateDemande).format('YYYY') + '-' + demande.id}
            </Text>
            <List.Item
              style={styles.item1}
              title={
                'Date demande : ' +
                Moment(demande.dateDemande).format('DD/MM/YYYY')
              }
            />
            <List.Item
              style={styles.item1}
              title={'Demandeur : ' + demande.demandeur}
            />
            <List.Item style={styles.item1} title={'Profile : ' + userData?.profile} />
            <List.Item
              style={styles.item1}
              title={'Téléphone : ' + userData?.telFix}
            />
            <List.Item style={styles.item1} title={'Mobile : ' + userData?.mobile} />
            <List.Item style={styles.item1} title={'Statut : ' + demande.statut} />
            {userData?.profile == 'Admin' ||
            userData?.profile == 'ChefAgence' ? (
              <List.Item
                style={styles.item1}
                title={'Commercial : ' + demande.commercial}
              />
            ) : (
              <View></View>
            )}
            {userData?.profile == 'Admin' ||
            userData?.profile == 'ChefAgence' ? (
              <List.Item
                style={styles.item1}
                title={'Commercial : ' + demande.agence}
              />
            ) : (
              <View></View>
            )}
          </View>
          <View style={styles.containerAccordion}>
            <Text style={styles.text}>Détails</Text>
            <List.AccordionGroup>
              <List.Accordion
                id="1"
                style={styles.accordion}
                title="Phases de demandes"
                left={(props) => <Icon {...props} name="asterisk" size={15} />}>
                {this.renderPhases(listPhase, item)}
              </List.Accordion>
              <List.Accordion
                id="2"
                style={styles.accordion}
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
                title="Documents à compléter"
                left={(props) => <Icon {...props} name="file-alt" size={20} />}>
                {this.renderDocsnn(listDocsNnTel, item)}
              </List.Accordion>
              <List.Accordion
                id="5"
                style={styles.accordion}
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

export default EditDemande;


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
    fontSize: 10
  }
});
