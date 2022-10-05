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
import {Picker} from '@react-native-picker/picker';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import {Button, Chip, TextInput, List} from 'react-native-paper';
//import {ButtonGroup, Input} from 'react-native-elements';
import {RadioButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Appearences from '../config/Appearences';

//import DocumentPicker from 'react-native-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useForm, Controller} from 'react-hook-form';
import DataService from '../services/data.services';
import LocalStorage from '../storage/LocalStorage';

const DemandeCredit = (props) => {
  const {control, handleSubmit, errors} = useForm();
  const [hidePass, setHidePass] = useState(true);
  const [hidePassword, setHidePassword] = useState(true);
  const [inscription, setInscription] = useState(false);
  const [showDN, setShowDN] = useState(false);
  const [show, setShow] = useState(false);
  const [showHR, setShowHR] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [successAddDde, setSuccessAddDde] = useState(false);
  const [showInscription, setShowInscription] = useState(false);
  const [showSeConnecter, setShowSeConnecter] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const buttonsRDV = ['Contact direct', 'Appel téléphonique'];
  const [selectedIndexRDV, setSelectedIndexRDV] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [agenceId, setAgenceId] = useState(1);
  const [idDemande, setIdDemande] = useState(0);
  const [typeMaterielId, setTypeMaterielId] = useState(0);
  const [fournisseurId, setFournisseurId] = useState(0);
  const [qte, setQte] = useState(0);
  const [annee, setAnnee] = useState(0);
  const [puissanceFiscal, setPuissanceFiscal] = useState(0);
  const [currentUserId, setCurrentUserId] = useState(0);
  const [profile, setProfile] = useState('Professionnel');
  const [nomFichierProformaMateriel, setNomFichierProformaMateriel] = useState(
    '',
  );
  const [nomFichierImageMateriel, setNomFichierImageMateriel] = useState('');
  const [email, setEmail] = useState('');
  const [civilite, setCivilite] = useState('');
  const [natureActiviteId, setNatureActiviteId] = useState(0);
  const [natureActiviteName, setNatureActiviteName] = useState('');
  const [identifiantUnique, setIdentifiantUnique] = useState('');
  const [naturePieceIdentite, setNaturePieceIdentite] = useState('');
  const [ncin, setNcin] = useState('');
  const [fixe, setFixe] = useState('');
  const [mobile, setMobile] = useState('');
  const [fax, setFax] = useState('');
  const [codeBCT, setCodeBCT] = useState('');
  const [adresse, setAdresse] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [ville, setVille] = useState('');
  const [idVille, setIdVille] = useState('');
  const [idPays, setIdPays] = useState('');
  const [raisonSocial, setRaisonSocial] = useState('');
  const [formeJuridique, setFormeJuridique] = useState('');
  const [contact, setContact] = useState('');
  const [nomImgMat, setNomImgMat] = useState('');
  const [nomImgProformaMat, setNomImgProformaMat] = useState('');
  const [marque, setMarque] = useState('');
  const [PU, setPU] = useState('');
  const [TVA, setTVA] = useState('');
  const [etat, setEtat] = useState('');
  const [groupe, setGroupe] = useState('');
  const [modeDN, setModeDN] = useState('date');
  const [mode, setMode] = useState('date');
  const [modeHR, setModeHR] = useState('date');
  const [dataSourceDocs, setDataSourceDocs] = useState([]);
  const [dataSourceAgences, setDataSourceAgences] = useState([]);
  const [listVille, setListVille] = useState([]);
  const [listVilles, setListVilles] = useState([]);
  const [listPays, setListPays] = useState([]);
  const [listTypeMateriel, setListTypeMateriel] = useState([]);
  const [listDocs, setListDocs] = useState([]);
  const [listNatureActivite, setListNatureActivite] = useState([]);
  const [
    listNatureActiviteAgriculteur,
    setListNatureActiviteAgriculteur,
  ] = useState([]);
  const [dateRDV, setDateRDV] = useState(new Date());
  const [dateNaissance, setDateNaissance] = useState(new Date());
  const [heureRDV, setHeureRDV] = useState(new Date());
  const memoizedHandleClick = useCallback(() => {}, []);

  let registerModel = {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    userName: '',
    Profile: profile,
  };

  useEffect(() => {
    const getListNatureActivite = async () => {
      const listNA = await DataService.get('Activite');
      setListNatureActivite(JSON.parse(listNA));
    };
    const getListNatureActiviteAgriculteur = async () => {
      const listNAA = await DataService.get('Activite/ForFarmer');
      setListNatureActiviteAgriculteur(JSON.parse(listNAA));
    };
    const getListVilles = async () => {
      const listVillen = await DataService.get('References/Ville');
      setListVilles(JSON.parse(listVillen));
    };
    const getListPays = async () => {
      const listPay = await DataService.get('Pays');
      setListPays(JSON.parse(listPay));
    };
    const getListTypeMateriel = async () => {
      const listTMat = await DataService.get('References/TypeMateriel');
      setListTypeMateriel(JSON.parse(listTMat));
    };
    getListNatureActivite();
    getListNatureActiviteAgriculteur();
    getListVilles();
    getListPays();
    getListTypeMateriel();
  }, []);

  const getUserByUserName = async (email) => {
    return await DataService.get('Account/userbyemail?email=' + email);
  };

  const getlistDocs = async () => {
    //Get document demande
    await DataService.get('DemandeDocument/Demande/' + idDemande).then(
      (reqDocs) => {
        setListDocs(JSON.parse(reqDocs));
        console.log('listDocs', listDocs);
      },
    );
  };

  const SetPasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const SetDateRDV = (event, dateRDV) => {
    dateRDV == null ? new Date() : (dateRDV = dateRDV || state);
    let srdv = Platform.OS === 'ios' ? true : false;
    setShow(srdv);
    let drdv = dateRDV == null ? new Date() : dateRDV;
    setDateRDV(drdv);
  };
  const SetDateNaissance = (event, dateNaissance) => {
    dateNaissance == null
      ? new Date()
      : (dateNaissance = dateNaissance || state);
    let sdn = Platform.OS === 'ios' ? true : false;
    setShowDN(sdn);
    let dtn = dateNaissance == null ? new Date() : dateNaissance;
    setDateNaissance(dtn);
  };
  const ShowDN = (modeDN) => {
    setShowDN(true);
    setModeDN(modeDN);
  };
  const datepickerDN = () => {
    ShowDN('dateNaissance');
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
  const ShowHR = (modeHR) => {
    setShowHR(true);
    setModeHR(modeHR);
  };
  const SetHeureRDV = (event, heureRDV) => {
    heureRDV == null ? new Date() : (heureRDV = heureRDV || state);
    let srhdv = Platform.OS === 'ios' ? true : false;
    setShowHR(srhdv);
    let hrdv = heureRDV == null ? new Date() : heureRDV;
    setHeureRDV(hrdv);
  };

  const lastStepDoc = async (profile) => {
    await DataService.get(
      'References/DemandeDocumentModel/' + '/' + profile + '/' + false,
    ).then((req) => {
      setDataSourceDocs(JSON.parse(req));
      setActiveStep(0);
    });
  };

  const updateIndexTypeRDV = (selectedIndexRDV) => {
    setSelectedIndexRDV(selectedIndexRDV);
  };

  const filterVille = async () => {
    setListVille(listVilles.filter((item) => item.codePostal == codePostal));
    if (
      listVille[0].name != undefined &&
      listVille[0].name != null &&
      listVille[0].id != undefined &&
      listVille[0].id != null
    ) {
      await setVille(JSON.stringify(listVille[0].name));
      await setIdVille(JSON.stringify(listVille[0].id));
      console.log('idVille : ' + JSON.stringify(idVille));
      console.log('ville : ' + JSON.stringify(ville));
      console.log('codePostal : ' + codePostal);
      console.log('listVille : ' + JSON.stringify(listVille));
    } else {
      console.log('code postale invalide');
    }
  };

  const login = async (data) => {
    const obj = {
      username: data.pseudo,
      password: data.psw,
      client_id: 'leasingportal',
      grant_type: 'password',
      scope: 'offline_access profile email',
    };
    let responseLogin = await DataService.post('token/auth', obj);
    if (responseLogin != false) {
      let userData = await getUserByUserName(data.pseudo);
      setAdresse(userData.value.adresse);
      setNatureActiviteId(userData.value.natureActiviteId);
      setCivilite(userData.value.civilite);
      setIdentifiantUnique(userData.value.identifiantUnique);
      setNaturePieceIdentite(userData.value.naturePieceIdentite);
      setNcin(userData.value.ncin);
      setFixe(userData.value.telFix);
      setMobile(userData.value.mobile);
      setCodePostal(userData.value.codePostal);
      setIdVille(userData.value.id_ville);
      setIdPays(userData.value.id_pays);
      setEmail(userData.value.email);
      setFax(userData.value.fax);
      setCodeBCT(userData.value.codeBCT);
      setDateNaissance(new Date(userData.value.dateNaissance));
      setRaisonSocial(userData.value.raisonSocial);
      setFormeJuridique(userData.value.formeJuridique);
      setGroupe(userData.value.groupe);
      setContact(userData.value.contact);
      if (userData != null) {
        LocalStorage.saveProfile(userData.value);
        LocalStorage.getUserProfile();
      }
      LocalStorage.setToken(responseLogin);
      addDemande();
      setActiveStep(activeStep + 1);
    } else {
      Alert.alert('error', 'Email ou mot de passe incorrect!', [
        {
          text: 'Ok',
        },
      ]);
    }
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

  const register = async (model) => {
    const obj = {
      username: model.email,
      password: model.password,
      client_id: 'leasingportal',
      grant_type: 'password',
      scope: 'offline_access profile email',
    };
    let responseLogin = await DataService.post('token/auth', obj);

    DataService.post('Account/register', model).then((req) => {
      if (req.errors == null) {
        let userData = getUserByUserName(model.email);
        if (userData != null) {
          LocalStorage.saveProfile(userData.value);
        }
        if (responseLogin != null) {
          LocalStorage.setToken(responseLogin);
        }
        Alert.alert(
          'Alert',
          'veuillez confirmer votre adresse email puis se connecter!',
          [
            {
              text: 'Ok',
            },
          ],
        );
        setShowSeConnecter(true);
        setShowInscription(false);
      } else {
        Alert.alert('error', req.errors[0].message, [
          {
            text: 'Ok',
          },
        ]);
      }
    });
  };

  const updateUserSvc = () => {
    let profilCoord = {
      email: email,
      civilite: civilite,
      dateNaissance: dateNaissance,
      natureActiviteId: natureActiviteId,
      //natureActiviteName: natureActiviteName,
      identifiantUnique: identifiantUnique,
      naturePieceIdentite: naturePieceIdentite,
      ncin: ncin,
      telFix: fixe,
      mobile: mobile,
      adresse: adresse,
      codePostal: codePostal,
      id_ville: idVille,
      id_pays: idPays,
      raisonSocial: raisonSocial,
      formeJuridique: formeJuridique,
      groupe: groupe,
      contact: contact,
      profile: profile,
    };
    console.log('ModelUser:' + JSON.stringify(profilCoord));
    DataService.put('Account', profilCoord).then((req) => {
      console.log(req);
    });
    setActiveStep(activeStep + 1);
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
    listModel.push(ddeModel);
    setShowErrors(true);
    console.log('listMateriel:' + JSON.stringify(listModel));
    if (
      typeMaterielId != 0
      //&&
      //(TVA < PU) &&
      //(TVA > 0) &&
      //(qte != 0)
    ) {
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
      setActiveStep(activeStep + 1);
    } else {
      console.log('erreur addMatr');
      setActiveStep(activeStep);
    }
  };

  const addRDV = async (dateRDV, heureRDV, agenceId, selectedIndexRDV) => {
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

  const renderDocs = (listDocs, itemStyle) => {
    if (listDocs != []) {
      return listDocs.map((doc, i) => {
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
    radiobtn,
  } = style;

  return (
    <View style={{flex: 1}}>
      <ProgressSteps
        activeStepIconBorderColor="#8D1812"
        completedProgressBarColor="#8D1812"
        completedStepIconColor="#8D1812"
        activeLabelColor="#8D1812"
        activeStep={activeStep}>
        <ProgressStep
          label=""
          nextBtnText=" Suivant "
          nextBtnTextStyle={{fontSize: 16, color: '#fff'}}
          nextBtnStyle={button}
          onNext={() => lastStepDoc(profile)}
          // onNext={() => setActiveStep(3)}
        >
          <View style={{marginLeft: 10}}>
            <Text style={{fontSize: 16, marginBottom: 20}}>
              Précisez votre profile
            </Text>
            <RadioButton.Group
              onValueChange={(newValue) => setProfile(newValue)}
              value={profile}>
              <View style={radiobtn}>
                <RadioButton value="Professionnel" />
                <Text>Personne physique (patentée)</Text>
              </View>
              <View style={radiobtn}>
                <RadioButton value="Agriculteur" />
                <Text>Agriculteur</Text>
              </View>
              <View style={radiobtn}>
                <RadioButton value="EntreprisePME" />
                <Text>Petite et moyenne entreprise</Text>
              </View>
              <View style={radiobtn}>
                <RadioButton value="EntrepriseGE" />
                <Text>Grande entreprise</Text>
              </View>
            </RadioButton.Group>
          </View>
        </ProgressStep>
        <ProgressStep label="" removeBtnRow>
          <Text style={{marginStart: 15, marginBottom: 10}}>
            Veuillez-vous connecter à votre compte HLDigital ou vous inscrire si
            vous n’avez pas de compte sur HLDigital
          </Text>
          {showInscription == false && showSeConnecter == true ? (
            <View style={{margin: 15}}>
              /////
              
                <Text style={error}>* Entrez un email valide</Text>
              
              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  <TextInput
                    style={textInput}
                    keyboardType="email-address"
                    label="Email"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                )}
                name="pseudo"
                rules={{required: true, pattern: /^\S+@\S+$/i}}
                defaultValue=""
              />
              
                <Text style={error}>* Entrez votre mot de passe</Text>
              
              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  <View style={rowCol}>
                    <TextInput
                      style={textInputShow}
                      label="Mot de passe"
                      secureTextEntry={hidePass ? true : false}
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                    />
                    <Icon
                      style={iconShow}
                      name={hidePass ? 'eye' : 'eye-slash'}
                      onPress={() => setHidePass(!hidePass)}
                    />
                  </View>
                )}
                name="psw"
                rules={{required: true}}
                defaultValue=""
              />
              <Button
                style={button}
                mode="contained"
                onPress={handleSubmit(login)}>
                Se connecter
              </Button>
              <Button
                style={(button, btn, btnbis)}
                mode="contained"
                onPress={() => {
                  setShowInscription(true);
                }}>
                S'inscrire
              </Button>
            </View>
          ) : (
            <View />
          )}
          {showInscription == true ? (
            <View style={{alignItems: 'center'}}>
              <TextInput
                style={textInput}
                underlineColorAndroid="transparent"
                placeholderTextColor={Appearences.Colors.headingGrey}
                label="Nom"
                onChangeText={(text) => (registerModel.lastname = text)}
              />
              <TextInput
                style={textInput}
                underlineColorAndroid="transparent"
                placeholderTextColor={Appearences.Colors.headingGrey}
                label="Prénom"
                onChangeText={(text) => (registerModel.firstname = text)}
              />
              <TextInput
                style={textInput}
                underlineColorAndroid="transparent"
                placeholderTextColor={Appearences.Colors.headingGrey}
                keyboardType="email-address"
                label="Email"
                onChangeText={(text) => {
                  registerModel.email = text;
                  registerModel.userName = text;
                }}
              />
              <View style={rowCol}>
                <TextInput
                  style={textInputShow}
                  underlineColorAndroid="transparent"
                  placeholderTextColor={Appearences.Colors.headingGrey}
                  label="Mot de passe"
                  secureTextEntry={hidePassword}
                  onChangeText={(text) => (registerModel.password = text)}
                />
                <Icon
                  style={iconShow}
                  name={hidePassword ? 'eye' : 'eye-slash'}
                  onPress={SetPasswordVisibility}
                />
              </View>
              <TextInput
                style={textInput}
                underlineColorAndroid="transparent"
                placeholderTextColor={Appearences.Colors.headingGrey}
                label="Vérifier mot de passe"
                secureTextEntry={true}
              />
              <Button
                style={(button, btn, btnbis)}
                mode="contained"
                onPress={() => {
                  register(registerModel);
                }}>
                S'inscrire
              </Button>
              <TouchableOpacity
                onPress={() => {
                  setShowSeConnecter(true);
                  setShowInscription(false);
                }}>
                <Text
                  style={{
                    color: '#8D1812',
                    marginTop: 27,
                    marginBottom: 40,
                    textDecorationLine: 'underline',
                    fontWeight: 'bold',
                  }}>
                  J'ai déjà un compte
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View />
          )}
        </ProgressStep>
        <ProgressStep label="" removeBtnRow>
          <View style={{alignItems: 'center'}}>
            {profile == 'Entreprise' ? (
              <TextInput
                style={textInputWP}
                mode="flat"
                underlineColorAndroid="transparent"
                placeholderTextColor={Appearences.Colors.headingGrey}
                label="Raison social"
                onChangeText={(text) => setRaisonSocial(text)}
               // defaultValue={true}
                defaultValue={raisonSocial}
              />
            ) : (
              <View />
            )}
            {profile != 'Entreprise' ? (
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    width: 80,
                    fontSize: 14,
                    marginTop: 30,
                    marginRight: 15,
                  }}>
                  Civilité
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
                  selectedValue={civilite}
                  onValueChange={(itemValue, itemIndex) =>
                    setCivilite(itemValue)
                  }>
                  <Picker.Item label="" value="" key={0} />
                  <Picker.Item label="Mr" value="Mr" key={1} />
                  <Picker.Item label="Mme" value="Mme" key={2} />
                  <Picker.Item label="Mlle" value="Mlle" key={3} />
                </Picker>
              </View>
            ) : (
              <View />
            )}
            {profile != 'Entreprise' ? (
              <View style={{alignItems: 'center'}}>
                <View style={row}>
                  <Text style={{fontSize: 14, marginTop: 15, marginRight: 5}}>
                    Date de naissance
                  </Text>
                  <TouchableOpacity onPress={datepickerDN}>
                    <View
                      style={box}
                      backgroundColor="#fff"
                      pointerEvents="none">
                      <Text>{dateNaissance.toLocaleDateString()}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                {showDN && (
                  <DateTimePicker
                    value={dateNaissance}
                    mode={modeDN}
                    dateFormat="DD-MM-YYYY"
                    display="default"
                    onChange={SetDateNaissance}
                  />
                )}
              </View>
            ) : (
              <View />
            )}
            {profile != 'Agriculteur' ? (
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    width: 80,
                    fontSize: 14,
                    marginTop: 30,
                    marginRight: 15,
                  }}>
                  Nature d'activité*
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
                  selectedValue={natureActiviteId}
                  onValueChange={
                    (itemValue, itemIndex) => setNatureActiviteId(itemValue)
                    //,setNatureActiviteName(itemValue[0].name)
                  }>
                  <Picker.Item label="" value="0" key={0} />
                  {listNatureActivite.map((na) => {
                    return (
                      // <Picker.Item label={na.name} value={{id: na.id , name: na.name}} key={na.id} />
                      <Picker.Item label={na.name} value={na.id} key={na.id} />
                    );
                  })}
                </Picker>
              </View>
            ) : (
              <View />
            )}
            {profile == 'Agriculteur' ? (
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    width: 80,
                    fontSize: 14,
                    marginTop: 30,
                    marginRight: 15,
                  }}>
                  Nature d'activité*
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
                  selectedValue={natureActiviteId}
                  onValueChange={
                    (itemValue, itemIndex) => setNatureActiviteId(itemValue)
                    //setNatureActiviteName(itemValue.name)
                  }>
                  <Picker.Item label="" value="0" key={0} />
                  {listNatureActiviteAgriculteur.map((naa) => {
                    return (
                      // <Picker.Item label={na.name} value={{id: na.id , name: na.name}} key={na.id} />
                      <Picker.Item
                        label={naa.name}
                        value={naa.id}
                        key={naa.id}
                      />
                    );
                  })}
                </Picker>
              </View>
            ) : (
              <View />
            )}
            
              <Text style={error}>* Saisie votre identifiant unique</Text>
            
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <TextInput
                  style={textInputWP}
                  mode="flat"
                  underlineColorAndroid="transparent"
                  placeholderTextColor={Appearences.Colors.headingGrey}
                  label="Identifiant unique*"
                  onBlur={onBlur}
                  onChangeText={(value) => {
                    onChange(value, setIdentifiantUnique(value));
                  }}
                  value={value}
                />
              )}
              name="identifiantUnique"
              rules={{required: true}}
              defaultValue={identifiantUnique}
            />
            {profile == 'Entreprise' ? (
              <View style={{alignItems: 'center'}}>
                <TextInput
                  style={textInputWP}
                  mode="flat"
                  underlineColorAndroid="transparent"
                  placeholderTextColor={Appearences.Colors.headingGrey}
                  label="Forme juridique"
                  onChangeText={(text) => setFormeJuridique(text)}
                 // defaultValue={true}
                  defaultValue={formeJuridique}
                />
                <TextInput
                  style={textInputWP}
                  mode="flat"
                  underlineColorAndroid="transparent"
                  placeholderTextColor={Appearences.Colors.headingGrey}
                  label="Groupe d'appartenance"
                  onChangeText={(text) => setGroupe(text)}
                //  defaultValue={true}
                  defaultValue={groupe}
                />
              </View>
            ) : (
              <View />
            )}
            {profile != 'Entreprise' ? (
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 14,
                    marginTop: 30,
                  }}>
                  Pièce d'identité
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
                  selectedValue={naturePieceIdentite}
                  onValueChange={(itemValue, itemIndex) =>
                    setNaturePieceIdentite(itemValue)
                  }>
                  <Picker.Item label="" value="" key={0} />
                  <Picker.Item label="CIN" value="CIN" key={1} />
                  <Picker.Item label="Passeport" value="Passeport" key={1} />
                </Picker>
              </View>
            ) : (
              <View />
            )}
            {profile != 'Entreprise' ? (
              <TextInput
                style={textInputWP}
                mode="flat"
                underlineColorAndroid="transparent"
                placeholderTextColor={Appearences.Colors.headingGrey}
                keyboardType="numeric"
                label="Numéro pièce d'identité*"
                onChangeText={(text) => setNcin(text)}
              //  defaultValue={true}
                defaultValue={ncin}
              />
            ) : (
              <View />
            )}
            <TextInput
              style={textInputWP}
              mode="flat"
              underlineColorAndroid="transparent"
              placeholderTextColor={Appearences.Colors.headingGrey}
              keyboardType="numeric"
              label="Téléphone fixe"
              onChangeText={(text) => setFixe(text)}
            //  defaultValue={true}
              defaultValue={fixe}
            />
            
              <Text style={error}>* Saisie votre téléphone portable</Text>
            
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <TextInput
                  style={textInputWP}
                  mode="flat"
                  underlineColorAndroid="transparent"
                  placeholderTextColor={Appearences.Colors.headingGrey}
                  keyboardType="numeric"
                  label="Téléphone portable*"
                  onBlur={onBlur}
                  onChangeText={(value) => {
                    onChange(value), setMobile(value);
                  }}
                  value={value}
                />
              )}
              name="mobile"
              rules={{required: true}}
              defaultValue={mobile}
            />
            <TextInput
              style={textInputWP}
              mode="flat"
              underlineColorAndroid="transparent"
              placeholderTextColor={Appearences.Colors.headingGrey}
              label="Adresse postale*"
              onChangeText={(text) => setAdresse(text)}
            //  defaultValue={true}
              defaultValue={adresse}
            />
            <View>
              
                <Text style={error}>* Saisie votre code postale</Text>
              
              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  <TextInput
                    style={textInputWP}
                    mode="flat"
                    underlineColorAndroid="transparent"
                    keyboardType="numeric"
                    label="Code Postale*"
                    onBlur={onBlur}
                    onChangeText={(value) => {
                      onChange(value), setCodePostal(value);
                    }}
                    value={value}
                  />
                )}
                name="codePostal"
                rules={{required: true}}
                defaultValue={codePostal}
              />
              <TouchableOpacity
                onPress={() => {
                  filterVille();
                }}>
                <TextInput
                  label={'Ville : ' + ville}
                  editable={false}
                  style={textInputWP}
                />
              </TouchableOpacity>
            </View>
            <Picker
              selectedValue={idPays}
              style={{
                height: 50,
                marginTop: 15,
                marginBottom: 10,
                width: '90%',
                backgroundColor: '#fff',
                color: 'grey',
              }}
              onValueChange={(itemValue, itemIndex) => setIdPays(itemValue)}>
              <Picker.Item label="" value="" key={0} />
              {listPays.map((pays) => {
                return (
                  <Picker.Item
                    label={pays.name}
                    value={pays.id}
                    key={pays.id}
                  />
                );
              })}
            </Picker>
            {profile == 'Entreprise' ? (
              <TextInput
                style={textInputWP}
                mode="flat"
                underlineColorAndroid="transparent"
                placeholderTextColor={Appearences.Colors.headingGrey}
                label="Contact (nom et prénom)"
                onChangeText={(text) => setContact(text)}
               // defaultValue={true}
                defaultValue={contact}
              />
            ) : (
              <View />
            )}
            <Text>* Champs Obligatoires </Text>
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
                onPress={handleSubmit(updateUserSvc)}>
                Suivant
              </Button>
            </View>
          </View>
        </ProgressStep>
        <ProgressStep label="" removeBtnRow>
          <View style={{alignItems: 'center'}}>
            {typeMaterielId == 0 && showErrors == true ? (
              <Text style={error}>* choisir le type de matériel </Text>
            ) : (
              <View />
            )}
            <Text style={{fontSize: 16}}>Ajout Materiel</Text>
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
            
              <Text style={error}>* Entrez le prix unitaire TTC </Text>
           
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
             <Text style={error}>* Entrez le montant TVA </Text>
            {/* {(TVA > PU || TVA < 0) && (showErrors == true) ?
              <Text style={error}>Le montant TVA ne doit pas accepter les 
              montants négatifs ou un montant supérieur au prix du matériel.</Text>
              : <View />
            } */}
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
                <Picker.Item label="" value="" key={0} />
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
          onNext={() => addRDV(dateRDV, heureRDV, agenceId, selectedIndexRDV)}>
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
            <Button
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
                props.navigation.navigate('Sign in');
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

