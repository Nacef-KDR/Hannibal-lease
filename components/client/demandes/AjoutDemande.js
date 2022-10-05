import React, {useState, useEffect, useCallback, Fragment} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  
} from 'react-native';
import { useNavigation } from "@react-navigation/native";

import Appearences from '../../config/Appearences';
import {Picker} from '@react-native-picker/picker';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import {Button, Chip, TextInput, List} from 'react-native-paper';
//import {ButtonGroup, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';


import DocumentPicker from 'react-native-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useForm, Controller} from 'react-hook-form';
import DataService from '../../services/data.services';
import LocalStorage from '../../storage/LocalStorage';

const AjoutDemande = (props) => {
  const {control, handleSubmit, errors} = useForm();
  const [show, setShow] = useState(false);
  const [showHR, setShowHR] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [successAddDde, setSuccessAddDde] = useState(false);
  const buttonsRDV = ['Contact direct', 'Appel téléphonique'];
  const [selectedIndexRDV, setSelectedIndexRDV] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [agenceId, setAgenceId] = useState(1);
  const [idDemande, setIdDemande] = useState(0);
  const [typeMaterielId, setTypeMaterielId] = useState(0);
  const [fournisseurId, setFournisseurId] = useState(0);
  const [qte, setQte] = useState(0);
  const [annee, setAnnee] = useState(0);
  const [currentUserId, setCurrentUserId] = useState(0);
  const [nomFichierProformaMateriel, setNomFichierProformaMateriel] = useState(
    '',
  );
  const [nomFichierImageMateriel, setNomFichierImageMateriel] = useState('');
  const [nomImgMat, setNomImgMat] = useState('');
  const [nomImgProformaMat, setNomImgProformaMat] = useState('');
  const [marque, setMarque] = useState('');
  const [PU, setPU] = useState('');
  const [TVA, setTVA] = useState('');
  const [etat, setEtat] = useState('');
  const [mode, setMode] = useState('date');
  const [modeHR, setModeHR] = useState('date');
  const [profile, setProfile] = useState('');
  const [dataSourceDocs, setDataSourceDocs] = useState([]);
  const [dataSourceAgences, setDataSourceAgences] = useState([]);
  const [listTypeMateriel, setListTypeMateriel] = useState([]);
  const [listDocs, setListDocs] = useState([]);
  const [dateRDV, setDateRDV] = useState(new Date());
  const [heureRDV, setHeureRDV] = useState(new Date());

  useEffect(() => {
    const getProfile = async () => {
      let userData = await LocalStorage.getUserProfile();
      setProfile(userData.profile);
      console.log('userData', userData.profile);
      console.log('profile', profile);
    };
    const getListTypeMateriel = async () => {
      const listTMat = await DataService.get('References/TypeMateriel');
      setListTypeMateriel(JSON.parse(listTMat));
    };
    getProfile();
    getListTypeMateriel();
    addDemande();
  }, []);

  const getlistDocs = async () => {
    //Get document demande
    await DataService.get('DemandeDocument/Demande/' + idDemande).then(
      (reqDocs) => {
        setListDocs(JSON.parse(reqDocs));
        console.log('listDocs', listDocs);
      },
    );
  };

  const SetDateRDV = (event, dateRDV) => {
    dateRDV == null ? new Date() : (dateRDV = dateRDV || state);
    let srdv = Platform.OS === 'ios' ? true : false;
    setShow(srdv);
    let drdv = dateRDV == null ? new Date() : dateRDV;
    setDateRDV(drdv);
  };
  const SetHeureRDV = (event, heureRDV) => {
    heureRDV == null ? new Date() : (heureRDV = heureRDV || state);
    let srhdv = Platform.OS === 'ios' ? true : false;
    setShowHR(srhdv);
    let hrdv = heureRDV == null ? new Date() : heureRDV;
    setHeureRDV(hrdv);
  };
  const ShowHR = (modeHRt) => {
    setShowHR(true);
    setModeHR(modeHRt);
  };
  const Show = (mode) => {
    setShow(true);
    setMode(mode);
  };
  const datepicker = () => {
    Show('date');
  };
  const timepicker = () => {
    ShowHR('time');
  };

  const updateIndexTypeRDV = (selectedIndexRDV) => {
    setSelectedIndexRDV(selectedIndexRDV);
  };

  const addDemande = async () => {
    let currentUser = await LocalStorage.getUserProfile();
    setCurrentUserId(currentUser.id);
    let ddeM = {
      userId: currentUser.id,
      statut: 'Nouveau',
    };
    await DataService.post('Demande', ddeM).then((req) => {
      if (req.errors == null) {
        setIdDemande(req.id);
      } else {
        Alert.alert('error', req.errors[0].message, [
          {
            text: 'Ok',
          },
        ]);
      }
    });
  };

  const addMateriel = async () => {
    let ddeModel = {
      userId: currentUserId,
      statut: 'Nouveau',
      typeMaterielId: typeMaterielId,
      fournisseurId: fournisseurId,
      annee: annee,
      etat: etat,
      marque: marque,
      PU: PU,
      TVA: TVA,
      qte: qte,
      demandeId: idDemande,
      lienFactureProforma: nomFichierProformaMateriel,
      lienPhoto: nomFichierImageMateriel,
    };
    let listModel = [];
    setShowErrors(true);
    if (
      typeMaterielId != 0
      //&&
      //(TVA < PU) &&
      //(TVA > 0) &&
      //(qte != 0)
    ) {
      listModel.push(ddeModel);
      console.log('listMateriel:' + JSON.stringify(listModel));
      if (listModel != []) {
        await DataService.post('DemandeMateriel/AddList', listModel).then(
          (reqMat) => {
            //console.log("reqMat:"+JSON.stringify(reqMat));
            if (reqMat.errors != null) {
              Alert.alert('error', reqMat.errors[0].message, [
                {
                  text: 'Ok',
                },
              ]);
            }
          },
          (err) => {
            console.log('erreur ajout materiel:' + err);
          },
        );
        getListDocument();
        setActiveStep(activeStep + 1);
      } else {
        console.log('erreur addMatr');
        setActiveStep(activeStep);
      }
    }
  };

  const getListDocument = async () => {
    console.log('getListDocument profile', profile);
    const listDoc = await DataService.get(
      'References/DemandeDocumentModel/' + profile + '/' + false,
    );
    setDataSourceDocs(JSON.parse(listDoc));
    console.log('listDoc', JSON.parse(listDoc));
    console.log('listdocument', JSON.parse(dataSourceDocs));
  };

  const addRDV = async (dateRDV, agenceId, selectedIndexRDV) => {
    console.log('iddemande:' + idDemande);

    let model = {
      agenceId: agenceId,
      statut: 'Nouveau',
      DateRDV: new Date(dateRDV),
      HeureRDV: new Date(heureRDV),
      demandeId: idDemande,
      typeContact: selectedIndexRDV == 0 ? 'direct' : 'appel',
    };

    console.log('rdvmodel:' + JSON.stringify(model));
    await DataService.post('DemandeRDV', model).then((req) => {
      if (req.errors == null) {
        console.log('dsqdlkqsjk' + req);
      } else {
        Alert.alert('error', req.errors[0].message, [
          {
            text: 'Ok',
          },
        ]);
      }
    });
  };

  const renderDocs = (listDoccs, itemStyle) => {
    if (listDoccs != []) {
      return listDoccs.map((doc, i) => {
        return (
          <TouchableOpacity>
            <List.Item
              keyExtractor={i}
              key={doc.id}
              style={itemStyle}
              left={(props) => (
                <Text style={{color: '#0d0d0d', textAlign: 'justify'}}>
                  {doc.typeDocument.name}
                </Text>
              )}
              right={(props) => (
                <View {...props}>
                  <Icon {...props} name="upload" size={15} color="#8D1812" />
                </View>
              )}
              horizontal={false}
              onPress={() => upload(doc.typeDocumentId)}
            />
          </TouchableOpacity>
        );
      });
    } else {
      return <TouchableOpacity />;
    }
  };

  const upload = async (typeDocumentId) => {
    let file = null;
    const res = await DocumentPicker.pick({
      type: [
        DocumentPicker.types.pdf,
        DocumentPicker.types.images,
        DocumentPicker.types.plainText,
      ],
    });
    file = res;
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
        console.log('res 2s2  kljerk ' + res2);
      });
    });
    getlistDocs();
  };

  const uploadImageMateriel = async () => {
    let file = null;
    const res = await DocumentPicker.pick({
      type: [
        DocumentPicker.types.pdf,
        DocumentPicker.types.images,
        DocumentPicker.types.plainText,
      ],
    });
    file = res;

    setNomFichierImageMateriel(
      'photo_materiel_demande_1_' +
        idDemande +
        '.' +
        file.name.split('.').pop(),
    );
    await DataService.postImage(
      'Demande/' + idDemande + '/MaterielDocs/photo/1',
      res.name,
      res,
    ).then((req) => {
      console.log('upload photo:' + req);
    });
    setNomImgMat(res.name);
  };

  const uploadFactureMateriel = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      setNomFichierProformaMateriel(
        'facture_materiel_demande_1_' +
          idDemande +
          '.' +
          res.name.split('.').pop(),
      );

      let res1 = await DataService.postImage(
        'Demande/' + idDemande + '/MaterielDocs/facture/1',
        res.name,
        res,
      );
      setNomImgProformaMat(res.name);

      console.log('res.name:' + res.name);
      console.log('res:' + res1);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const onDemandeCreationSuccess = () => {
    setSuccessAddDde(true);
    DataService.put('Demande/' + idDemande + '/complete').then((complete) => {
      console.log('complete' + complete);
    });
    if (agenceId != '' || agenceId != undefined) {
      DataService.get('Agences/' + agenceId).then((req) => {
        setDataSourceAgences(JSON.parse(req));
        if (dataSourceAgences.isCentreAffaire == true) {
          DataService.get('Account/commercialByAgence/' + agenceId).then(
            (res) => {
              if (res != null && res.value != null) {
                let commercial = res.value[0];
                DataService.put(
                  'Demande/',
                  idDemande,
                  '/affecterCommercial/',
                  commercial.id,
                );
              }
            },
          );
        }
      });
    }
  };

  const {
    button,
    btn,
    btnbis,
    textInput,
    textInput2,
    textInputWP,
    textInputShow,
    item,
    row,
    box,
    rowCol,
    iconShow,
    error,
  } = style;

  return (
    <View style={{flex: 1}}>
      <ProgressSteps
        activeStepIconBorderColor="#8D1812"
        completedProgressBarColor="#8D1812"
        completedStepIconColor="#8D1812"
        activeLabelColor="#8D1812"
        activeStep={activeStep}>
        <ProgressStep label="" removeBtnRow>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 16}}>Ajout Materiel</Text>
            {typeMaterielId == 0 && showErrors == true ? (
              <Text style={error}>* choisir le type de matériel </Text>
            ) : (
              <View />
            )}
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 14, marginTop: 30}}>
                Type de matériel
              </Text>
              <Picker
                style={textInput2}
                selectedValue={typeMaterielId}
                onValueChange={(itemValue, itemIndex) => {
                  setTypeMaterielId(itemValue);
                }}>
                <Picker.Item label="" value="" key={0} />
                {listTypeMateriel.map((typeMateriel) => {
                  return (
                    <Picker.Item
                      label={typeMateriel.name}
                      value={typeMateriel.id}
                      key={typeMateriel.id}
                    />
                  );
                })}
              </Picker>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  width: 80,
                  fontSize: 14,
                  marginTop: 30,
                  marginRight: 15,
                }}>
                Objet
              </Text>
              <TextInput
                style={textInput2}
                underlineColorAndroid="transparent"
                placeholderTextColor={Appearences.Colors.headingGrey}
                value={marque}
                onChangeText={(marque) => {
                  setMarque(marque);
                  //(ddeModel.marque =  marque)
                }}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  width: 80,
                  fontSize: 14,
                  marginTop: 30,
                  marginRight: 15,
                }}>
                État
              </Text>
              <Picker
                style={textInput2}
                selectedValue={etat}
                onValueChange={(itemValue, itemIndex) => {
                  setEtat(itemValue);
                }}>
                <Picker.Item label="" value="" key={0} />
                <Picker.Item label="Neuf" value="Neuf" key={1} />
                <Picker.Item label="Occasion" value="Occasion" key={2} />
              </Picker>
            </View>
            {errors.PU && (
              <Text style={error}>* Entrez le prix unitaire TTC </Text>
            )}
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 14, marginTop: 30}}>
                Prix unitaire TTC*
              </Text>
              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  <TextInput
                    style={{
                      height: 50,
                      marginTop: 15,
                      marginBottom: 10,
                      width: '62%',
                      backgroundColor: '#fff',
                      color: 'grey',
                    }}
                    underlineColorAndroid="transparent"
                    placeholderTextColor={Appearences.Colors.headingGrey}
                    // value={PU}
                    // onChangeText={PU => {
                    //   (ddeModel.PU = PU);
                    //   setPU(PU)}}
                    onBlur={onBlur}
                    onChangeText={(value) => {
                      onChange(value), setPU(value);
                    }}
                    value={value}
                  />
                )}
                name="PU"
                rules={{required: true}}
                defaultValue=""
              />
            </View>
            {errors.TVA && <Text style={error}>* Entrez le montant TVA </Text>}
            <View style={{flexDirection: 'row'}}>
              <Text style={{width: 100, fontSize: 14, marginTop: 30}}>
                Montant TVA*
              </Text>
              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  <TextInput
                    style={{
                      height: 50,
                      marginTop: 15,
                      marginBottom: 10,
                      width: '62%',
                      backgroundColor: '#fff',
                      color: 'grey',
                    }}
                    underlineColorAndroid="transparent"
                    placeholderTextColor={Appearences.Colors.headingGrey}
                    // value={TVA}
                    // onChangeText={TVA => {
                    //   (ddeModel.TVA = TVA);
                    //   setTVA(TVA)}}
                    onBlur={onBlur}
                    onChangeText={(value) => {
                      onChange(value), setTVA(value);
                    }}
                    value={value}
                  />
                )}
                name="TVA"
                rules={{required: true}}
                defaultValue=""
              />
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text style={{width: 100, fontSize: 14, marginTop: 30}}>
                Quantité
              </Text>
              <Picker
                style={{
                  height: 50,
                  marginTop: 15,
                  marginBottom: 10,
                  width: '62%',
                  backgroundColor: '#fff',
                  color: 'grey',
                }}
                selectedValue={qte}
                onValueChange={(itemValue, itemIndex) => {
                  setQte(itemValue);
                }}>
                <Picker.Item label="" value="0" key={0} />
                <Picker.Item label="1" value="1" key={1} />
                <Picker.Item label="2" value="2" key={2} />
                <Picker.Item label="3" value="3" key={3} />
                <Picker.Item label="4" value="4" key={4} />
                <Picker.Item label="5" value="5" key={5} />
                <Picker.Item label="6" value="6" key={6} />
                <Picker.Item label="7" value="7" key={7} />
                <Picker.Item label="8" value="8" key={8} />
                <Picker.Item label="9" value="9" key={9} />
                <Picker.Item label="10" value="10" key={10} />
                <Picker.Item label="11" value="11" key={11} />
                <Picker.Item label="12" value="12" key={12} />
                <Picker.Item label="13" value="13" key={13} />
                <Picker.Item label="14" value="14" key={14} />
                <Picker.Item label="15" value="15" key={15} />
                <Picker.Item label="16" value="16" key={16} />
                <Picker.Item label="17" value="17" key={17} />
                <Picker.Item label="18" value="18" key={18} />
                <Picker.Item label="19" value="19" key={19} />
                <Picker.Item label="20" value="20" key={20} />
                <Picker.Item label="21" value="21" key={21} />
                <Picker.Item label="22" value="22" key={22} />
                <Picker.Item label="23" value="23" key={23} />
                <Picker.Item label="24" value="24" key={24} />
                <Picker.Item label="25" value="25" key={25} />
              </Picker>
            </View>
            {nomImgMat != '' ? (
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 14}}>{nomImgMat}</Text>
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
              style={(button, btn)}
              onPress={() => {
                uploadImageMateriel();
              }}>
              Télécharger photo du materiel
            </Button>
            {nomImgProformaMat != '' ? (
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 14}}>{nomImgProformaMat}</Text>
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
              style={(button, btn)}
              onPress={() => {
                uploadFactureMateriel();
              }}>
              Télécharger la facture proforma
            </Button>
            <View
              style={{
                alignSelf: 'flex-end',
                marginEnd: 15,
                marginTop: 20,
                marginBottom: 20,
              }}>
              <Button
                style={button}
                large
                mode="contained"
                onPress={handleSubmit(addMateriel)}>
                Suivant
              </Button>
            </View>
          </View>
        </ProgressStep>
        <ProgressStep
          label=""
          nextBtnText="Suivant"
          nextBtnTextStyle={{fontSize: 16, color: '#fff'}}
          nextBtnStyle={button}
          previousBtnStyle={{display: 'none'}}
          onNext={() => addRDV(dateRDV, agenceId, selectedIndexRDV)}>
          <View style={{marginLeft: 10, marginRight: 30, height: 500}}>
            <Text style={{fontSize: 16}}>Prise de RDV</Text>
            <View>
              <View style={{flexDirection: 'row', marginTop: 30}}>
                <Text
                  style={{
                    fontSize: 14,
                    marginTop: 15,
                    marginRight: 35,
                  }}>
                  Date & Heure
                </Text>
                {/* <TouchableOpacity onPress={datepicker}>
                    <View
                      style={{
                        padding: 15,
                        color: 'grey',
                        width: 220
                      }}
                      backgroundColor="#fff"
                      pointerEvents="none">
                      <Text>{dateRDV.toLocaleDateString()}</Text>
                    </View>
                  </TouchableOpacity> */}
                <TouchableOpacity onPress={datepicker}>
                  <View
                    style={{
                      padding: 15,
                      color: 'grey',
                      width: 110,
                    }}
                    backgroundColor="#fff"
                    pointerEvents="none">
                    <Text>{dateRDV.toLocaleDateString()}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={timepicker}>
                  <View
                    style={{
                      padding: 15,
                      color: 'grey',
                      width: 110,
                    }}
                    backgroundColor="#fff"
                  //  pointerEvents="none"
                    pointerEvents="none">
                    <Text>
                      {heureRDV.getHours()}:{heureRDV.getMinutes()}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              {show && (
                <DateTimePicker
                  value={dateRDV}
                  mode={mode}
                  minimumDate={new Date()}
                  dateFormat="DD-MM-YYYY"
                  display="default"
                  onChange={SetDateRDV}
                />
              )}
              {showHR && (
                <DateTimePicker
                  value={heureRDV}
                  mode={modeHR}
                  minimumDate={new Date()}
                  display="default"
                  onChange={SetHeureRDV}
                />
              )}
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 14, marginTop: 32}}>
                Choisir une agence
              </Text>
              <Picker
                style={{
                  height: 50,
                  marginTop: 15,
                  marginBottom: 10,
                  width: '64%',
                  backgroundColor: '#fff',
                  color: 'grey',
                }}
                selectedValue={agenceId}
                onValueChange={(itemValue, itemIndex) => {
                  setAgenceId(itemValue);
                }}>
                <Picker.Item label="Agence Tunis -Siège" value="1" />
              </Picker>
            </View>
            <ButtonGroup
              onPress={(index) => updateIndexTypeRDV(index)}
              selectedIndex={selectedIndexRDV}
              buttons={buttonsRDV}
              containerStyle={{
                height: 50,
                borderRadius: 5,
                marginTop: 15,
                width: '90%',
              }}
              textStyle={{fontSize: 14}}
              selectedButtonStyle={{backgroundColor: '#4C5266'}}
            />
            <Text style={{marginTop: 20}}>
              * Nos commerciaux sont disponibles du lundi au vendredi de 8h à
              17h.
            </Text>
          </View>
        </ProgressStep>
        <ProgressStep label="" nextBtnText="Suivant" removeBtnRow>
          <View style={{alignItems: 'center'}}>
            <View style={{marginBottom: 20, paddingLeft: 15, paddingRight: 15}}>
              {listDocs.map((el) => {
                return (
                  <Chip
                    icon="check"
                    style={{marginBottom: 12, backgroundColor: 'lightgrey'}}>
                    {el.typeDocument}
                  </Chip>
                );
              })}
            </View>
            <Text style={{fontSize: 16}}>Téléchargement des documents</Text>
            {renderDocs(dataSourceDocs, item)}
          </View>
          <View>
            <Button
              style={(button, btn, btnbis)}
              mode="contained"
              onPress={() => {
                onDemandeCreationSuccess();
                props.navigation.navigate('ListDemandes');
                alert('Votre demande a été envoyé avec succès!');
              }}>
              Envoyer la demande
            </Button>
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
};

