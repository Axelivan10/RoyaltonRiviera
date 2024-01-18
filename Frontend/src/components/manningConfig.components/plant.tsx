import React, { useState } from 'react'
import Form_location from '../general.components/form_location';
import { Card, Typography } from '@material-tailwind/react';
import { getDepartment } from '../../api/manning.api';


function plant() {
    const [divisionFilter, SetDivisionFilter] = useState([]);
    const [formDialog, setFormDialog] = useState(false);
    const [plant, setPlant] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [department, setDepartment] = useState("");
    const [division, setDivision] = useState("Admin");
    const [isActive, setIsActive] = useState(false);


    const renderList = async () => {
      try {
        //   const responseDepartment = await getLocation();
        //   setDepartments(responseDepartment.data)
        //   console.log(responseDepartment.data)
        //   const responsePlant = await getPlant();
        //   setPlant(responsePlant.data)
        //   // console.log(responsePlant.data)
        //   const divisionResponse = await getDivision();
        //   SetDivisionFilter(divisionResponse.data)
      } catch {
        throw new Error("Render Fail");
      }
    };

    const activeInputs = () => {
      setIsActive(!isActive);
    };

    const handleDivisionChance = (e: any) => {
      const selectedDivision = e.target.value;
      if (e.target.value == "") {
        setDivision("");
      } else {
        setDivision(selectedDivision);
      }
    };

    const filteredDepartments = departments.filter(
      ({ divBis }) => divBis === division || division === ""
    );


  return (
    <div className="h-screen lg:w-10/12 xl:w-11/12 w-full pr-4 pt-10 pl-10">
      
      <div className="flex flex-col-1 gap-8 ml-auto pr-4 pt-0.5 justify-end p-4">
        <div>
          <Form_location state={formDialog} />
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3 lg:gap-6 p-2 pb-8">
        <div className="w-full">
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

        <div className="w-full">
          <select
            className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5"
            onChange={handleDivisionChance}
            value={department}
          >
            <option value="">All Departments</option>
            {divisionFilter.map(({ id, divBis }) => (
              <option key={id} value={divBis}>
                {divBis}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Card
        className="h-full w-full overflow-scroll"
        style={{ maxHeight: "650px" }}
      >
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Location
                </Typography>
              </th>
              {filteredDepartments.map(({ id, deptmBis }) => (
                <th
                  key={id}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
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
            {/* {locations.map(({ id: locationId, area }) => (
            <tr key={locationId}>
              <td className="p-4 border-b border-blue-gray-50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {area}
                </Typography>
              </td>
              {filteredDepartments.map(({ id: departmentId }) => (
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
          ))} */}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export default plant