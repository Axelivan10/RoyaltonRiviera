import { Card, Typography } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { getRelationsFlowsRestConfig, getRelationsSizeCriteriaConfig, updateFlowsRestConfig, updateSizeCriteriaConfig } from '../../api/manning.api';
import Swal from 'sweetalert2';

const TABLE_HEAD = ["Plant ID", "Location" ,"Outlet", "Department", "Criteria", "Service Type", "Capacity", "Shift", "20-30", "30-40", "40-50", "50-60",, "60-70", "70-80", "80-90", "90-100", "Rate" ];
  
  interface relationsAll {
    id: number;
    department: {
      id: number;
      deptmBis: string;
      divBis:string
    },
    location: {
      id: number;
      area: string;
      areaCode:string;
    },
    plant: {
      id: number;
      countryCode: string;
      plantCode: string;
      plantDescription: string;
    },
    shift: {
      id: number;
      shift: string;
    },
    serviceType: {
      serviceTypeId: number;
      serviceTypeCode: string;
    },
    capacity: number;
    criteria: string;
    rate: number; 
    twenty: number;
    thirty: number;
    forty: number;
    fifty: number;
    sixty: number;
    seventy: number;
    eighty: number;
    ninety: number; 
  }

function flowsRest() {
  const [relationsFlowsRest, setRelationsFlowsRest] = useState<relationsAll[]>([]);
    const [initialValues, setinitialValues] = useState<relationsAll[]>([]);
    const [modifiedCurrentPositions, setModifiedCurrentPositions] = useState<relationsAll[]>([]);
    const [nullList, setNullList] = useState<relationsAll[]>([]);
    const [isActive, setIsActive] = useState(false);

    useEffect(()=>{
      renderList()
    },[])

    useEffect(() => {
      const hasChanges = JSON.stringify(initialValues) !== JSON.stringify(relationsFlowsRest);
      if (hasChanges) {
        setModifiedCurrentPositions(relationsFlowsRest);
      }
      console.log(relationsFlowsRest)
    }, [relationsFlowsRest]);  

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
            setinitialValues(relationsFlowsRest)
          } else {
            setRelationsFlowsRest(initialValues)
          }
        });
      } else {
        // Lógica para manejar cuando no hay posiciones modificadas o isActive está activado
        console.log("No hay posiciones modificadas o isActive está activado");
      }
      setModifiedCurrentPositions(nullList)
    }, [isActive, ]);

    const renderList = async () => {
      try {
          const responseRelationsFlowsRestConfig = await getRelationsFlowsRestConfig();
          setRelationsFlowsRest(responseRelationsFlowsRestConfig.data)
          setinitialValues(responseRelationsFlowsRestConfig.data)
          // console.log(responseRelationsFlowsRestConfig.data)
        } catch {
        throw new Error("Render Fail");
      }
    };

    const activeInputs = () => {
      setIsActive(!isActive);
    };

    const handleInputChange = (id: number, value: string, property: string) => {
      if (!isNaN(Number(value))) {
        const numberValue = Number(value);
    
        setRelationsFlowsRest((prevRelations) =>
          prevRelations.map((item) => {
            if (item.id === id) {
              const updatedRelation = { ...item, [property]: numberValue || 0 };
//probar if mañana 
              updatedRelation.eighty = (updatedRelation.ninety || 0) - updatedRelation.rate;
              updatedRelation.seventy = (updatedRelation.eighty || 0) - updatedRelation.rate;
              updatedRelation.sixty = (updatedRelation.seventy || 0) - updatedRelation.rate;
              updatedRelation.fifty = (updatedRelation.sixty || 0) - updatedRelation.rate;
              updatedRelation.forty = (updatedRelation.fifty || 0) - updatedRelation.rate;
              updatedRelation.thirty = (updatedRelation.forty || 0) - updatedRelation.rate;
              updatedRelation.twenty = (updatedRelation.thirty || 0) - updatedRelation.rate;

              return updatedRelation;
            }
    
            return item;
          })
        );
      }
    };
    
    // const handleInputChange = ( id: number, value:string, property: string ) => {
    //   if(!isNaN(Number(value))){
    //     const numberValue = Number(value);  
    //     setRelationsSizeCriteria((prevRelations) =>
    //       prevRelations.map((relation) =>
    //         relation.id === id ? { ...relation, [property]: numberValue || 0 } : relation
    //       )
    //     );
    //   }
    // };

    const updateData = () => {
      try {
        updateFlowsRestConfig(relationsFlowsRest);
      } catch (error) {
        throw new Error("Send Information Fail");
      }
      // setCheck(generateAutoIncrementId);
    };

  return (
    <div className="flex flex-col h-screen w-screen md:p-6 p-2 xl:w-10/12 xl:pl-20 pt-10">
  
    <div className="flex flex-col-1 gap-8 ml-auto pr-4 pt-0.5 justify-end p-4 pb-6">
  
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
  
      <Card
        className="h-full w-full overflow-scroll"
        style={{ maxHeight: "670px" }}
      >
        <table className="w-full min-w-max table-auto text-left ">
          <thead className="bg-white">
          {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className={
                    head === "Location"
                      ? "text-center sticky top-0 left-0 z-50 bg-blue-gray-50 p-4 border-b border-blue-gray-100"
                      : head === "Parameter"
                        ? "text-center sticky top-0 left-20 z-50 bg-blue-gray-50 p-4 border-b border-blue-gray-100"
                        : "text-center sticky top-0 border-b border-blue-gray-100 bg-blue-gray-50 p-4"
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
          </thead>
          <tbody>
            {relationsFlowsRest.map(
              ({ id, department, location, plant, shift, criteria, serviceType, capacity, rate }) => (
                <tr key={id}>
                  <td className="bg-white p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {plant.plantCode}
                    </Typography>
                  </td>
                  <td className="sticky left-0 top-0 bg-white p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {location.area}
                    </Typography>
                  </td>
                  <td className="bg-white p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {location.areaCode}
                    </Typography>
                  </td>
                  <td className="bg-white p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {department.deptmBis}
                    </Typography>
                  </td>
                  <td className="bg-white p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {criteria}
                    </Typography>
                  </td>
                  <td className="bg-white p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {serviceType.serviceTypeCode}
                    </Typography>
                  </td>
                  <td className="bg-white p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {capacity}
                    </Typography>
                  </td>
                  <td className="bg-white p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {shift.shift}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={relationsFlowsRest.find((relation) => relation.id === id)?.twenty}
                      onChange={(e) => handleInputChange(id, e.target.value, 'twenty')}
                      disabled={true}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={relationsFlowsRest.find((relation) => relation.id === id)?.thirty}
                      onChange={(e) => handleInputChange(id, e.target.value, 'thirty')}
                      disabled={true}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={relationsFlowsRest.find((relation) => relation.id === id)?.forty}
                      onChange={(e) => handleInputChange(id, e.target.value, 'forty')}
                      disabled={true}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={relationsFlowsRest.find((relation) => relation.id === id)?.fifty}
                      onChange={(e) => handleInputChange(id, e.target.value, 'fifty')}
                      disabled={true}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={ (relationsFlowsRest.find((relation) => relation.id === id)?.sixty) }
                      onChange={(e) => handleInputChange(id, e.target.value, 'sixty')}
                      disabled={true}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={relationsFlowsRest.find((relation) => relation.id === id)?.seventy}
                      onChange={(e) => handleInputChange(id, e.target.value, 'seventy')}
                      disabled={true}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={ (relationsFlowsRest.find((relation) => relation.id === id)?.eighty) }
                      onChange={(e) => handleInputChange(id, e.target.value, 'eighty')}
                      disabled={true}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={relationsFlowsRest.find((relation) => relation.id === id)?.ninety}
                      onChange={(e) => handleInputChange(id, e.target.value, 'ninety')}
                      disabled={!isActive}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={relationsFlowsRest.find((relation) => relation.id === id)?.rate}
                      onChange={(e) => handleInputChange(id, e.target.value, 'rate')}
                      disabled={!isActive}
                      maxLength={3}
                    />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

export default flowsRest