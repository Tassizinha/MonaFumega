import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/login";
import Register from "../pages/register";

const Stack = createNativeStackNavigator();

export default function AppRouters(){
   return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen          
          name="Login"
          component={Login}
          options={{title: 'Login acesso'}}
        />       
       <Stack.Screen 
            name="Registro"
            component={Register} 
            options={{title: 'Faça seu registro'}}
        />
      </Stack.Navigator>
   )
}