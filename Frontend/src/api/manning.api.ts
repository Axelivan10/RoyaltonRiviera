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

export const getShift = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/manning/shift`, {
    });
    
    return response;

  } catch (error) {
    throw new Error('Get Shift Fail');
  }
}

export const getServiceType = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/manning/serviceType`, {
    });
    
    return response;

  } catch (error) {
    throw new Error('Get Shift Fail');
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

export const relationsShiftConfig = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/manning/relationsShiftConfig`, {
    });
    
    return response;

  } catch (error) {
    throw new Error('Get Relation Fail');
  }
}

export const relationsServiceTypeConfig = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/manning/relationsServiceTypeConfig`, {
    });
    
    return response;

  } catch (error) {
    throw new Error('Get Relation Fail');
  }
}

export const getRelationsPositionConfig = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/manning/relationsPositionConfig`, {
    });
    
    return response;

  } catch (error) {
    throw new Error('Get Relation Fail');
  }
}

export const getrelationsPosLocConfig = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/manning/relationsPosLocConfig`, {
    });
    
    return response;

  } catch (error) {
    throw new Error('Get Relation Fail');
  }
}

export const getRelationsStandardTableConfig = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/manning/relationsStandardTableConfig`, {
    });
    
    return response;

  } catch (error) {
    throw new Error('Get Relation Fail');
  }
}

export const getRelationsSizeCriteriaConfig = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/manning/relationsSizeCriteriaConfig`, {
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

export const getShiftConfig = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/manning/shiftConfig`, {
    });
    
    return response;

  } catch (error) {
    throw new Error('Get Locations Fail');
  }
}

export const getServiceTypeConfig = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/manning/serviceTypeConfig`, {
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
    throw new Error('Update PlantConfig Fail');
  }
}

export const updateShiftConfig = async (inputValues: {}) => {
  try {
    const response = await axios.put(`${BASE_URL}/manning/updateShiftConfig`, inputValues);
    return response;

  } catch (error) {
    throw new Error('Update ShiftConfig Fail');
  }
}

export const updatePositionConfig = async (inputValues: {}) => {
  try {
    const response = await axios.put(`${BASE_URL}/manning/updatePositionConfig`, inputValues);
    return response;

  } catch (error) {
    throw new Error('Update PositionConfig Fail');
  }
}

export const updateServiceTypeConfig = async (inputValues: {}) => {
  try {
    const response = await axios.put(`${BASE_URL}/manning/updateServiceTypeConfig`, inputValues);
    return response;

  } catch (error) {
    throw new Error('Update ServiceTypeConfig Fail');
  }
}

export const updatePosLocConfig = async (inputValues: {}) => {
  try {
    const response = await axios.put(`${BASE_URL}/manning/updatePosLocConfig`, inputValues);
    return response;

  } catch (error) {
    throw new Error('Update PositionLocationConfig Fail');
  }
}

export const updateStandardTableConfig = async (inputValues: {}) => {
  try {
    const response = await axios.put(`${BASE_URL}/manning/updateStandardTableConfig`, inputValues);
    return response;

  } catch (error) {
    throw new Error('Update StandardTableConfig Fail');
  }
}

export const updateSizeCriteriaConfig = async (inputValues: {}) => {
  try {
    const response = await axios.put(`${BASE_URL}/manning/updateSizeCriteriaConfig`, inputValues);
    return response;

  } catch (error) {
    throw new Error('Update sizeCriteriaConfig Fail');
  }
}

export const createLocation = async (dataLocation: {} ) => {
  try {
    const response = await axios.post(`${BASE_URL}/manning/createLocation`, {
      dataLocation,
    });
    return response;

  } catch (error) {
    throw new Error('Create Location Fail');
  }
}

export const createPlant = async (country:string, plantId: string, plantCode:string, plantDescription:string, rooms:string ) => {
  
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

export const createServiceTypeConfig = async (dataValues : any) => {
  
  try {
    const response = await axios.post(`${BASE_URL}/manning/createServiceTypeConfig`, {
      dataValues,
    });
    return response;

  } catch (error) {
    throw new Error('Create Location Fail');
  }

}

export const deleteServiceTypeConfig = async (id: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/manning/deleteServiceTypeConfig/${id}`);
    return response;
  } catch (error) {
    throw new Error('Delete Location Fail');
  }
};


