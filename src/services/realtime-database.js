// videos usado com base: https://www.youtube.com/watch?v=1aL-f5ydrc8&list=PLWUFLphNVZjtnnD5YH5N-Fko-_RaSWIKQ&index=5

import { db } from './database/firebase'
import { set, push,ref, get } from "firebase/database";

export function newUserFatec() {
    const newDocRed = push(ref(db,"users"))
    set(newDocRed,{
        username: "teste2.gmail",
        email: "teste2@gmail.com",
        imageUrl : "",
        ra: "0220482423001",
        turno: "3",
        curso: '048',
        semestre: "2"
    })
    .then( ()=>{
        return { success: true , message: "usuario criado com sucesso"}
    })
    .catch( (error)=>{
        return { success: false , message: `falha ao Incluir o ususario : ${error.message}`}
    });
  }

  export async function getAllUser() {
    const usersArray = [];
    const dbref = ref(db,"users");
    const snapshot = await get(dbref);
    if (snapshot.exists()) {
        usersArray.push(...Object.values(snapshot.val())); // Adiciona os usuários ao array
        console.log(usersArray);
        const jsonResponse = JSON.stringify(usersArray); // Converte para JSON
        return jsonResponse;
    } else {
        return null;
    }
}