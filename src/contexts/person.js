const { createContext, useState, useEffect } = require("react");
import { newPerson, personGetAll, personGetByUuidAuth} from "../services/personService";

const PersonContext = createContext({});

export const PersonProvider = ({children}) => {
   
    const [ person , setPerson ] = useState(null);

    async function createPerson(nome,email, uuidAuth, imagemUrl){
        try {
            const personData = await newPerson(nome, email,  uuidAuth);
            if ( personData){
                // setPerson(nome,email, uuidAuth, telefone); 
                return personData;   
            }
        } catch (error) {
            return null;
        }        
        return null
    }

    async function setPersonID(uuid){
        
        const personData = await personGetByUuidAuth(uuid);
        if ( personData){
            setPerson(personData);    
            return personData ;
        }else{
            setPerson(null);
            return null;
        }        
    }

    async function cleanPerson(){
        setPerson(null);
        return null
    }
    async function updatePerson(){
        return null
    }

    return(
        <PersonContext.Provider value={ {person , createPerson , setPersonID,cleanPerson ,updatePerson}} >
            {children}
        </PersonContext.Provider>
    )
}

export default PersonContext;