import { Button, Input } from "@material-tailwind/react";
import React from "react";

function addUsers() {
  return (
    <>
      <div className="lg:mx-auto lg:pt-24 md:pt-10 items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 mb-6 border border-colorRoyalton">
            <div className="text-gray-800 mb-8">
              <p className=" font-semibold font-large text-lg text-colorRoyalton transition-colors hover:text-colorHover">
                Add new User
              </p>
            </div>

            <div className="lg:col-span-2">
              <form className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <div className="flex flex-col md:flex-row md:col-span-5 mb-4 gap-y-1">
                  <div className="w-full md:w-1/2 pr-2">
                    <div className="flex flex-col items-end">
                      <Input
                        size="lg"
                        label="Nombre(s)"
                        required
                        crossOrigin={undefined}
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 pr-2">
                    <div className="flex flex-col items-end gap-6">
                      <Input
                        size="lg"
                        label="Apellido(s)"
                        required
                        crossOrigin={undefined}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:col-span-5 mb-2 gap-y-1">
                  <div className="w-full md:w-1/2 pr-2">
                    <Input
                      type="email"
                      label="Email"
                      crossOrigin={undefined}
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2 pr-2">
                    <div className="flex flex-col items-end gap-6">
                      <Input
                        label="Numero Telefonico"
                        crossOrigin={undefined}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:col-span-5 mt-2 gap-y-1">
                  <div className="w-full md:w-1/3 pr-2">
                    <Input label="Puesto" crossOrigin={undefined} required />
                  </div>
                  <div className="w-full md:w-1/3 pr-2">
                    <Input
                      label="Numero de colaborador"
                      crossOrigin={undefined}
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/3 pr-2">
                    <div className="flex flex-col items-end gap-6">
                      <Input
                        label="Lugar de trabajo"
                        crossOrigin={undefined}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:col-span-5 mt-2 gap-y-1">
                  <div className="w-full md:w-1/3 pr-2">
                    <Input label="RFC" crossOrigin={undefined} required />
                  </div>
                  <div className="w-full md:w-1/3 pr-2">
                    <Input label="CURP" crossOrigin={undefined} required />
                  </div>
                  <div className="w-full md:w-1/3 pr-2">
                    <div className="flex flex-col items-end gap-6">
                      <Input label="Salario" crossOrigin={undefined} required />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:col-span-5 mt-4 gap-y-1">
                  <div className="w-full md:w-1/2 pr-2">
                    <Input
                      label="Fecha contratación (AA/MM/DD)"
                      crossOrigin={undefined}
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2 pr-2">
                    <Input
                      label="Fecha de nacimiento (AA/MM/DD)"
                      crossOrigin={undefined}
                      required
                    />
                  </div>
                </div>

                <div className="md:col-span-5 text-left mt-8">
                  <div className="inline-flex mr-1">
                  <Button variant="outlined" size="md" className="bg-colorRoyalton rounded-2xl" color="white">Accept</Button>
                  </div>
                  <div className="inline-flex ml-1 ">
                  <Button variant="outlined" size="md" className=" rounded-2xl" >Cancel</Button>
                  </div>
                </div>

              </form>
            </div>
            
          </div>
        </div>
    </>
  );
}

export default addUsers;
