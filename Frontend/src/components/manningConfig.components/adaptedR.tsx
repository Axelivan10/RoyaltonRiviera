import { Card, Typography } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { getRelationsAdaptedHConfig, getRelationsAdaptedRConfig, updateAdaptedHConfig, updateAdaptedRConfig, updateSizeCriteriaConfig } from '../../api/manning.api';
import Swal from 'sweetalert2';

const TABLE_HEAD = ["Div Bis", "Div Bis Code" ,"Deptm Bis", "Deptm Bis Code", "Position Id", "Positions", "Shift", "Service Type", "Parameter", "Criteria", "Xs", "S", "M", "L", "Xl"];
  
  interface relationsAll {
    id: number;
    serviceType: {
      serviceTypeId: number;
      serviceTypeCode: string;
    },
    positiondim: {
      positionId: number;
      positionDescriptionES: string;
    },
    department: {
      id: number;
      deptmBis: string;
      deptmBisCode:string;
      divBis:string
    },
    division: {
      id: number;
      divBis: string;
      divBisCode:string;
    },
    shift: {
      id: number;
      shift: string;
    },
    parameter:{
      parameterId:number;
      parameter:string;
      },
    xs:number,
    s:number,
    m:number,
    l:number,
    xl:number,
    criteria: number;
  }

function adaptedR() {
  const [relationsAdaptedR, setRelationsAdaptedR] = useState<relationsAll[]>([]);
  const [initialValues, setinitialValues] = useState<relationsAll[]>([]);
  const [modifiedCurrentPositions, setModifiedCurrentPositions] = useState<relationsAll[]>([]);
  const [nullList, setNullList] = useState<relationsAll[]>([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(()=>{
    renderList()
  },[])

  useEffect(() => {
    const hasChanges = JSON.stringify(initialValues) !== JSON.stringify(relationsAdaptedR);
    if (hasChanges) {
      setModifiedCurrentPositions(relationsAdaptedR);
    }
    console.log(relationsAdaptedR)
  }, [relationsAdaptedR]);  

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
          setinitialValues(relationsAdaptedR)
        } else {
          setRelationsAdaptedR(initialValues)
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
        const responseRelationsAdaptedRConfig = await getRelationsAdaptedRConfig();
        setRelationsAdaptedR(responseRelationsAdaptedRConfig.data)
        setinitialValues(responseRelationsAdaptedRConfig.data)
      } catch {
      throw new Error("Render Fail");
    }
  };

  const activeInputs = () => {
    setIsActive(!isActive);
  };

  const handleInputChange = ( id: number, value:string, property: string ) => {
    if(!isNaN(Number(value))){
      const numberValue = Number(value);  
      setRelationsAdaptedR((prevRelations) =>
        prevRelations.map((relation) =>
          relation.id === id ? { ...relation, [property]: numberValue || 0 } : relation
        )
      );
    }
  };
  
  const updateData = () => {
    try {
      updateAdaptedRConfig(relationsAdaptedR);
    } catch (error) {
      throw new Error("Send Information Fail");
    }
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
                    head === "Positions"
                      ? "text-center sticky top-0 left-0 z-50 bg-blue-gray-50 p-4 border-b border-blue-gray-100"
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
            {relationsAdaptedR.map(
              ({ id, department, division, parameter, shift, positiondim, serviceType, criteria}) => (
                <tr key={id}>
                  <td className="bg-white p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {division.divBis}
                    </Typography>
                  </td>
                  <td className="bg-white p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {division.divBisCode}
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
                      {department.deptmBisCode}
                    </Typography>
                  </td>
                  <td className="bg-white p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {positiondim.positionId}
                    </Typography>
                  </td>
                  <td className="sticky left-0 top-0 bg-white p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {positiondim.positionDescriptionES}
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
                      {parameter.parameter}
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
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={relationsAdaptedR.find((relation) => relation.id === id)?.xs || ''}
                      onChange={(e) => handleInputChange(id, e.target.value, 'xs')}
                      disabled={!isActive}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={relationsAdaptedR.find((relation) => relation.id === id)?.s || ''}
                      onChange={(e) => handleInputChange(id, e.target.value, 's')}
                      disabled={!isActive}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={relationsAdaptedR.find((relation) => relation.id === id)?.m || ''}
                      onChange={(e) => handleInputChange(id, e.target.value, 'm')}
                      disabled={!isActive}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={relationsAdaptedR.find((relation) => relation.id === id)?.l || ''}
                      onChange={(e) => handleInputChange(id, e.target.value, 'l')}
                      disabled={!isActive}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={ (relationsAdaptedR.find((relation) => relation.id === id)?.xl || '') }
                      onChange={(e) => handleInputChange(id, e.target.value, 'xl')}
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

export default adaptedR