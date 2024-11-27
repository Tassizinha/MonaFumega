import { useContext } from 'react';
import AppRouters from './appRouters';
import AuthRouters from './authRouters';
import AuthContext from "../contexts/auth"

export default function Routers() {
  const { signed } = useContext(AuthContext);  
  return (
    <>
        { signed ? <AuthRouters /> : <AppRouters /> }         
    </>
  )  
    

}