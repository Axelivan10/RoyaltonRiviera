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

export const getRelationsDepartment = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/manning/testLocationConfigDepartment`, {
    });
    
    return response;

  } catch (error) {
    throw new Error('Get Department Relation Fail');
  }
}

export const getRelationsLocation = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/manning/testLocationConfigLocation`, {
    });
    
    return response;

  } catch (error) {
    throw new Error('Get Department Relation Fail');
  }
}

export const relationsLocationConfig = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/manning/relationsLocationConfig`, {
    });
    
    return response;

  } catch (error) {
    throw new Error('Get Relation Fail');
  }
}

export const relationsPlantConfig = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/manning/relationsPlantConfig`, {
    });
    
    return response;

  } catch (error) {
    throw new Error('Get Relation Fail');
  }
}

export const updateHotelInfo = async (editValues: {}) => {
  try {
    const response = await axios.put(`${BASE_URL}/manning/updateHotels`, editValues);
    return response;

  } catch (error) {
    throw new Error('Update Hotels Fail');
  }
}

export const getLocationConfig = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/manning/locationConfig`, {
    });
    
    return response;

  } catch (error) {
    throw new Error('Get Locations Fail');
  }
}

export const getPlantConfig = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/manning/plantConfig`, {
    });
    
    return response;

  } catch (error) {
    throw new Error('Get Locations Fail');
  }
}

export const updateLocationConfig = async (inputValues: {}) => {
  try {
    const response = await axios.put(`${BASE_URL}/manning/updateLocationsConfig`, inputValues);
    return response;

  } catch (error) {
    throw new Error('Update LocationConfig Fail');
  }
}

export const updatePlantConfig = async (inputValues: {}) => {
  try {
    const response = await axios.put(`${BASE_URL}/manning/updatePlantConfig`, inputValues);
    return response;

  } catch (error) {
    throw new Error('Update LocationConfig Fail');
  }
}

export const createLocation = async (areaCode: string ) => {
  console.log(areaCode)
  try {
    const response = await axios.post(`${BASE_URL}/manning/createLocation`, {
      areaCode,
    });
    return response;

  } catch (error) {
    throw new Error('Create Location Fail');
  }
}

export const createPlant = async (country:string, plantId: number, plantCode:string, plantDescription:string, rooms:number ) => {
  try {
    const response = await axios.post(`${BASE_URL}/manning/createPlant`, {
      country,
      plantId,
      plantCode,
      plantDescription,
      rooms
    });
    return response;

  } catch (error) {
    throw new Error('Create Location Fail');
  }
}











