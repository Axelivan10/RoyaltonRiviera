import { Card, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { getDepartment, getDivision, getHotels, getShift, getShiftConfig, relationsShiftConfig, updateShiftConfig } from '../../api/manning.api';
import Swal from 'sweetalert2';

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

function shift() {
    const [inputValues, setInputValues] = useState<InputValues>({});
    const [valuesToSend, setValuesToSend] = useState<InputValue[]>([]);

    const [plants, setPlants] = useState([]);
    const [divisions, setDivisions] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [shifts, setShifts] = useState([]);
    const [plantt, setPlantt] = useState("");
    const [division, setDivision] = useState("");
    const [country, setCountry] = useState("");
    const [departmentt, setDepartmentt] = useState("");

    const [relationsPlant, setRelationsPlant] = useState<relationsAll[]>([]);
    const [initialValues, setinitialValues] = useState<InputValues>({});
    const [check, setCheck] = useState(0);
    const [modifiedCurrentPositions, setModifiedCurrentPositions] = useState<string[]>([]);
    const [isActive, setIsActive] = useState(false);

    let autoIncrementId = 1;
    const generateAutoIncrementId = () => {
      return autoIncrementId++;
    };

    useEffect(()=>{
      renderList()
      renderInputs()
    },[])

    useEffect(() => {
      setValuesToSend(sendInputValues.inputValues);
    }, [inputValues]);

    useEffect(() => {
      const newModifiedPositions = Object.keys(inputValues).filter(
        key => inputValues[key] !== initialValues[key]
      );
      setModifiedCurrentPositions(newModifiedPositions)
      // console.log(newModifiedPositions)
    }, [inputValues]);

    useEffect(() => {
      if (!isActive && modifiedCurrentPositions.length > 0) {
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
            // Lógica para manejar la confirmación
            Swal.fire({
              title: "You make a new request",
              text: "Your request will be checked by an administrator.",
              icon: "success",
            });
            updateData()
            setinitialValues(inputValues)
          } else {
            setInputValues(initialValues)
          }
        });
      } else {
        // Lógica para manejar cuando no hay posiciones modificadas o isActive está activado
        console.log("No hay posiciones modificadas o isActive está activado");
      }
    }, [isActive, ]);

    const renderList = async () => {
      try {
          const responseDepartment = await getDepartment();
          setDepartments(responseDepartment.data)

          const responsePlant = await getHotels();
          setPlants(responsePlant.data)
          // console.log(responsePlant.data)

          const responseDivision = await getDivision();
          setDivisions(responseDivision.data)

          const responseShift = await getShift();
          setShifts(responseShift.data)
          console.log(responseShift.data)

          const responseRelationsShiftConfig = await relationsShiftConfig();
          setRelationsPlant(responseRelationsShiftConfig.data)
          console.log(responseRelationsShiftConfig.data)

        } catch {
        throw new Error("Render Fail");
      }
    };

    const activeInputs = () => {
      setIsActive(!isActive);
    };

    const handleInputChange = ( locationId: number, ShiftId: number, value: string ) => {
        if (value.toLowerCase() === "x" || value.toLowerCase() === "") {
          const key = `${locationId}-${ShiftId}`;
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

      const renderInputs = async ()  =>{
        const shiftConfig = await getShiftConfig();
        console.log(shiftConfig.data)
        shiftConfig.data.forEach((config:any) => {
          if (config.xSymbol) {
            initialValues[config.position] = config.xSymbol;
          }
        });
        // Establecer los valores iniciales en el estado
        setInputValues(initialValues);
      }
    
      const sendInputValues = {
        inputValues: Object.entries(inputValues).map(([position, xSymbol]) => {
        const [DepartmentId, locationId] = position.split('-').map(Number);
        
        return {
          id: generateAutoIncrementId(),
          position,
          xSymbol,
          // locationId: DepartmentId,
          // deparmentId: locationId,
        };
  
        }),
      };
  
    const updateData = () => {
      try {
        updateShiftConfig(valuesToSend);
      } catch (error) {
        throw new Error("Send Information Fail");
      }
      setCheck(generateAutoIncrementId);
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
  
  <div className="flex flex-col-1 gap-8 ml-auto pr-4 pt-0.5 justify-end p-4">

        <div>
          {isActive ? (
            <p
              onClick={activeInputs}
              className="cursor-pointer hover:text-colorRoyalton hover:font-semibold"
            >
              Guardar cambios
            </p>
          ) : (
            <p
              onClick={activeInputs}
              className="cursor-pointer hover:text-colorRoyalton hover:font-semibold"
            >
              Habilitar campos
            </p>
          )}
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
            {shifts.map(({ id, shift }) => (
              <th
                key={id}
                className="sticky top-0 bg-blue-gray-50 p-4 border-b border-blue-gray-100 text-center"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {shift}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map(
            ({ id: locationId, deparment, location, plant, position, xSymbol }) => (
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
                <td className="sticky left-20 top-0 bg-white p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {plant.plantCode}
                    </Typography>
                  </td>
                {shifts.map(({ shiftId }) => (
                  <td
                    key={shiftId}
                    className="text-center p-4 border-b border-blue-gray-50"
                  >
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={inputValues[`${locationId}-${shiftId}`] || ""}
                      onChange={(e) =>
                        handleInputChange(locationId, shiftId, e.target.value)
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