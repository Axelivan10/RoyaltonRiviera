import { Card, Typography } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { getRelationsAdaptedHConfig, getRelationsMasterRatiosConfig, getRelationsSizeCriteriaConfig, updateAdaptedHConfig, updateMasterRatiosConfig, updateSizeCriteriaConfig } from '../../api/manning.api';
import Swal from 'sweetalert2';
import standardTable from './standardTable';

const TABLE_HEAD = ["Position Id", "Position Description" ,"Div Bis", "Div Bis Code", "Deptm Bis", "Deptm Bis Code", "Service Type", "Parameter",
 "Ratio STD", "Mex", "JAM", "DOM", "Cri", "ATG", "LCA", "GRD", ];
  
  interface relationsAll {
    id: number;
    department: {
      id: number;
      deptmBisCode:string;
      deptmBis: string;
    },
    division: {
        divBisCode:string;
        divBis: string;
        id: number;
      },
    positiondim: {
      positionId: number;
      positionDescriptionES: string;
    },
    serviceType: {
      serviceTypeId: number;
      serviceTypeCode: string;
    },
    parameter:{
      parameterId:number;
      parameter:string;
      },
      standardTableConfig:{
        ratio:number;
    },
    mex: number,
    jam: number,
    dom: number,
    cri: number,
    atg: number,
    lca: number,
    grd: number,
  }
  
function masterRatios() {
    const [relationsMasterRatios, setRelationsMasterRatios] = useState<relationsAll[]>([]);
    const [initialValues, setinitialValues] = useState<relationsAll[]>([]);
    const [modifiedCurrentPositions, setModifiedCurrentPositions] = useState<relationsAll[]>([]);
    const [nullList, setNullList] = useState<relationsAll[]>([]);
    const [isActive, setIsActive] = useState(false);
  
    useEffect(()=>{
      renderList()
    },[])
  
    useEffect(() => {
      const hasChanges = JSON.stringify(initialValues) !== JSON.stringify(relationsMasterRatios);
      if (hasChanges) {
        setModifiedCurrentPositions(relationsMasterRatios);
      }
      console.log(relationsMasterRatios)
    }, [relationsMasterRatios]);  
  
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
            setinitialValues(relationsMasterRatios)
          } else {
            setRelationsMasterRatios(initialValues)
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
          const responseRelationsMasterRatiosConfig = await getRelationsMasterRatiosConfig();
          setRelationsMasterRatios(responseRelationsMasterRatiosConfig.data)
          setinitialValues(responseRelationsMasterRatiosConfig.data)
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
        setRelationsMasterRatios((prevRelations) =>
          prevRelations.map((relation) =>
            relation.id === id ? { ...relation, [property]: numberValue || 0 } : relation
          )
        );
      }
    };
    
    const updateData = () => {
      try {
        updateMasterRatiosConfig(relationsMasterRatios);
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
                    head === "Position Description"
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
            {relationsMasterRatios.map(
              ({ id, department, positiondim, parameter, division, serviceType, standardTableConfig }) => (
                <tr key={id}>
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
                      {standardTableConfig.ratio}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={relationsMasterRatios.find((relation) => relation.id === id)?.mex || ''}
                      onChange={(e) => handleInputChange(id, e.target.value, 'mex')}
                      disabled={!isActive}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={ (relationsMasterRatios.find((relation) => relation.id === id)?.jam || '') }
                      onChange={(e) => handleInputChange(id, e.target.value, 'jam')}
                      disabled={!isActive}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={relationsMasterRatios.find((relation) => relation.id === id)?.dom || ''}
                      onChange={(e) => handleInputChange(id, e.target.value, 'dom')}
                      disabled={!isActive}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={relationsMasterRatios.find((relation) => relation.id === id)?.cri || ''}
                      onChange={(e) => handleInputChange(id, e.target.value, 'cri')}
                      disabled={!isActive}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={relationsMasterRatios.find((relation) => relation.id === id)?.atg || ''}
                      onChange={(e) => handleInputChange(id, e.target.value, 'atg')}
                      disabled={!isActive}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={relationsMasterRatios.find((relation) => relation.id === id)?.lca || ''}
                      onChange={(e) => handleInputChange(id, e.target.value, 'lca')}
                      disabled={!isActive}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={relationsMasterRatios.find((relation) => relation.id === id)?.grd || ''}
                      onChange={(e) => handleInputChange(id, e.target.value, 'grd')}
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

export default masterRatios