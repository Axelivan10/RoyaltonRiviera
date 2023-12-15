import axios from "axios";
import ManningInterface from '../interfaces/api/api.interface';

const BASE_URL = 'http://localhost:3000';


export const getAllInfoManning = async (hotels:object, region:object) => {
  // const token = localStorage.getItem("token")
  try {
    const response = await axios.get(`${BASE_URL}/manning/`, {
      params: {
        hotels: hotels,
        regions: region,
      },
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // 
    });
    
    return response;

  } catch (error) {
    throw new Error('Login Fail');
  }
}

export const getInfoParameter = async (hotels:object) => {

  try {
    const response = await axios.get(`${BASE_URL}/manning/parameter`, {
      params: {
        hotels: hotels,
      },
    });
    
    return response;

  } catch (error) {
    throw new Error('Login Fail');
  }
}


  












// id: manning.id,
// hotel: manning.hotel,
// region: manning.region,
// position: manning.position,
// cincuenta: manning.cincuenta,
// sesenta: manning.sesenta,
// setenta: manning.sesenta,
// ochenta: manning.ochenta,
// noventa: manning.noventa,
// area: manning.area,
// parameter: manning.parameter,
// parameter_value: manning.parameter_value