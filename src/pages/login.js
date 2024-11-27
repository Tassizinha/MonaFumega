import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { getAllUser, newUserFatec } from "../services/realtime-database";
import { useContext, useState } from "react";
import AuthContext from "../contexts/auth";


const icon = require("../../assets/LogoLogin.png");

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { LoginUser } = useContext(AuthContext);

  const onGetAllUser = async () => {
    const lista = getAllUser();
  };

  const onNewUserFatec = async () => {
    const newuser = newUserFatec();
  };

  const onClickEntrar = async () => {
    const userLogin = await LoginUser(email, password);
  };

  const OnClickRegistrar = () => {
    navigation.navigate("Registro", { name: "registro" });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={icon} />
      <View style={styles.body}>
        <ScrollView style={styles.scroll}>

          <View style={styles.areaInput}>
            <TextInput
              name="Email"
              style={styles.textField}
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              name="Senha"
              style={styles.textField}
              placeholder="Senha"
              keyboardType="default"
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity style={styles.button} onPress={onClickEntrar}>
              <Text style={(styles.buttonText, { color: "#fff", fontSize: 25 })}>Acessar</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.button}
              onPress={onNewUserFatec} >
              <Text style={(styles.buttonText, { color: "#fff" })}>
                teste
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}
              onPress={onGetAllUser} >
              <Text style={(styles.buttonText, { color: "#fff" })}>
                lista usuarios 
              </Text>
            </TouchableOpacity> */}

            <View style={styles.rodape}>
              <Text style={styles.rodapeText}>Não possui conta?</Text>
              <TouchableOpacity onPress={OnClickRegistrar}>
                <Text
                  style={
                    (styles.rodapeText,
                    {     color:"#0A7208", fontWeight: 700, fontSize: 16 })
                  }
                >
                Faça sua inscrição!
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffff",
    alignItems: "center",
    justifyContent: "center",
    width:"100%",
    height:"100vh",
  },

  body: {
    height: "50%",
    width: "100%",
    alignItems: "center",
  },
  scroll:{
    flex: 1,
    width: "100%",
  },
  image: {
    height: 150, 
    width: 150,
    resizeMode: "cover", 
    marginTop: 55,
  },

  areaInput: {
    width: "100%",
    display:"flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    gap: 25,
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
    width: "75%",
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
  },
});

export default Login;
