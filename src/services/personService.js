import { db } from './database/firebase'
import { getAuth } from "firebase/auth";
import { set, push, ref, get, query, orderByChild, equalTo,} from "firebase/database";

async function newPerson(nome,email, uuidAuth, imagemUrl) {   
    console.log("Dentro person", nome, email, uuidAuth);

    const newRecord = push(ref(db,"user"));

    console.log("apos newRecord", nome, email, uuidAuth);
    
    const data = await set(newRecord,{
        nome: nome,
        email: email,
        uuidAuth: uuidAuth,
        imagemUrl: "",
        
    })
    .then( (data)=>{
        console.log(data) ;
        return data
    })
    .catch( (error)=>{
        return { success: false , message: `falha ao Incluir o ususario : ${error.message}`}
    });
  }
  const getLoggedUserID = async () => {
    const userUID = getAuth().currentUser?.uid; 
    console.log("UID do usuário autenticado:", userUID);
    if (!userUID) {
      console.error("Usuário não está logado.");
      return null;
    }
  
    const tableRef = ref(db, "user"); 
    const userQuery = query(tableRef, orderByChild("uuidAuth"), equalTo(userUID)); 
  
    try {
      const snapshot = await get(userQuery);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const [id] = Object.keys(data);
        console.log("ID do usuário logado:", id);
        return id;
      } else {
        console.warn("Nenhum registro encontrado para o usuário logado.");
        return null;
      }
    } catch (error) {
      console.error("Erro ao buscar o ID do usuário logado:", error);
      return null;
    }
  };
// Atualiza usuário por ID
async function updatePerson(id, updatedData) {
    const dbref = ref(db, `user/${id}`);
    try {
        await update(dbref, updatedData);
        return { success: true, message: "Registro atualizado com sucesso" };
    } catch (error) {
        if (error instanceof Error) {
            console.error("Erro ao fazer ao atualizar o registro:", error.message);
            throw new Error(error.message);
        } else {
            console.error("Erro desconhecido ao fazer a atualização do registro");
            throw new Error("Erro desconhecido");
        }
    }
}

async function personGetAll() {
    const usersArray = [];
    const dbref = ref(db, "user");
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

// Consulta usuário por ID
async function personGetById(uuid) {
    const dbref = ref(db, `user/${uuid}`);
    const snapshot = await get(dbref);
    if (snapshot.exists()) {
        const userData = snapshot.val();
        console.log(userData);
        return userData;
    } else {
        return { error: "Registro não encontrado" };
    }
}

// Consulta usuário por uuidauth
async function personGetByUuidAuth(uuidauth) {
    console.log( uuidauth)
    const dbref = ref(db, `user`);
    const snapshot = await get(dbref);
    if (snapshot.exists()) {
        const data = snapshot.val();
        console.log(data);
        // Percorre os registros para encontrar o uuidauth correspondente
        const person = Object.values(data)
            .find((person) => person.uuidauth === uuidauth);
            
        if (person) {
            // console.log(person);
            return person;
        } else {
            return { error: "Registro não encontrado" };
        }
    } else {
        return { error: "Nenhum registro encontrado" };
    }
}

export { newPerson, updatePerson, personGetAll , personGetById, personGetByUuidAuth, getLoggedUserID }