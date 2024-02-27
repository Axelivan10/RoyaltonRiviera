import { Card, Typography } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { getRelationsAdaptedHConfig, getRelationsSizeCriteriaConfig, updateAdaptedHConfig, updateSizeCriteriaConfig } from '../../api/manning.api';
import Swal from 'sweetalert2';

const TABLE_HEAD = ["Plant", "Position Id" ,"Position", "Area Code", "Description", "Service type", "WorkSt", "01AM", "02MID", "03PM", "04LT",];
  
  interface relationsAll {
    id: number;
    serviceType: {
      serviceTypeId: number;
      serviceTypeCode: string;
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
    positiondim: {
      positionId: number;
      positionDescriptionES: string;
    },
    am: string;
    mid: number;
    pm: number;
    lt: number;
    workSt: number;
  }

function adaptedH() {
  const [relationsAdaptedH, setRelationsAdaptedH] = useState<relationsAll[]>([]);
  const [initialValues, setinitialValues] = useState<relationsAll[]>([]);
  const [modifiedCurrentPositions, setModifiedCurrentPositions] = useState<relationsAll[]>([]);
  const [nullList, setNullList] = useState<relationsAll[]>([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(()=>{
    renderList()
  },[])

  useEffect(() => {
    const hasChanges = JSON.stringify(initialValues) !== JSON.stringify(relationsAdaptedH);
    if (hasChanges) {
      setModifiedCurrentPositions(relationsAdaptedH);
    }
    console.log(relationsAdaptedH)
  }, [relationsAdaptedH]);  

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
          setinitialValues(relationsAdaptedH)
        } else {
          setRelationsAdaptedH(initialValues)
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
        const responseRelationsAdaptedHConfig = await getRelationsAdaptedHConfig();
        setRelationsAdaptedH(responseRelationsAdaptedHConfig.data)
        setinitialValues(responseRelationsAdaptedHConfig.data)
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
      setRelationsAdaptedH((prevRelations) =>
        prevRelations.map((relation) =>
          relation.id === id ? { ...relation, [property]: numberValue || 0 } : relation
        )
      );
    }
  };
  
  const updateData = () => {
    try {
      updateAdaptedHConfig(relationsAdaptedH);
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
                    head === "Plant"
                      ? "text-center sticky top-0 left-0 z-50 bg-blue-gray-50 p-4 border-b border-blue-gray-100"
                      : head === "Position"
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
            {relationsAdaptedH.map(
              ({ id, plant, positiondim, location, serviceType}) => (
                <tr key={id}>
                  <td className="sticky left-0 top-0 bg-white p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {plant.plantCode}
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
                  <td className="sticky left-20 top-0 bg-white p-4 border-b border-blue-gray-50">
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
                      {serviceType.serviceTypeCode}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={relationsAdaptedH.find((relation) => relation.id === id)?.workSt || ''}
                      onChange={(e) => handleInputChange(id, e.target.value, 'workSt')}
                      disabled={!isActive}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={relationsAdaptedH.find((relation) => relation.id === id)?.am || ''}
                      onChange={(e) => handleInputChange(id, e.target.value, 'am')}
                      disabled={!isActive}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={relationsAdaptedH.find((relation) => relation.id === id)?.mid || ''}
                      onChange={(e) => handleInputChange(id, e.target.value, 'mid')}
                      disabled={!isActive}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={relationsAdaptedH.find((relation) => relation.id === id)?.pm || ''}
                      onChange={(e) => handleInputChange(id, e.target.value, 'pm')}
                      disabled={!isActive}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={ (relationsAdaptedH.find((relation) => relation.id === id)?.lt || '') }
                      onChange={(e) => handleInputChange(id, e.target.value, 'lt')}
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

export default adaptedH