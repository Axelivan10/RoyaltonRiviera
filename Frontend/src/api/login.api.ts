import UserInterfaceAuth from '../interfaces/api/api.interface';
import axios from "axios";

const BASE_URL = 'http://localhost:3000';


export const Login = async (email:string, password:string) => {//QUIERO PROBAR SI MI INTERFAZ FUNCIONA CORRECTAMENTE SI REGRESAR A STRING
  
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
    
    return response;

  } catch (error) {
    throw new Error('Login Fail');
  }
}

export const getCode = async (id:number, email:string) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/${id}`, {
      email
    });
    
    return response;

  } catch (error) {
    // console.error('Error:', error);
     throw new Error('Fail to load the number code');
  }
}

export const checkCode = async (id:number, expiration:string, codes:string) => {
    const code = parseInt(codes)
  try {
    const response = await axios.patch(`${BASE_URL}/auth/${id}`, {
      expiration,
      code
    });
    
    return response;

  } catch (error) {
    // console.error('Error:', error);
     throw new Error('Fail to load the number code');
  }


}

