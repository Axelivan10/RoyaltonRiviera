import axios from "axios";
import ManningInterface from '../interfaces/api/api.interface';

const BASE_URL = 'http://localhost:3000';


export const getAllInfoManning = async (hotel:string, region:string, country:string) => {
  // const token = localStorage.getItem("token")
  try {
    const response = await axios.get(`${BASE_URL}/manning/`, {
      params: {
        hotel: hotel,
        region: region,
        country:country,
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

export const getInfoParameter = async (hotel:string) => {

  try {
    const response = await axios.get(`${BASE_URL}/manning/parameter`, {
      params: {
        hotel: hotel,
      },
    });
    
    return response;

  } catch (error) {
    throw new Error('Login Fail');
  }
}

export const getHotels = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/manning/hotels`, {
    });
    
    return response;

  } catch (error) {
    throw new Error('Hotels Fail');
  }
}

export const getDivision = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/manning/division`, {
      // params: {
      //   division: division,
      // },
    });
    
    return response;

  } catch (error) {
    throw new Error('Division Fail');
  }
}

// API FOR ALL THE ARRAYS 

export const getDepartment = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/manning/department`, {
    });
    
    return response;

  } catch (error) {
    throw new Error('Get Departments Fails');
  }
}

export const getLocation = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/manning/location`, {
    });
    
    return response;

  } catch (error) {
    throw new Error('Get Locations Fail');
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