import { Card, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { getDepartment, getDivision, getHotels, getRelationsStandardTableConfig, getShift, getShiftConfig, getrelationsPosLocConfig, relationsShiftConfig, updatePosLocConfig, updateShiftConfig, updateStandardTableConfig } from '../../api/manning.api';
import Swal from 'sweetalert2';

const TABLE_HEAD = ["Position ID", "Position" , "Division", "Department", "Level", "Shift", "Criteria", "Service Type", "Parameter", "Ratio" ];
const TABLE_HEAD_FIELDS = [
    {id: 1, value: "XS"},
    {id: 2, value: "S"},
    {id: 3, value: "M"},
    {id: 4, value: "L"},
    {id: 5, value: "XL"},
    {id: 6, value: "STD"},
    {id: 7, value: "Ratio"},
    {id: 8, value: "Other"},
    {id: 9, value: "KIT"},
    {id: 10, value: "Cover"},
    {id: 11, value: "Rev"}
]

interface relationsAll {
  id: number;
  deparment: {
    id: number;
    deptmBis: string;
    divBis:string
  };
  dimPosition: {
    positionId: number;
    positionDescriptionES: string;
  };
  serviceType: {
    serviceTypeId: number;
    serviceTypeCode: string;
  };
  shift: {
    shiftId: number;
    shift: string;
  };
  division: {
    divBis: string;
    id: number;
  };
  parameter:{
    parameterId:number;
    parameter:string;
    };

  level:string;
  ratio:number;
  criteria:string;
  xs:number;
  x:number;
  m:number;
  l:number;
  xl:number;
  std:string;
  rt:string;
  other:string;
  kit:string;
  cubre:string;
  rev:string;
}


function standardTable() {
  const [plants, setPlants] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [plantt, setPlantt] = useState("");
  const [division, setDivision] = useState("");
  const [country, setCountry] = useState("");
  const [departmentt, setDepartmentt] = useState("");

  const [relationsStandardTable, setRelationsStandardTable] = useState<relationsAll[]>([]);
  const [initialValues, setinitialValues] = useState<relationsAll[]>([]);
  const [modifiedCurrentPositions, setModifiedCurrentPositions] = useState<relationsAll[]>([]);
  const [nullList, setNullList] = useState<relationsAll[]>([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    renderList();
  }, []);

  useEffect(() => {
    const hasChanges =
      JSON.stringify(initialValues) !== JSON.stringify(relationsStandardTable);
    if (hasChanges) {
      setModifiedCurrentPositions(relationsStandardTable);
    }
    console.log(relationsStandardTable);
  }, [relationsStandardTable]);

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
      }).then((result) => {
        if (result.isConfirmed) {
          // Lógica para manejar la confirmación
          Swal.fire({
            title: "You make a new request",
            text: "Your request will be checked by an administrator.",
            icon: "success",
          });
          updateData();
          setinitialValues(relationsStandardTable);
        } else {
          setRelationsStandardTable(initialValues);
        }
      });
    } else {
      // Lógica para manejar cuando no hay posiciones modificadas o isActive está activado
      console.log("No hay posiciones modificadas o isActive está activado");
    }
    setModifiedCurrentPositions(nullList);
  }, [isActive]);

  const activeInputs = () => {
    setIsActive(!isActive);
  };

  const handleInputChangeNumber = (id: number, value: string, property: string) => {
    if (!isNaN(Number(value))) {
      const numberValue = Number(value);
      setRelationsStandardTable((prevRelations) =>
        prevRelations.map((relation) =>
          relation.id === id
            ? { ...relation, [property]: numberValue || 0 }
            : relation
        )
      );
    }
  };

  const handleInputChangeString = (id: number, value: string, property: string) => {0 
    if (value === "x" || value.toLowerCase() === "") {
      const stringValue = value;
      setRelationsStandardTable((prevRelations) =>
        prevRelations.map((relation) =>
          relation.id === id
            ? { ...relation, [property]: stringValue || "" }
            : relation
        )
      );
    }
  };

  const updateData = () => {
    try {
      updateStandardTableConfig(relationsStandardTable);
    } catch (error) {
      throw new Error("Send Information Fail");
    }
  };

  const renderList = async () => {
    try {
      const responseDepartment = await getDepartment();
      setDepartments(responseDepartment.data);

      const responsePlant = await getHotels();
      setPlants(responsePlant.data);
      // console.log(responsePlant.data)

      const responseDivision = await getDivision();
      setDivisions(responseDivision.data);

      const responseShift = await getShift();
      setShifts(responseShift.data);
      // console.log(responseShift.data)

      const responseRelationsStandardTableConfig =
        await getRelationsStandardTableConfig();
      setRelationsStandardTable(responseRelationsStandardTableConfig.data);
      setinitialValues(responseRelationsStandardTableConfig.data);
    } catch {
      throw new Error("Render Fail");
    }
  };

  const handleDivisionChange = (e: any) => {
    const selectedDivision = e.target.value;
    e.target.value == "" ? setDivision("") : setDivision(selectedDivision);
    setDepartmentt("");
  };

  const handleDepartmentChange = (e: any) => {
    const selectedDepartment = e.target.value;
    e.target.value == ""
      ? setDepartmentt("")
      : setDepartmentt(selectedDepartment);
  };

  const handleCountryChange = (e: any) => {
    const selectedCountry = e.target.value;
    e.target.value === "" ? setCountry("") : setCountry(selectedCountry);
    setPlantt("");
  };

  const handleHotelChange = (e: any) => {
    const selectedHotel = e.target.value;
    e.target.value == "" ? setPlantt("") : setPlantt(selectedHotel);
  };

  const filteredData = relationsStandardTable
    .filter(({ deparment }) => deparment.divBis === division || division === "")
    .filter(
      ({ deparment }) =>
        deparment.deptmBis === departmentt || departmentt === ""
    );
  // .filter(({ plant }) => plant.plantCode === plantt || plantt === "")
  // .filter(({ plant }) => plant.countryCode === country || country === "")

  const filteredDepartments = departments.filter(
    ({ divBis }) => !division || divBis === division
  );

  const filteredHotels = plants.filter(
    ({ countryCode }) => !country || countryCode === country
  );

  return (
    <div className="flex flex-col h-screen w-screen md:p-6 p-2 xl:w-10/12 xl:pl-20 pt-10">
  
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
            {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className={
                    head === "Position"
                      ? "sticky top-0 left-0 z-50 bg-blue-gray-50 p-4 border-b border-blue-gray-100"
                      : "sticky top-0 left-0 border-b border-blue-gray-100 bg-blue-gray-50 p-4"
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
               {TABLE_HEAD_FIELDS.map((head) => (
                <th
                  key={head.value}
                  className={"sticky top-0 left-0 border-b border-blue-gray-100 bg-blue-gray-50 p-4"}
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="text-center font-normal leading-none opacity-70"
                  >
                    {head.value}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map(
              ({id, dimPosition, division, deparment, level, shift, criteria, serviceType, parameter, ratio, }) => (
                <tr key={id}>
                  <td className="sticky top-0 left-0 bg-white p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                       {dimPosition.positionId}
                    </Typography>
                  </td>
                  <td className="sticky left-0 top-0 bg-white p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {dimPosition.positionDescriptionES}
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
                      {deparment.deptmBis}
                    </Typography>
                  </td>
                  <td className="bg-white p-4 border-b border-blue-gray-50">
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
                      {shift.shift}
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
                      {parameter.parameter}
                    </Typography>
                  </td>
                  <td className="bg-white p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {ratio}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={relationsStandardTable.find((relation) => relation.id === id)?.xs || 0}
                      onChange={(e) => handleInputChangeNumber(id, e.target.value, 'xs')}
                      disabled={!isActive}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={relationsStandardTable.find((relation) => relation.id === id)?.x || 0}
                      onChange={(e) => handleInputChangeNumber(id, e.target.value, 'x')}
                      disabled={!isActive}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={relationsStandardTable.find((relation) => relation.id === id)?.m || 0}
                      onChange={(e) => handleInputChangeNumber(id, e.target.value, 'm')}
                      disabled={!isActive}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={relationsStandardTable.find((relation) => relation.id === id)?.l || 0}
                      onChange={(e) => handleInputChangeNumber(id, e.target.value, 'l')}
                      disabled={!isActive}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={ (relationsStandardTable.find((relation) => relation.id === id)?.xl || 0) }
                      onChange={(e) => handleInputChangeNumber(id, e.target.value, 'xl')}
                      disabled={!isActive}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={ (relationsStandardTable.find((relation) => relation.id === id)?.std || '') }
                      onChange={(e) => handleInputChangeString(id, e.target.value, 'std')}
                      disabled={!isActive}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={ (relationsStandardTable.find((relation) => relation.id === id)?.rt || '') }
                      onChange={(e) => handleInputChangeString(id, e.target.value, 'rt')}
                      disabled={!isActive}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={ (relationsStandardTable.find((relation) => relation.id === id)?.other || '') }
                      onChange={(e) => handleInputChangeString(id, e.target.value, 'other')}
                      disabled={!isActive}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={ (relationsStandardTable.find((relation) => relation.id === id)?.kit || '') }
                      onChange={(e) => handleInputChangeString(id, e.target.value, 'kit')}
                      disabled={!isActive}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={ (relationsStandardTable.find((relation) => relation.id === id)?.cubre || '') }
                      onChange={(e) => handleInputChangeString(id, e.target.value, 'cubre')}
                      disabled={!isActive}
                      maxLength={3}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      type="text"
                      className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                      style={{ maxWidth: "100px" }}
                      value={ (relationsStandardTable.find((relation) => relation.id === id)?.rev || '') }
                      onChange={(e) => handleInputChangeString(id, e.target.value, 'rev')}
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

export default standardTable