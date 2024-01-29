import { Card, Typography } from '@material-tailwind/react'
import React, { useState } from 'react'

  interface InputValues {
    [key: string]: string;
  }
  
  interface InputValue {
    id: number;
    position: string;
    xSymbol: string;
    // locationId: number;
    // deparmentId: number;
  }
  
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
    position: string;
    xSymbol: string;
  }
  
  interface Plant {
    id: number;
    plantCode: string;
    plantDescription: string;
    countryCode: string
  }
  

function shift() {
    const [inputValues, setInputValues] = useState<InputValues>({});
    const [valuesToSend, setValuesToSend] = useState<InputValue[]>([]);

    const [plants, setPlants] = useState([]);
    const [divisions, setDivisions] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [plantt, setPlantt] = useState("");
    const [division, setDivision] = useState("");
    const [country, setCountry] = useState("");
    const [departmentt, setDepartmentt] = useState("");

    const [relationsPlant, setRelationsPlant] = useState<relationsAll[]>([]);
    const [initialValues, setinitialValues] = useState<InputValues>({});
    const [check, setCheck] = useState(0);
    const [modifiedCurrentPositions, setModifiedCurrentPositions] = useState<string[]>([]);
    const [isActive, setIsActive] = useState(false);


    const handleInputChange = ( locationId: number, plantId: number, value: string ) => {
        if (value.toLowerCase() === "x" || value.toLowerCase() === "") {
          const key = `${locationId}-${plantId}`;
          setInputValues((prevValues) => ({ ...prevValues, [key]: value }));
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

      const filteredData = relationsPlant
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
        <thead className="bg-white">
          <tr>
            <th className="sticky top-0 left-0 z-50 bg-blue-gray-50 p-4 border-b border-blue-gray-100">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Location
              </Typography>
            </th>
            <th className="sticky top-0 left-20 z-50 bg-blue-gray-50 p-4 border-b border-blue-gray-100">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Department
              </Typography>
            </th>
            <th className="sticky top-0 left-20 z-50 bg-blue-gray-50 p-4 border-b border-blue-gray-100">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Plant
              </Typography>
            </th>
            {plants.map(({ id, plantCode, plantDescription }) => (
              <th
                key={id}
                className="sticky top-0 bg-blue-gray-50 p-4 border-b border-blue-gray-100 text-center"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {plantCode}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map(
            ({ id: locationId, deparment, location, position, xSymbol }) => (
              <tr key={locationId}>
                <td className="sticky left-0 top-0 bg-white p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {location.area}
                  </Typography>
                </td>
                <td className="sticky left-20 top-0 bg-white p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {deparment.deptmBis}
                  </Typography>
                </td>

                {plants.map(({ id: plantId }) => (
                  <td
                    key={plantId}
                    className="p-4 border-b border-blue-gray-50"
                  >
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={inputValues[`${locationId}-${plantId}`] || ""}
                      onChange={(e) =>
                        handleInputChange(locationId, plantId, e.target.value)
                      }
                      disabled={!isActive}
                    />
                  </td>
                ))}
              </tr>
            )
          )}
        </tbody>
      </table>
    </Card>
  </div>
  )
}

export default shift