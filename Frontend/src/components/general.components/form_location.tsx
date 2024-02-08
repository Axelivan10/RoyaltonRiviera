import React, { useEffect } from 'react'
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Card, Typography } from "@material-tailwind/react";
import { createLocation, getDepartment } from '../../api/manning.api';
import Swal from 'sweetalert2';

function form_location() {
    const [open, setOpen] = React.useState(false);
    const [departments, setDepartments] = React.useState([]);
    const [department, setDepartment] = React.useState("");
    const [dataToSend, setDataToSend] = React.useState({});
    const [location, setLocation] = React.useState("");

  useEffect( () => {
    renderList()
  },[])

  useEffect(() => {
    console.log(department);
    console.log(location);
  
    if (department !== "" && location !== "") {
        const dataLocation = {
          location: location,
          departmentId: Number(department)
        }
      console.log(dataLocation);
      setDataToSend(dataLocation);
    }
  }, [location, department]);

    const handleOpen = () =>  setOpen(!open);

    const renderList = async () => {
      try{
        const responseDepartment = await getDepartment();
        setDepartments(responseDepartment.data)
      }catch{
        throw new Error('Render Fail');
      }
    }

    const handleDepartmentChange = (e:any) => { 
     const selectedDepartment = (e.target.value); 
      if(e.target.value == ""){
        setDepartment("");
      } else{
        setDepartment(selectedDepartment);
      }
    }

    const handleLocationChange = (e:any) => { 
      const selectedLocation = (e.target.value);
        setLocation(selectedLocation);
     }


    const CreateData = () => {
      handleOpen()
      try {
        if(location){
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
              createLocation(dataToSend)
            }
          });
          setLocation("")
        } else{
          Swal.fire({
            title: "Insuficient data.",
            text: "You need to type correct information in all inputs",
            icon: "error",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Get it!",
          })
        }
        
    } catch (error) {
      throw new Error("Send Information Fail");
    }
      }

      return (
        <>
          <p
            onClick={handleOpen}
            className="cursor-pointer hover:text-colorRoyalton hover:font-semibold"
          >
            Add Location
          </p>

          <Dialog
            open={open}
            handler={handleOpen}
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0.9, y: -100 },
            }}
          >
            <DialogHeader className="">Add Location Form </DialogHeader>

            <DialogBody className="">
              <div className="bg-gray-50 p-4 rounded-md shadow-md pb-14">
                <table className="min-w-full">
                  <tbody>
                    <tr className="flex flex-col sm:flex-row gap-6">
                      <td className="w-full sm:w-1/3 mb-4 sm:mb-0">
                        <p className="text-lg text-center font-semibold p-2 md:pb-14 md:mb-0.5">
                          Location
                        </p>
                        <div className="text-center">
                          <input
                            type="text"
                            onChange={handleLocationChange}
                            value={location}
                            placeholder="Type your new Location"
                            className="border border-gray-400 focus:border-gray-300 focus:ring-gray-300 rounded-lg pl-4 pr-2 w-full h-10 placeholder-gray-900 text-sm"
                            maxLength={25}
                          />
                        </div>
                      </td>

                      <td className="w-full sm:w-1/3 mb-4 sm:mb-0">
                        <p className="text-lg text-center font-semibold p-2 md:pb-14">
                          Department
                        </p>
                        <select
                          className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full h-10 p-2.5"
                          onChange={handleDepartmentChange}
                          value={department}
                        >
                          <option value="">Select an option</option>
                          {departments.map(({ id, deptmBis, deptmBisCode }) => (
                            <option key={id} value={id}>
                              {deptmBis}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="w-full sm:w-1/3">
                        <p className="text-lg font-semibold text-center pb-4">
                          Approval
                        </p>
                        <table className="min-w-full bg-gray-50 border-b border-gray-300">
                          <thead>
                            <tr>
                              <th className="py-2 px-4">Direct Boss</th>
                              <th className="py-2 px-4">Admin</th>
                            </tr>
                          </thead>

                          <tbody>
                            <tr className="text-center border-t border-b border-gray-300">
                              <td className="py-2 px-4">x</td>
                              <td className="py-2 px-4"></td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </DialogBody>

            <DialogFooter>
              <div className="pr-8 mb-1">
                <Button className="bg-colorRoyalton" onClick={CreateData}>
                  Add Location
                </Button>
              </div>
            </DialogFooter>
          </Dialog>
        </>
      );
      
}

export default form_location