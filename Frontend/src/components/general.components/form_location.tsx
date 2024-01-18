import React from 'react'
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Card, Typography } from "@material-tailwind/react";



function form_location(props:any) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () =>  setOpen(!open);

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
        <DialogHeader className=''>Add Location Form </DialogHeader>

        <DialogBody>
          <div className="bg-gray-50 p-4 rounded-md shadow-md">
            <div className="flex gap-x-6">
              
              <div className="w-1/3">
                <p className="text-lg text-center font-semibold pb-14 mb-1">Name Location</p>
                <table className="min-w-full bg-gray-50 border-t border-b border-gray-300">
                  <tbody>
                    <tr className='text-center border-t border-b border-gray-300'>
                      <td className="py-2 px-4 ">Name Area</td>
                      <td className="py-1 px-4"> <Button size="sm">Add</Button></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="w-1/3">
                <p className="text-lg text-center font-semibold pb-14 mb-1 ">Select Department</p>
                <table className="min-w-full bg-gray-50 border-t border-b border-gray-300">
                  <tbody>
                    <tr className='text-center border-t border-b border-gray-300'>
                      <td className="py-2 px-4 ">Name Department</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="w-1/3">
                <p className="text-lg font-semibold text-center pb-4">Aproval</p>
                <table className="min-w-full bg-gray-50 border-b border-gray-300">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 ">Direct Boss</th>
                      <th className="py-2 px-4 ">Admin</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                    <tr className='text-center border-t border-b border-gray-300'>
                      <td className="py-2 px-4 ">x</td>
                      <td className="py-2 px-4"></td>
                    </tr>
                  </tbody>

                </table>
              </div>

            </div>
          </div>
        </DialogBody>

        <DialogFooter>
          <div className="pr-2">
            Make sure to select locations with departments
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default form_location