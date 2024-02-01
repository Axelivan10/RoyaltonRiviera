import { Card, Typography, list } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'
import { getDepartment, getDivision, getHotels, getServiceType, relationsServiceTypeConfig, updateServiceTypeConfig } from '../../api/manning.api';
import Swal from 'sweetalert2';

const TABLE_HEAD = ["Locations", "Department", "Plant", "Shift", "Service Type"];

  interface relationsAll {
    id: number;
    deparment: {
      id: number;
      deptmBis: string;
      divBis:string
    };
    location: {
      id: number;
      area: string;
    };
    plant: {
      id: number;
      countryCode: string;
      plantCode: string;
      plantDescription: string;
    };
    shift: {
      id: number;
      shift: string;
    };
    serviceType: {
      serviceTypeId: number;
      serviceTypeCode: string;
    };
    
  }

  interface editValues {
    serviceTypeId: number
    serviceTypeCode: string;
    serviceTypeCode2: string;
    serviceTypeCode3: string;
    serviceTypeDescription: string;
  }

  interface Data {
    [key: number]: number
  }

 
function serviceType() {
    const [plants, setPlants] = useState([]);
    const [divisions, setDivisions] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [plantt, setPlantt] = useState("");
    const [division, setDivision] = useState("");
    const [country, setCountry] = useState("");
    const [departmentt, setDepartmentt] = useState("");
    const [inputList, setInputList] = useState<editValues[]>([]);
    const [editValues, setEditValues] = useState<editValues[]>([]);
    const [relationsServiceType, setRelationsServiceType] = useState<relationsAll[]>([]);
    const [selectedServiceTypes, setSelectedServiceTypes] = useState<Data>({});
    const [dataToSend, setDataToSend] = useState({});

    let autoIncrementId = 1;

    useEffect(()=>{
      renderList()
    },[])
  
    useEffect(()=>{
      console.log(selectedServiceTypes)

      const transformedData = Object.entries(selectedServiceTypes).map(([locationId, selectId]) => ({
        locationId: Number(locationId),
        selectId: Number(selectId),
      }));
      console.log(transformedData)
      setDataToSend(transformedData);

    },[selectedServiceTypes])

    useEffect(()=>{
      setEditValues(inputList)
    },[inputList])

    const renderList = async () => {
      try {

        //ESTOS SON LOS LLAMADOS A LA BASE DE DATOS PARA RENDERIZAR TODOS LOS VALORES
          const responseDepartment = await getDepartment();
          setDepartments(responseDepartment.data)

          const responsePlant = await getHotels();
          setPlants(responsePlant.data)

          const responseDivision = await getDivision();
          setDivisions(responseDivision.data)

          const responseServiceType = await getServiceType();
          setInputList(responseServiceType.data)

          const RelationsServiceTypeConfig = await relationsServiceTypeConfig();
          setRelationsServiceType(RelationsServiceTypeConfig.data)
          console.log(RelationsServiceTypeConfig.data)

          //ESTE ES PARA SETEAR LA LISTA INICIAL DE LOS SELECTS.
          const formattedServiceTypes:Data = {};
          RelationsServiceTypeConfig.data.forEach((item:any) => {
            formattedServiceTypes[item.id] = item.serviceType.serviceTypeId;
          });

          setSelectedServiceTypes(formattedServiceTypes);

        } catch {
        throw new Error("Render Fail");
      }
    };

    const handleDivisionChange = (e: any) => {
        const selectedDivision = e.target.value;
        (e.target.value == "" ? setDivision("") : setDivision(selectedDivision))
        setDepartmentt("")
    };
  
    const handleDepartmentChange = (e: any) => {
        const selectedDepartment = e.target.value;
        (e.target.value == "" ? setDepartmentt("") : setDepartmentt(selectedDepartment))
    };
  
    const handleCountryChange = (e: any) => {
        const selectedCountry = e.target.value;
        (e.target.value === "" ? setCountry("") : setCountry(selectedCountry))   
        setPlantt("")
    };
  
    const handleHotelChange = (e: any) => {
        const selectedHotel = e.target.value;
        (e.target.value == "" ? setPlantt("") : setPlantt(selectedHotel))
    };

    const handleSelectChange = (locationId: number, selectId: any) => {
        const selectedId = Number(selectId.target.value);  

        setSelectedServiceTypes((prevSelectedServiceTypes) => ({
          ...prevSelectedServiceTypes,
          [locationId]: selectedId,
        }));
    };

    const sendValues = () => {
        try {
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Save changes",
          }).then(result => {
            if (result.isConfirmed) {
              updateServiceTypeConfig(dataToSend)
              Swal.fire({
                title: "You make a new request",
                text: "Your request will be checked by an administrator.",
                icon: "success",
              });
            }
          });  
        } catch (error) {
          throw new Error("Send data Fail");
        }
    }

      const filteredData = relationsServiceType
      .filter(({ deparment }) => deparment.divBis === division || division === "")
      .filter(({ deparment }) => deparment.deptmBis === departmentt || departmentt === "")
      .filter(({ plant }) => plant.plantCode === plantt || plantt === "")
      .filter(({ plant }) => plant.countryCode === country || country === "")
  
      const filteredDepartments = departments
      .filter(({ divBis }) => !division || divBis === division);
      
      const filteredHotels = plants
      .filter(({ countryCode }) => !country || countryCode === country);

  return (
    <div className="h-screen xl:w-10/12 w-full xl:pl-16 pt-8 pl-10 ">
      
      <div className="flex flex-col-1 gap-8 ml-auto pr-4 pt-0.5 justify-end p-4">
        <div>
          <p
            onClick={sendValues}
            className="cursor-pointer hover:text-colorRoyalton hover:font-semibold"
          >
            Save Changes
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3 px-2 lg:gap-2 xl:gap-4 pb-8 pt-2">
        <div className="w-full">
          <select
            className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5"
            onChange={handleDivisionChange}
            value={division}
          >
            <option value="">All Divisions</option>
            {divisions.map(({ id, divBis }) => (
              <option key={id} value={divBis}>
                {divBis}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full">
          <select
            className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5"
            onChange={handleDepartmentChange}
            value={departmentt}
          >
            <option value="">All Departments</option>
            {filteredDepartments.map(({ id, deptmBis }) => (
              <option key={id} value={deptmBis}>
                {deptmBis}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full">
          <select
            className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5"
            onChange={handleCountryChange}
            value={country}
          >
            <option value="">All Countries</option>
            <option value="MEX">Mexico</option>
            <option value="CRI">Costa Rica</option>
            <option value="DOM">Dominican Republic</option>
            <option value="GRD">Granade</option>
            <option value="ATG">Antigua</option>
            <option value="JAM">Jamaica</option>
          </select>
        </div>
        <div className="w-full">
          <select
            className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5"
            onChange={handleHotelChange}
            value={plantt}
          >
            <option value="">All Hotels</option>
            {filteredHotels.map(({ id, plantCode, plantDescription }) => (
              <option key={id} value={plantCode}>
                {plantDescription}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Card
        className="h-full w-full overflow-scroll"
        style={{ maxHeight: "650px" }}
      >
        <table className="w-full min-w-max table-auto text-left ">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map(
              ({ id: locationId, deparment, location, plant, shift, serviceType }) => (
                <tr key={locationId}>
                  <td className="p-4 border-b border-blue-gray-50 w-1/5">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {location.area}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 w-1/5">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {deparment.deptmBis}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 w-1/5">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {plant.plantCode}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 w-1/5">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {shift.shift}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 w-1/5">
                  <div>
                    <select
                      className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5"
                      onChange={(e) => handleSelectChange(locationId, e)}
                      value={selectedServiceTypes[locationId]}
                    >
                      {editValues.map(({ serviceTypeId, serviceTypeDescription }) => (
                        <option key={serviceTypeId} value={serviceTypeId}>
                          {serviceTypeDescription}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export default serviceType