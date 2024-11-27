import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { getLoggedUserID } from '../services/personService';
import { getDatabase, ref, get, update } from "firebase/database";

const EditProfileScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    imagemUrl:""
  });
  const [loading, setLoading] = useState(true);

  const fetchPersonData = async () => {
    console.log("fetchPersonData foi chamada");
    try {
      const userID = await getLoggedUserID(); // Obtém o ID do usuário logado
      console.log("ID do usuário logado:", userID);

      if (!userID) {
        Alert.alert("Erro", "Usuário não encontrado. Faça login novamente.");
        return;
      }

      const db = getDatabase();
      const userRef = ref(db, `user/${userID}`); // Referência dinâmica
      console.log("Referência do usuário no Firebase:", userRef);

      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        setFormData(snapshot.val()); // Preenche o estado com os dados existentes
      } else {
        Alert.alert("Erro", "Dados do usuário não encontrados.");
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
      Alert.alert("Erro", "Não foi possível carregar os dados do perfil.");
    } finally {
      setLoading(false); // Define loading como false ao final
    }
  };

  useEffect(() => {
    fetchPersonData();
  }, []); // Executa ao montar o componente

  const handleChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const userID = await getLoggedUserID();
    if (!userID) {
      Alert.alert("Erro", "Usuário não encontrado. Faça login novamente.");
      return;
    }

    try {
      const db = getDatabase();
      const userRef = ref(db, `user/${userID}`);
      await update(userRef, formData); // Atualiza todos os campos no banco
      Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
      navigation.goBack(); // Retorna à tela anterior após salvar
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      Alert.alert("Erro", "Não foi possível atualizar o perfil.");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={formData.nome}
        onChangeText={(value) => handleChange("nome", value)}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        value={formData.email}
        onChangeText={(value) => handleChange("email", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite seu link da imagem"
        value={formData.imagemUrl}
        onChangeText={(value) => handleChange("imagemUrl", value)}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    gap: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: '#0A7208',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
});

export default EditProfileScreen;
