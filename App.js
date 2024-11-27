import { NavigationContainer } from '@react-navigation/native';
import Routers from './src/routers/routers';
import { AuthProvider } from './src/contexts/auth';
import { StatusBar } from 'expo-status-bar';
import { PersonProvider } from './src/contexts/person';
// import ProfileScreen from './ProfileScreen'; // Tela de perfil
// import EditProfileScreen from './EditProfileScreen'; // Tela de edição

export default function App() {
  return (
    <NavigationContainer> 
      <PersonProvider>
        <AuthProvider>
            <Routers />
            <StatusBar style='auto' />
        </AuthProvider>       
      </PersonProvider>
    </NavigationContainer>    
  );
}