export default AjoutDemande;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 15,
    borderRadius: 5,
    backgroundColor: '#3c4454',
    color: 'white',
  },
  input1: {
    marginTop: 20,
  },
  input: {
    backgroundColor: '#ffffff',
    width: '70%',
    marginBottom: 20,
  },
  smallFont: {
    fontSize: 14,
  },
  btn: {
    minWidth: '80%',
    marginTop: 20,
  },
  btnbis: {
    backgroundColor: '#4C5266',
    minWidth: '80%',
    marginTop: 20,
  },
  textInput: {
    height: Appearences.Registration.itemHeight,
    width: '90%',
    backgroundColor: Appearences.Registration.boxColor,
    paddingStart: 2,
    paddingEnd: 15,
    marginTop: 15,
    paddingBottom: 0,
    paddingTop: 0,
    fontSize: Appearences.Registration.fontSize,
    color: Appearences.Colors.headingGrey,
    borderRadius: 5,
  },
  textInput2: {
    height: 50,
    marginTop: 15,
    marginBottom: 10,
    width: '64%',
    backgroundColor: '#fff',
    color: 'grey',
  },
  item: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    textAlign: 'justify',
    width: '80%',
  },
  row: {
    flexDirection: 'row',
    marginBottom: '3%',
    alignSelf: 'center',
  },
  box: {
    padding: 15,
    color: 'grey',
    width: 110
  },
  head: {
    height: 50,
    width: '100%',
    backgroundColor: '#8D1812',
    paddingTop: 10,
    paddingBottom: 10
  },
  title: {
    color: '#fff',
    fontSize: 18,
    alignSelf:"center"
  },
  error: {
    color: 'red',
    alignSelf: 'flex-start',
    marginTop: 20,
    marginStart: 15
  },
});
