import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeE1 from './components/home/Ecran1';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeE2 from './components/home/Ecran2';
import Apropos from './components/home/Apropos';
import Signin from './components/session/Signin';
import DashboardClient from './components/client/Dashboard';
import Accueil from './components/client/Acceuil';
import AccueilDemande from './components/client/demandes/AccueilDemande';
import AccueilSAV from './components/client/SAV/AccueilSAV';
import Notification from './components/client/Notification';
import Impaye from './components/client/SAV/Impaye';
import Contrat from './components/client/SAV/Contrat';
import Facture from './components/client/SAV/Facture';
import OffreVente from './components/client/OffreVente';
import Rachat from './components/client/SAV/Rachat';
import CessionVR from './components/client/SAV/CessionVR';
import ChangementAssurance from './components/client/SAV/ChnagementAssurence';
import SortieTerritoire from './components/client/SAV/SortieTerritoire';
import DetailsSAV from './components/client/SAV/DetailsSAV';
import Profil from './components/session/Profile';
import Messagerie from './components/client/messagerie/Messagerie';
import RepondreMsg from './components/client/messagerie/RepondreMsg';
import SendMsg from './components/client/messagerie/SendMSG';
import Simulateur from './components/home/simulateur/Simulateur';
import Resultat from './components/home/simulateur/Resultat';
import DemandeCredit from './components/home/DemandeCredit';
import Sinistre from './components/client/SAV/sinistre/Sinistre1';
import AjouterSinistre from './components/client/SAV/sinistre/AjouterSinistre';
import ActifEnVente from './components/home/actifEnVente/ActifEnVente';
import DetailsActifEnVente from './components/home/actifEnVente/DetailsActifEnVente';
import ListDemandes from './components/client/demandes/ListeDemandes';
import EditDemande from './components/client/demandes/Editdemande';
import AjoutDemande from './components/client/demandes/AjoutDemande';
import AjoutReclamation from './components/client/reaclamation/AjoutReaclamation';
import ListReclamation from './components/client/reaclamation/ListReclamations';
import DetailsDemande from './components/client/demandes/DetailsDemande';


const Stack = createNativeStackNavigator();
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#8D1812',
    accent: '#384155',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
              name="HomeE1"
              component={HomeE1}
              options={{headerShown: false}}
          />
          <Stack.Screen
            name="HomeE2"
            component={HomeE2}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Apropos"
            component={Apropos}
            options={{
              title: 'À propos',
              headerTintColor: '#8D1812',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
           <Stack.Screen
            name="Sign in"
            component={Signin}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Dashboard client"
            component={DashboardClient}
            options={{
              title: 'Tableau de bord',
              headerTintColor: '#8D1812',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="Accueil"
            component={Accueil}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AccueilDemande"
            component={AccueilDemande}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AccueilSAV"
            component={AccueilSAV}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Impaye"
            component={Impaye}
            options={{
              title: 'Liste des impayés',
              headerTintColor: '#8D1812',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="Contrats"
            component={Contrat}
            options={{
              title: 'Liste des contrats',
              headerTintColor: '#8D1812',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="Facture"
            component={Facture}
            options={{
              title: 'Suivi facturation',
              headerTintColor: '#8D1812',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="OffreVente"
            component={OffreVente}
            options={{
              title: 'Offre de vente',
              headerTintColor: '#8D1812',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="Rachat"
            component={Rachat}
            options={{
              title: 'Demande de rachat',
              headerTintColor: '#8D1812',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="CessionVR"
            component={CessionVR}
            options={{
              title: 'Demande de cession VR',
              headerTintColor: '#8D1812',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="ChangementAssurance"
            component={ChangementAssurance}
            options={{
              title: 'Changement assurance',
              headerTintColor: '#8D1812',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="SortieTerritoire"
            component={SortieTerritoire}
            options={{
              title: 'Sortie du territoire',
              headerTintColor: '#8D1812',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="Sinistre"
            component={Sinistre}
            options={{
              title: 'Déclaration sinistre',
              headerTintColor: '#8D1812',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="AjouterSinistre"
            component={AjouterSinistre}
            options={{
              title: 'Ajouter un sinistre',
              headerTintColor: '#8D1812',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="DetailsSAV"
            component={DetailsSAV}
            options={{
              title: 'Détails de la demande',
              headerTintColor: '#8D1812',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          
          <Stack.Screen
            name="Profil"
            component={Profil}
            options={{
              title: 'Mon profil',
              headerTintColor: '#fff',
              headerStyle: {
                backgroundColor: '#8D1812',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="Messagerie"
            component={Messagerie}
            options={{
              title: 'Messagerie',
              headerTintColor: '#8D1812',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="RepondreMsg"
            component={RepondreMsg}
            options={{
              title: 'Nouveau message',
              headerTintColor: '#8D1812',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="SendMsg"
            component={SendMsg}
            options={{
              title: 'Nouveau message',
              headerTintColor: '#8D1812',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="Simulateur"
            component={Simulateur}
            options={{
              title: 'Simulez votre crédit',
              headerTintColor: '#8D1812',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="Resultat"
            component={Resultat}
            options={{
              title: 'Résultat de simulation',
              headerTintColor: '#8D1812',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="DemandeCredit"
            component={DemandeCredit}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ActifEnVente"
            component={ActifEnVente}
            options={{
              title: 'Actif en vente',
              headerTintColor: '#8D1812',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="DetailsActifEnVente"
            component={DetailsActifEnVente}
            options={{
              title: 'Détails actif en vente',
              headerTintColor: '#8D1812',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="ListDemandes"
            component={ListDemandes}
            options={{
              title: 'List demandes',
              headerTintColor: '#8D1812',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="EditDemande"
            component={EditDemande}
            options={{
              title: 'Modifier la demande',
              headerTintColor: '#8D1812',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="AjoutDemande"
            component={AjoutDemande}
            options={{
              title: 'Ajouter une demande',
              headerTintColor: '#8D1812',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="AjoutReclamation"
            component={AjoutReclamation}
            options={{
              title: 'Envoyer une réclamation',
              headerTintColor: '#8D1812',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="ListReclamation"
            component={ListReclamation}
            options={{
              title: 'Liste de mes réclamations',
              headerTintColor: '#8D1812',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="DetailsDemande"
            component={DetailsDemande}
            options={{
              title: 'Détails de la demande',
              headerTintColor: '#8D1812',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
  {/*     <Stack.Screen
            name="Notification"
            component={Notification}
            options={{
              title: 'Liste des notifications',
              headerTintColor: '#8D1812',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          /> */}