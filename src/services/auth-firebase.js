import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../services/database/firebase";
//  
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { set } from "firebase/database";

export async function loginUsuario(email, password) {
	//console.log( email, password );
	const usuario = await signInWithEmailAndPassword(
		auth,
		email,
		password,
	);
	if (usuario) {
		try {
			const token = usuario.accessToken;
			//console.log(token)
			return ( usuario )
		} catch (error) {
			console.log( error)	
		}	   
	}	
	return usuario;
}

export async function logoutUsuario() {
	auth.signOut();
	// Limpa todo o AsyncStorage
	AsyncStorage.clear()
		.then(() => {
			console.log("AsyncStorage limpo com sucesso!");
		})
		.catch((error) => {
			console.error("Erro ao limpar o AsyncStorage:", error);
		});
}

export async function registarUsuario(email, password) {
	const usuario = await createUserWithEmailAndPassword(auth, email, password)
	if ( usuario) {
		try {
			return ( usuario )
		} catch (error) {
			console.log( error)	
		}	
	}
}

export async function UsuarioLogado(email, password) {    
	const userCredential = await onAuthStateChanged( auth, (user)) ;
	return userCredential;
}