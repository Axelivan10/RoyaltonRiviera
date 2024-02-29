import { useEffect, useState } from 'react'
import { Card, Typography } from '@material-tailwind/react';
import { getDepartment, getDivision, getHotels, getRelationsAbsentessiemConfig, getRelationsKitchenBackConfig, updateAbsentessiemConfig, updateKitchenBackConfig,  } from '../../api/manning.api';
import Swal from 'sweetalert2';

const TABLE_HEAD = ["Level", "Description",];

interface InputValues {
  [key: string]: string;
}

interface InputValue {
  id: number;
  position: string;
  numberValue: string;
}

interface relationsAll {
  id: number;
  plant: {
    id: number;
    countryCode: string;
    plantCode: string;
    plantDescription: string;
  },
  description: string,
  level:string,
  position: string;
  numberValue: number;
}

function absentessiem() {
  const [inputValues, setInputValues] = useState<InputValues>({});
  const [valuesToSend, setValuesToSend] = useState<InputValue[]>([]);

  const [plants, setPlants] = useState([]);
  const [plantt, setPlantt] = useState("");
  const [country, setCountry] = useState("");
  const [divisions, setDivisions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [departmentt, setDepartmentt] = useState("");
  const [division, setDivision] = useState("");
  const [relationsAbsentessiem, setRelationsAbsentessiem] = useState<relationsAll[]>([]);
  const [noDupicates, setNoDuplicates] = useState<relationsAll[]>([]);

  const [initialValues, setinitialValues] = useState<InputValues>({});
  const [check, setCheck] = useState(0);
  const [modifiedCurrentPositions, setModifiedCurrentPositions] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(false);

  let autoIncrementId = 1;
  const generateAutoIncrementId = () => {
    return autoIncrementId++;
  };

  useEffect(() => {
    renderList()
    renderInputs()
  }, [])

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

   useEffect(() => {
     // Filtrar duplicados en relationsPlant
     const relacionesUnicas = eliminarDuplicados(relationsAbsentessiem);
     setNoDuplicates(relacionesUnicas);
   }, [relationsAbsentessiem]);

  const eliminarDuplicados = (relationsPlant: relationsAll[]) => {
    const uniqueEntries = new Set<string>();
    const result: relationsAll[] = [];
    let autoIncrementId = 1;
  
    relationsPlant.forEach(entry => {
      const key = `${entry.level}-${entry.description}`;
  
      if (!uniqueEntries.has(key)) {
        uniqueEntries.add(key);
        result.push({
          id: autoIncrementId++, // Asignar nuevo ID en orden
          plant: {
            id: entry.plant.id,
            countryCode: entry.plant.countryCode,
            plantCode: entry.plant.plantCode,
            plantDescription: entry.plant.plantDescription,
          },
          description: entry.description,
          level:entry.level,
          position: entry.position,
          numberValue: entry.numberValue,
        });
      }
    });
  
    return result;
  };

  const renderList = async () => {
    try {
        const responseDepartment = await getDepartment();
        setDepartments(responseDepartment.data)
        // console.log(responseDepartment.data)

        const responsePlant = await getHotels();
        setPlants(responsePlant.data)
        console.log(responsePlant.data)

        const ResponseDivision = await getDivision();
        setDivisions(ResponseDivision.data)

        const responseRelationsAbsentessiemConfig = await getRelationsAbsentessiemConfig();
        setRelationsAbsentessiem(responseRelationsAbsentessiemConfig.data)
        console.log(responseRelationsAbsentessiemConfig.data)  

      } catch {
      throw new Error("Render Fail");
    }
  };

  const handleInputChange = ( tableId: number, plantId: number, value: string ) => {
    const accepted = /^[0-9]+(\.[0-9]{0,2})?$/;
    
    if (accepted.test(value) || value.toLowerCase() === "") {
      const key = `${tableId}-${plantId}`;
      setInputValues((prevValues) => ({ ...prevValues, [key]: value }));
    }
  };

  const activeInputs = () => {
    setIsActive(!isActive);
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
    const AbsentessiemConfig = await getRelationsAbsentessiemConfig();

    AbsentessiemConfig.data.forEach((config:any) => {
      if (config.numberValue) {
        initialValues[config.position] = config.numberValue;
      }
    });
    setInputValues(initialValues);
  }

  const sendInputValues = {
    inputValues: Object.entries(inputValues).map(([position, numberValue]) => {
  
      if (/^[0-9 ]*$/.test(numberValue)) {
      
      }

    return {
      id: generateAutoIncrementId(),
      position,
      numberValue,
    };

    }),
  };

  const updateData = () => {
  try {
    updateAbsentessiemConfig(valuesToSend);
  } catch (error) {
    throw new Error("Send Information Fail");
  }
  setCheck(generateAutoIncrementId);
  };


//ESTOS SIRVEN PARA FILTRAR LA INFORMACION EN LA TABLA
  const filteredHeaderHotels = plants
  .filter(({ countryCode }) => !country || countryCode === country)
  .filter(({ plantCode }) => !plantt || plantCode === plantt);


  //ESTOS FILTROS SON PARA LOS FILTROS QUE TENEMOS MAQUETADOS
  const filteredDepartments = departments
  .filter(({ divBis }) => !division || divBis === division);
  
  const filteredHotels = plants
  .filter(({ countryCode }) => !country || countryCode === country);


  return (
    <div className="flex flex-col h-screen w-screen md:p-6 p-2 xl:w-10/12 xl:pl-20 pt-10">
     
    <div className="flex flex-col-1 gap-8 ml-auto pr-4 pt-0.5 justify-end p-4 pb-4">
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
             {TABLE_HEAD.map((head) => (
               <th
                 key={head}
                 className={
                   head === "Level" && "Description"
                     ? "text-center sticky top-0 left-0 z-50 bg-blue-gray-50 p-4 border-b border-blue-gray-100"
                     : "bg-blue-gray-50 p-4 border-b border-blue-gray-100"
                    
                 }
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

             {filteredHeaderHotels.map(
               ({ id, plantCode, plantDescription }) => (
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
               )
             )}
           </tr>
         </thead>
         <tbody>
           {noDupicates.map(
             ({ id: tableId, level, description }) => (
               <tr key={tableId}>
                 <td className="sticky left-0 top-0 bg-white p-4 border-b border-blue-gray-50">
                   <Typography
                     variant="small"
                     color="blue-gray"
                     className="font-normal"
                   >
                     {level}
                   </Typography>
                 </td>
                 <td className="bg-white p-4 border-b border-blue-gray-50">
                   <Typography
                     variant="small"
                     color="blue-gray"
                     className="font-normal"
                   >
                     {description}
                   </Typography>
                 </td>
                 {filteredHeaderHotels.map(({ id: plantId }) => (
                   <td
                     key={plantId}
                     className="p-4 border-b border-blue-gray-50 text-center"
                   >
                     <input
                       type="text"
                       className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                       style={{ maxWidth: "100px" }}
                       value={inputValues[`${tableId}-${plantId}`] || ""}
                       onChange={(e) =>
                         handleInputChange(tableId, plantId, e.target.value)
                       }
                       disabled={!isActive}
                       maxLength={6}
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

export default absentessiem