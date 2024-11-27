const { createContext, useState, useContext } = require("react");

import { loginUsuario, logoutUsuario, registarUsuario } from "../services/auth-firebase";
import PersonContext from "./person";


const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
   
    const [ user , setUser ] = useState(null);
    const { createPerson, setPersonID } = useContext(PersonContext)

    const LoginUser = async (email, password) => {
        try {
          const userCredential = await loginUsuario(email, password);        
          if (userCredential) {
            setUser( {
              email: userCredential?.user?.email,
              token : userCredential?.accessToken ,
              uuid: userCredential?.user?.uid } 
             );          
            
             const dataPerson = setPersonID( userCredential?.user?.uid);
          }         
          return user ;          
        } catch (error) {
          console.error('Erro ao fazer login: ', error.message);
        }
      };
    
      const LogoutUser = async () => {
        try {
         // console.log("auth-saindo: ", user);
          setUser(null);
          await logoutUsuario(user);
          // 
        } catch (error) {
          console.error('Erro ao fazer logout: ', error.message);
        }
      };

      const createUser = async (email, password, nome) => {
        try {
          const userCredential = await registarUsuario(email, password);
          if (userCredential) {
            // console.log( "auth : " , userCredential)
            setUser( {
              email: userCredential?.user?.email,
              token : userCredential?.accessToken ,
              uuid: userCredential?.user?.uid } 
            );     
            //
            const uuid = userCredential?.user?.uid ;
            const person =  await createPerson( nome, email ,  uuid );
            
          }
          

         return userCredential ;  

        } catch (error) {
          console.error('Erro ao fazer logout: ', error.message);
        }
      }

    return(
        <AuthContext.Provider value={ {signed: !!user, user , setUser , LoginUser , LogoutUser,createUser }} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;