import React, { useEffect, useRef, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { createRoute } from "../../redux/slices/routes";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { getDepartment, getDivision, getLocation, getLocationConfig, updateLocationConfig } from "../../api/manning.api";
import { setActive } from "@material-tailwind/react/components/Tabs/TabsContext";
import { useNavigate } from "react-router-dom";
import Form_location from "../general.components/form_location";

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


function location(props: any) {
  // const dispatch = useDispatch()
  const [inputValues, setInputValues] = useState<InputValues>({});
  const [valuesToSend, setValuesToSend] = useState<InputValue[]>([]);

  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [locations, setLocations] = useState([]);
  const [division, setDivision] = useState("Admin");
  const [divisionFilter, SetDivisionFilter] = useState([]);
  let autoIncrementId = 1;
  const [initialValues, setinitialValues] = useState<InputValues>({});
  const [modifiedCurrentPositions, setModifiedCurrentPositions] = useState<string[]>([]);
  const [check, setCheck] = useState(0);

  // const redirect = () => {
  //   const component = "Location";
  //   dispatch(createRoute(component))
  //   props.enviarDatoAlPadre(1);
  // };
  
  const generateAutoIncrementId = () => {
    return autoIncrementId++;
  };

  useEffect(()=>{
    renderList()
    renderInputs() 
  },[])

  // useEffect(()=>{
  //   renderInputs() 
  // },[])

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

  const updateData = () => {
  try {
    updateLocationConfig(valuesToSend)
    // console.log(valuesToSend)
} catch (error) {
  throw new Error("Send Information Fail");
}
setCheck(generateAutoIncrementId)
  }

  const renderList = async () => {
    try{
      const responseDepartment = await getDepartment();
      setDepartments(responseDepartment.data) 
      // console.log(responseDepartment.data)
      const responseLocation = await getLocation();
      setLocations(responseLocation.data) 
      // console.log(responseLocation.data)
      const divisionResponse = await getDivision();
      SetDivisionFilter(divisionResponse.data)
    }catch{
      throw new Error('Render Fail');
    }
  }

  const renderInputs = async ()  =>{
    const locatationConfig = await getLocationConfig();
    // console.log(locatationConfig.data)

    locatationConfig.data.forEach((config:any) => {
      if (config.xSymbol) {
        initialValues[config.position] = config.xSymbol;
      }
    });
    
    // Establecer los valores iniciales en el estado
    setInputValues(initialValues);
  }

  const activeInputs = () => {
    setIsActive(!isActive)
  }

  const handleInputChange = ( locationId: never, departmentId: never, value: string ) => {
    if (value.toLowerCase() === "x" || value.toLowerCase() === "") {
      const key = `${locationId}-${departmentId}`;
      setInputValues((prevValues) => ({ ...prevValues, [key]: value }));
    }
  };

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

  const handleDivisionChance = (e:any) => {
    const selectedDivision = (e.target.value);
    if(e.target.value == ""){
      setDivision("");
    } else{
      setDivision(selectedDivision);
    }
  }

  const filteredDivision = departments.filter(({ divBis }) => divBis === division || division === "");


  return (
    
    <div className="h-screen xl:w-10/12 w-full xl:pl-16 pt-10 pl-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 p-2 pb-8">
        <div className=" lg:w-4/6 sm:w-full">
          <select
            className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5"
            onChange={handleDivisionChance}
            value={division}
          >
            <option value="">All Divisions</option>
            {divisionFilter.map(({ id, divBis }) => (
              <option key={id} value={divBis}>
                {divBis}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col-1 gap-8 ml-auto pr-4 pt-0.5">
          <div>
            <Form_location />
          </div>

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
        
      </div>

      <Card
        className="h-full w-full overflow-scroll"
        style={{ maxHeight: "650px" }}
      >
        <table className="w-full min-w-max table-auto text-left">
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
              {filteredDivision.map(({ id, deptmBis }) => (
                <th
                  key={id}
                  className="sticky top-0 bg-blue-gray-50 p-4 border-b border-blue-gray-100"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {deptmBis}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {locations.map(({ id: locationId, areaCode }) => (
              <tr key={locationId}>
                <td className="sticky left-0 top-0 bg-white p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {areaCode}
                  </Typography>
                </td>
                {filteredDivision.map(({ id: departmentId }) => (
                  <td
                    key={departmentId}
                    className="p-4 border-b border-blue-gray-50"
                  >
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={inputValues[`${locationId}-${departmentId}`] || ""}
                      onChange={(e) =>
                        handleInputChange(
                          locationId,
                          departmentId,
                          e.target.value
                        )
                      }
                      disabled={!isActive}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

      </Card>

    </div>
    
  );
}

export default location;



// if(isActive){
//   Swal.fire({
//     title: "Are you sure?",
//     text: "You won't be able to revert this!",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33", //AQUI ES DONDE SE VA A COPIAR LA LISTA VIEJA A LA NUEVA PA QUE QUEDE COMO ANTES
//     confirmButtonText: "Save changes",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       Swal.fire({
//         title: "You make a new request",
//         text: "Your request will be checked by an administrator.",
//         icon: "success",
//       });
//     } else {
//       setInputValues(originalInputValues);
//     }
//   });
  
// }