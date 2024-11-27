import Login from "../pages/login";
// import Register from "../pages/register";
import Home from "../pages/Home";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Details from "../pages/DetailScreen"
import UserProfile from "../pages/UserProfile";
import EditProfile from "../pages/EditProfileScreen";
import { MaterialIcons } from '@expo/vector-icons';
import ForumScreen from "../pages/ForumScreen";


const Tab = createBottomTabNavigator();

export default function AuthRouters(){
   return(
    <Tab.Navigator screenOptions={{headerShown: false,tabBarInactiveTintColor:"#B1B1B1", tabBarActiveTintColor:"#000"}}>
         <Tab.Screen 
            name="Home"
            component={Home} 
            options={{title: 'Home', tabBarIcon: ({color}) =>(
               <MaterialIcons name="home" size={35} color={color} />

               
            )}}
        />
         <Tab.Screen 
            name="Details"
            component={Details} 
            options={{title: 'Details',
               tabBarIcon: ({color}) =>(
               <MaterialIcons name="details" size={35} color={color} />

               
            ),tabBarButton: () => null}}
        />
         <Tab.Screen 
            name="UserProfile"
            component={UserProfile} 
            options={{title: 'UserProfile',
               tabBarIcon: ({color}) =>(
               <MaterialIcons name="person-outline" size={35} color={color} />  
            )}}
        />
         <Tab.Screen 
            name="EditProfile"
            component={EditProfile} 
            options={{title: 'EditProfileScreen', tabBarButton: () => null,
               tabBarIcon: ({color}) =>(
               <MaterialIcons name="person-outline" size={35} color={color} />
            )}}     
        />
         <Tab.Screen 
            name="ForumScreen"
            component={ForumScreen} 
            options={{title: 'ForumScreen',
               tabBarIcon: ({color}) =>(
               <MaterialIcons name="person-outline" size={35} color={color} />
            ),tabBarButton: () => null}}     
        />
    
      </Tab.Navigator>
   )
}