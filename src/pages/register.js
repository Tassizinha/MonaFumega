import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AuthContext from "../contexts/auth";

const icon = require("../../assets/LogoLogin.png");

const Register= ({navigation}) => {

  const [ email, setEmail] = useState("");
  const [ password, setPassword] = useState("")
  const [ nome, setNome] = useState("")
  const [ password2, setPassword2] = useState("")
  const { createUser } = useContext(AuthContext)

  const handleReturnLogin = () => {
    navigation.navigate("Login", { name: "login" });
  }
  
  async function handleOnClick(){
    //
      const usuario = await createUser(email, password, nome );
      // if ( usuario ) {
      //    const uuid = usuario?.user?.uid;
      //    console.log(usuario);
      //    const person =  newPerson(nome, email,  uuid , telefone );
      // }
      // console.log(usuario);
    }

  return (
   <View style={styles.container}>
     <Image style={styles.image} source={icon} />
     <View style={styles.body}>
       {/* <Text style={styles.title}>Registro</Text> */}
       <View style={styles.areaInput}>
         <TextInput
           name="nome"
           style={styles.textField}
           placeholder=" Informe seu Nome"
           keyboardType="default"
           onChangeText={ text => setNome(text) }
         />
         <TextInput
           name="email"
           style={styles.textField}
           placeholder=" Informe seu Email"
           keyboardType="Email-address"
           onChangeText={ text => setEmail(text) }
         />
         <TextInput
           name="password"
           style={styles.textField}
           placeholder="Informe sua senha"
           keyboardType="default"
           secureTextEntry
           onChangeText={ text => setPassword(text) }
         />
         <TextInput
           name="password2"
           style={styles.textField}
           placeholder="Repita a senha"
           keyboardType="default"
           secureTextEntry
           onChangeText={ text => setPassword2(text) }
         />
         <TouchableOpacity style={styles.button}
          onPress={() => handleOnClick() }
         >
           <Text style={(styles.buttonText)}>
             Registrar
           </Text>
         </TouchableOpacity>

         <View style={styles.rodape}>
            <Text style={styles.rodapeText}>Já possui conta? {"   "}</Text>
            <TouchableOpacity onPress={handleReturnLogin}>
              <Text
                style={
                  (styles.rodapeText,
                    {     color:"#0A7208", fontWeight: 700, fontSize: 16 })
                }
              >
                Voltar ao login
              </Text>
            </TouchableOpacity>
          </View>
  
         <View style={styles.rodape}>
         </View>
       </View>
     </View>
     <StatusBar style="auto" />
   </View>
  );
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffff",
    alignItems: "center",
    justifyContent: "center",
  },

  body: {
    height: "60%",
    width: "100%",
    alignItems: "center",
  },

  image: {
    height: 200, 
    width: 200,
    resizeMode: "cover", 
    marginTop: 55,
  },

  areaInput: {
    width: "100%",
    height: "80%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  title: {
    fontSize: 32,
    marginTop: 15,
    color: "#000",
    fontWeight: "300",
    fontSize: 24,
  },

  textField: {
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 20,
    padding: 8,
    width: "80%",
    height: 62,
    paddingHorizontal: 10,
  },

  button: {
    backgroundColor: "#0A7208",
    borderRadius: 16,
    width: "75%",
    height: 62,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },

  rodape: {
    flexDirection: "row",
    width: "62.75%",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: 20,
  },

  rodapeText: {
    fontSize: 18,
    fontWeight: "bold",
    color:"#0A7208",
  },


  buttonText: {
    backgroundColor:"#0A7208",
    fontSize: 25,
    color: "#fff",
  },

});

export default Register;