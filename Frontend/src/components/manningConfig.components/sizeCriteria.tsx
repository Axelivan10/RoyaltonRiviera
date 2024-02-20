import { Card, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { getDepartment, getDivision, getHotels, getRelationsSizeCriteriaConfig, getShift, getShiftConfig, getrelationsPosLocConfig, relationsShiftConfig, updatePosLocConfig, updateShiftConfig, updateSizeCriteriaConfig } from '../../api/manning.api';
import Swal from 'sweetalert2';

const TABLE_HEAD = ["Size Criteria", "Parameter" ,"XS (min)", "XS (max)", "S (min)", "S (max)", "M (min)", "M (max)", "L (min)", "L (max)", "XL (min)", "XL (max)" ];

  interface InputValue {
    id: number;
    position: string;
    xSymbol: string;
    // locationId: number;
    // deparmentId: number;
  }
  
  interface relationsAll {
    id: number;
    parameter: {
      parameterId: number;
      parameter: string;
    }
    sizeCriteria: string;
    xSmallMinValue: number;
    xSmallMaxValue: number;
    smallMaxValue: number;
    smallMinValue: number;
    mediumMaxValue: number;
    mediumMinValue: number;
    largeMaxValue: number;
    largeMinValue: number;
    xlargeMaxValue: number; 
    xlargeMinValue: number;

  }

function sizeCriteria() {
    const [relationsSizeCriteria, setRelationsSizeCriteria] = useState<relationsAll[]>([]);
    const [initialValues, setinitialValues] = useState<relationsAll[]>([]);
    const [modifiedCurrentPositions, setModifiedCurrentPositions] = useState<relationsAll[]>([]);
    const [nullList, setNullList] = useState<relationsAll[]>([]);
    const [isActive, setIsActive] = useState(false);

    useEffect(()=>{
      renderList()
    },[])

    useEffect(() => {
      const hasChanges = JSON.stringify(initialValues) !== JSON.stringify(relationsSizeCriteria);
      if (hasChanges) {
        setModifiedCurrentPositions(relationsSizeCriteria);
      }
      console.log(relationsSizeCriteria)
    }, [relationsSizeCriteria]);  

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
            setinitialValues(relationsSizeCriteria)
          } else {
            setRelationsSizeCriteria(initialValues)
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
          const responseRelationsSizeCriteriaConfig = await getRelationsSizeCriteriaConfig();
          setRelationsSizeCriteria(responseRelationsSizeCriteriaConfig.data)
          setinitialValues(responseRelationsSizeCriteriaConfig.data)
          // console.log(responseRelationsSizeCriteriaConfig.data)
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
    
        setRelationsSizeCriteria((prevRelations) =>
          prevRelations.map((relation) => {
            if (relation.id === id) {

              const updatedRelation = { ...relation, [property]: numberValue || 0 };
  
              switch (property) {
                case 'smallMaxValue':
                  updatedRelation.mediumMinValue = (numberValue || 0) + 1;
                  break;
                case 'mediumMaxValue':
                  updatedRelation.largeMinValue = (numberValue || 0) + 1;
                  break;
                case 'largeMaxValue':
                  updatedRelation.xlargeMinValue = (numberValue || 0) + 1;
                  break;    
                default:
                  break;
              }
              return updatedRelation;
            }
    
            return relation;
          })
        );
      }
    };
    
    const updateData = () => {
      try {
        updateSizeCriteriaConfig(relationsSizeCriteria);
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
        style={{ maxHeight: "650px" }}
      >
        <table className="w-full min-w-max table-auto text-left ">
          <thead className="bg-white">
          {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className={
                    head === "Size Criteria"
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
            {relationsSizeCriteria.map(
              ({ id, sizeCriteria, parameter, xSmallMinValue, xSmallMaxValue, smallMaxValue, smallMinValue,
                mediumMaxValue, mediumMinValue, largeMaxValue, largeMinValue, xlargeMaxValue, xlargeMinValue}) => (
                <tr key={id}>
                  <td className="sticky left-0 top-0 bg-white p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {sizeCriteria}
                    </Typography>
                  </td>
                  <td className="sticky left-20 top-0 bg-white p-4 border-b border-blue-gray-50">
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
                      value={relationsSizeCriteria.find((relation) => relation.id === id)?.xSmallMinValue || ''}
                      onChange={(e) => handleInputChange(id, e.target.value, 'xSmallMinValue')}
                      disabled={true}
                      maxLength={5}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={relationsSizeCriteria.find((relation) => relation.id === id)?.xSmallMaxValue || ''}
                      onChange={(e) => handleInputChange(id, e.target.value, 'xSmallMaxValue')}
                      disabled={true}
                      maxLength={5}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={relationsSizeCriteria.find((relation) => relation.id === id)?.smallMinValue || ''}
                      onChange={(e) => handleInputChange(id, e.target.value, 'smallMinValue')}
                      disabled={!isActive}
                      maxLength={5}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={relationsSizeCriteria.find((relation) => relation.id === id)?.smallMaxValue || ''}
                      onChange={(e) => handleInputChange(id, e.target.value, 'smallMaxValue')}
                      disabled={!isActive}
                      maxLength={5}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={ (relationsSizeCriteria.find((relation) => relation.id === id)?.mediumMinValue || 0) }
                      onChange={(e) => handleInputChange(id, e.target.value, 'mediumMinValue')}
                      disabled={true}
                      maxLength={5}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={relationsSizeCriteria.find((relation) => relation.id === id)?.mediumMaxValue || ''}
                      onChange={(e) => handleInputChange(id, e.target.value, 'mediumMaxValue')}
                      disabled={!isActive}
                      maxLength={5}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={ (relationsSizeCriteria.find((relation) => relation.id === id)?.largeMinValue || 0) }
                      onChange={(e) => handleInputChange(id, e.target.value, 'largeMinValue')}
                      disabled={true}
                      maxLength={5}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={relationsSizeCriteria.find((relation) => relation.id === id)?.largeMaxValue || ''}
                      onChange={(e) => handleInputChange(id, e.target.value, 'largeMaxValue')}
                      disabled={!isActive}
                      maxLength={5}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={ (relationsSizeCriteria.find((relation) => relation.id === id)?.largeMaxValue || 0) + 1 }
                      onChange={(e) => handleInputChange(id, e.target.value, 'xlargeMinValue')}
                      disabled={true}
                      maxLength={5}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={relationsSizeCriteria.find((relation) => relation.id === id)?.xlargeMaxValue || ''}
                      onChange={(e) => handleInputChange(id, e.target.value, 'xlargeMaxValue')}
                      disabled={!isActive}
                      maxLength={5}
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

export default sizeCriteria