import React, { useState } from 'react'
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Card, Typography } from "@material-tailwind/react";
import Swal from 'sweetalert2';
import { createPlant } from '../../api/manning.api';


function form_plant() {
    const [open, setOpen] = useState(false);
    const handleOpen = () =>  setOpen(!open);
    const [plantId, setPlantId] = useState("");
    const [plantCode, setPlantCode] = useState("");
    const [country, setCountry] = useState("");
    const [plantDescription, setPlantDescription] = useState("");
    const [rooms, setRooms] = useState("");

    const handlePlantIdChange = (e: any) => {
      const numericRegex = /^[0-9]*$/;
      const selectedPlantId = e.target.value;

      if (numericRegex.test(selectedPlantId)) {
        setPlantId(selectedPlantId);
      }
      
    };

     const handlePlantCodeChange = (e:any) => {    
      const selectedPlantCode = (e.target.value);
      const mayusSelectedPlantCode = selectedPlantCode.toUpperCase();
      setPlantCode(mayusSelectedPlantCode);
     }

     const handleCountryChange = (e:any) => { 
      const selectedCountry = (e.target.value);
      setCountry(selectedCountry);
     }

     const handlePlantDescriptionChange = (e:any) => { 
      const selectedPlantDescription = (e.target.value);
      setPlantDescription(selectedPlantDescription);
     }

     const handleRoomsChange = (e:any) => { 
      const numericRegex = /^[0-9]*$/;
      const selectedRoom = (e.target.value);
      if (numericRegex.test(selectedRoom)) {
        setRooms(selectedRoom);
      }
    }

     const CreateData = () => {
      handleOpen()
      try {
        if(country && plantId && plantCode && plantDescription && rooms){
          
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Save changes",
          }).then(async result => {
            if (result.isConfirmed) {
              // Lógica para manejar la confirmación
              Swal.fire({
                title: "You make a new request",
                text: "Your request will be checked by an administrator.",
                icon: "success",
              });

              try {
                await createPlant(country, plantId, plantCode, plantDescription, rooms)
                setCountry("") 
                setPlantId("")
                setPlantCode("")
                setPlantDescription("")
                setRooms("")
              } catch (error) {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong! Try again",
                });
              }

            }
          });
        } else{
          Swal.fire({
            title: "Insuficient data.",
            text: "You need to type correct information in all inputs",
            icon: "error",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Get it!",
          })
        }
      
        // setLocation("")
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
        Add Plant
      </p>

      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader className="">Plant Form </DialogHeader>

        <DialogBody className='pr-6 pl-6'>
          <div className="bg-gray-50 p-6 pt-8 pb-8 rounded-md shadow-md ">
            <div className="flex pb-6 gap-2">
              <div className="w-1/3">
                <p className='pb-2'>SAP Code:</p>
                
                <input
                  type="text"
                  className="border border-gray-400 rounded-lg pl-2 w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                  [&::-webkit-inner-spin-button]:appearance-none"
                  onChange={handlePlantIdChange}
                  value={(plantId)}
                  maxLength={4}
                />
                
              </div>
              <div className="w-1/3">
                <p className='pb-2'>Plant Code:</p>
                <input
                  type="text"
                  className="border border-gray-400 rounded-lg pl-2 w-full"
                  onChange={handlePlantCodeChange}
                  value={plantCode}
                  maxLength={4}
                />
              </div>
              <div className="w-1/3">
                <p className='pb-2'>Country:</p>
                <input
                  type="text"
                  className="w-full border border-gray-400 rounded-lg pl-2 w-full"
                  onChange={handleCountryChange}
                  value={country}
                  maxLength={30}
                />
              </div>
            </div>

            <div>
              <div className="flex pb-6">
                <div className="w-1/3">
                  <p>Plant Description:</p>
                </div>
                <div className="w-2/3">
                  <input
                    type="text"
                    className="w-full border border-gray-400 rounded-lg pl-2"
                    onChange={handlePlantDescriptionChange}
                    value={plantDescription}
                    maxLength={25}
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex">
                <div className="w-1/3">
                  <p>Rooms:</p>
                </div>
                <div className="w-2/3">
                <input type="text"   
                onChange={handleRoomsChange}
                maxLength={4}
                    value={(rooms)} className=' w-full border border-gray-400 rounded-lg pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                    [&::-webkit-inner-spin-button]:appearance-none'/>
                </div>
              </div>
            </div>
            
          </div>
        </DialogBody>

        <DialogFooter>
          <div className="pr-8 mb-1">
            <Button className='bg-colorRoyalton' onClick={CreateData}>Add Location</Button>
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default form_plant