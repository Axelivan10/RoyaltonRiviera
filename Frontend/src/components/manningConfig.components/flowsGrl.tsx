import { Card, Radio, Typography } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { getRelationsFlowsGrlConfig, getRelationsFlowsRestConfig, getRelationsSizeCriteriaConfig, updateFlowsGrlConfig, updateFlowsRestConfig, updateSizeCriteriaConfig } from '../../api/manning.api';
import Swal from 'sweetalert2';

const TABLE_HEAD = ["Position ID", "Position", "Division", "Division Code","Department","Department Code",
 "Parameter", "20-30", "30-40", "40-50", "50-60", "60-70", "70-80", "80-90", "90-100", "Rate", /*"Custom"*/ ];
  
  interface relationsAll {
    id: number;
    positionID:string;
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
    parameter:{
      parameterId:number;
      parameter:string;
      },
    positiondim: {
      positionId: number;
      positionDescriptionES: string;
    };
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

function flowsGrl() {
    const [relationsFlowsGrl, setRelationsFlowsGrl] = useState<relationsAll[]>([]);
    const [initialValues, setinitialValues] = useState<relationsAll[]>([]);
    const [modifiedCurrentPositions, setModifiedCurrentPositions] = useState<relationsAll[]>([]);
    const [nullList, setNullList] = useState<relationsAll[]>([]);
    const [isActive, setIsActive] = useState(false);
    const [isActiveRadio, setIsActiveRadio] = useState<number | null>(0);

    useEffect(()=>{
      renderList()
    },[])

    useEffect(() => {
      const hasChanges = JSON.stringify(initialValues) !== JSON.stringify(relationsFlowsGrl);
      if (hasChanges) {
        setModifiedCurrentPositions(relationsFlowsGrl);
      }
      console.log(relationsFlowsGrl)
    }, [relationsFlowsGrl]);  

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
            setinitialValues(relationsFlowsGrl)
          } else {
            setRelationsFlowsGrl(initialValues)
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
          const responseRelationsFlowsGrlConfig = await getRelationsFlowsGrlConfig();
          setRelationsFlowsGrl(responseRelationsFlowsGrlConfig.data)
          setinitialValues(responseRelationsFlowsGrlConfig.data)
          console.log(responseRelationsFlowsGrlConfig.data)
        } catch {
        throw new Error("Render Fail");
      }
    };

    const activeInputs = () => {
      setIsActive(!isActive);
    };

    const handleInputChange = (id: number, value: string, property: string) => {
      
      // if (property === 'radio') {
      //   setIsActiveRadio((prevSelectedRadio) =>
      //     prevSelectedRadio === id ? null : id
      //   );
      //   setIsActive(true)
      // }
      //else

       if (!isNaN(Number(value))) { 
        //|| (value === "custom" && property === "rate")
        const numberValue = Number(value);
    
        setRelationsFlowsGrl((prevRelations) =>
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
    
    const updateData = () => {
      try {
        updateFlowsGrlConfig(relationsFlowsGrl);
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
                  head === "Position"
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
            {relationsFlowsGrl.map(
              ({
                id,
                positionID,
                department,
                division,
                parameter,
                positiondim,
              }) => (
                <tr key={id}>
                  <td className="bg-white p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {positionID}
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
                      {parameter.parameter}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={
                        relationsFlowsGrl.find((relation) => relation.id === id)
                          ?.twenty
                      }
                      onChange={(e) =>
                        handleInputChange(id, e.target.value, "twenty")
                      }
                      disabled={true}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={
                        relationsFlowsGrl.find((relation) => relation.id === id)
                          ?.thirty
                      }
                      onChange={(e) =>
                        handleInputChange(id, e.target.value, "thirty")
                      }
                      disabled={true}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={
                        relationsFlowsGrl.find((relation) => relation.id === id)
                          ?.forty
                      }
                      onChange={(e) =>
                        handleInputChange(id, e.target.value, "forty")
                      }
                      disabled={true}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={
                        relationsFlowsGrl.find((relation) => relation.id === id)
                          ?.fifty
                      }
                      onChange={(e) =>
                        handleInputChange(id, e.target.value, "fifty")
                      }
                      disabled={true}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={
                        relationsFlowsGrl.find((relation) => relation.id === id)
                          ?.sixty
                      }
                      onChange={(e) =>
                        handleInputChange(id, e.target.value, "sixty")
                      }
                      disabled={true}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={
                        relationsFlowsGrl.find((relation) => relation.id === id)
                          ?.seventy
                      }
                      onChange={(e) =>
                        handleInputChange(id, e.target.value, "seventy")
                      }
                      disabled={true}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={
                        relationsFlowsGrl.find((relation) => relation.id === id)
                          ?.eighty
                      }
                      onChange={(e) =>
                        handleInputChange(id, e.target.value, "eighty")
                      }
                      disabled={true}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={
                        relationsFlowsGrl.find((relation) => relation.id === id)
                          ?.ninety
                      }
                      onChange={(e) =>
                        handleInputChange(id, e.target.value, "ninety")
                      }
                      disabled={!isActive}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={
                        relationsFlowsGrl.find((relation) => relation.id === id)
                          ?.rate
                      }
                      onChange={(e) =>
                        handleInputChange(id, e.target.value, "rate")
                      }
                      disabled={!isActive}
                      maxLength={3}
                    />
                  </td>
                  {/* <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="radio"
                      name="type"
                      checked={isActiveRadio === id}
                      onChange={(e) =>
                        handleInputChange(id, e.target.value, "radio")
                      }
                    />
                  </td> */}
                </tr>
              )
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
export default flowsGrl

