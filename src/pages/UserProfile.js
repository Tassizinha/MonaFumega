import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { getDatabase, ref, get } from "firebase/database";
import AuthContext from '../contexts/auth';
import { getLoggedUserID } from '../services/personService';
import { useFocusEffect } from '@react-navigation/native'; // Importação necessária

const ProfileScreen = ({ navigation }) => {
  const { user, LogoutUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPersonData = async () => {
    try {
      const userID = await getLoggedUserID();

      if (!userID) {
        Alert.alert("Erro", "Usuário não encontrado. Faça login novamente.");
        setLoading(false);
        return;
      }

      const db = getDatabase();
      const userRef = ref(db, `user/${userID}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        setUserData(snapshot.val());
      } else {
        Alert.alert("Erro", "Dados do usuário não encontrados.");
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
      Alert.alert("Erro", "Não foi possível carregar os dados do perfil.");
    } finally {
      setLoading(false);
    }
  };

  // Atualiza os dados toda vez que a tela for focada
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true); // Exibe o indicador de carregamento
      fetchPersonData(); // Chama a função para atualizar os dados
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Carregando perfil...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Erro ao carregar os dados do perfil.</Text>
      </View>
    );
  }

  async function handleOnClickSair() {
    await LogoutUser();
  }

  return (
    <View
      style={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: userData.imagemUrl || "https://via.placeholder.com/150" }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.cameraIconContainer}>
            <Text style={styles.cameraIcon}>📷</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>{userData.nome || "Usuário"}</Text>
        <Text style={styles.email}>{userData.email || "Email não disponível"}</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Text style={styles.editButtonText}>Editar Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOnClickSair}>
          <Text style={styles.logoutText}>SAIR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffff', 
  },
  header: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'transparent', 
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 4,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  cameraIcon: {
    fontSize: 18,
    color: '#006D77',
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1D361F',
    marginTop: 20,
  },
  email: {
    fontSize: 18,
    color: '#1D361F',
    marginTop: 5,
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -4 },
  },
  editButton: {
    width: '100%',
    padding: 16,
    backgroundColor: '#1D361F',
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 25,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  editButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutText: {
    fontSize: 18,
    color: '#1D361F',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;