export default DemandeCredit;



const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 15,
    borderRadius: 5,
    //backgroundColor: '#3c4454',    
    backgroundColor: '#8D1812',
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
    marginBottom: 20,
  },
  btnbis: {
    backgroundColor: '#4C5266',
    minWidth: '80%',
    marginTop: 20,
  },
  textInput: {
    height: Appearences.Registration.itemHeight,
    width: '100%',
    backgroundColor: Appearences.Registration.boxColor,
    //paddingStart: 5,
    paddingEnd: 15,
    marginBottom: 15,
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
  textInputWP: {
    height: Appearences.Registration.itemHeight,
    width: 350,
    backgroundColor: Appearences.Registration.boxColor,
    //paddingStart: 5,
    paddingEnd: 15,
    marginTop: 15,
    paddingBottom: 0,
    paddingTop: 0,
    fontSize: Appearences.Registration.fontSize,
    color: Appearences.Colors.headingGrey,
    borderRadius: 5,
  },
  textInputShow: {
    height: Appearences.Registration.itemHeight,
    width: '95%',
    backgroundColor: Appearences.Registration.boxColor,
    //paddingStart: 15,
    //paddingEnd: 15,
    marginTop: 15,
    paddingBottom: 0,
    paddingTop: 0,
    fontSize: Appearences.Registration.fontSize,
    color: Appearences.Colors.headingGrey,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
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
    width: 220
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
  rowCol: {
    flexDirection: 'row',
    marginBottom: '3%',
    alignSelf: 'center',
  },
  iconShow: {
    marginTop: '4%',
    paddingTop: '5%',
    backgroundColor: '#fff',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    paddingRight: 3
  },
  width:{
    width: 200
  },
  error: {
    color: 'red',
    alignSelf: 'flex-start',
    marginTop: 20,
    marginStart: 15
  },
  radiobtn: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 10,
    width: 230,
    marginStart: 15
  }
});
