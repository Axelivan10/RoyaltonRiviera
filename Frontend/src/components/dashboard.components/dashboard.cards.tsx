import React from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react'
import Admin from '../../pages/admin'
import AddUsers from '../admin.components/addUsers'
import ListUsers from '../admin.components/listUsers'
import EditUsers from '../admin.components/editUsers'


function dashboardCards() {
  return (
    <>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="lg:hidden ">
          {" "}
          {/*ESTO ES POR AHORA, SE DEBE REVISAR QUE PONER EN ESTA BARRA, CHANCE LE DE BUEN LOOK.*/}
          <div className="flex items-center justify-end bg-gray-50 border-b border-gray-200 px-4 py-1.5">
            <div>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
              />
            </div>
            {/* <div>
        <button
          type="button"
          className="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <HomeIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div> */}
          </div>

        </div>

        {/* {true ? ( */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-20 gap-y-7 mx-auto p-12">
            <div className="p-2 flex flex-col justify-center items-center">
              <Card className="mt-2 w-80">
                <CardHeader color="blue-gray" className="relative h-32">
                  <img
                    src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                    alt="card-image"
                  />
                </CardHeader>
                <CardBody>
                  <Typography variant="h5" color="blue-gray">
                    UI/UX Review Check
                  </Typography>
                  <Typography>
                    The place is close to Barceloneta Beach and bus stop just 2
                    min by walk.
                  </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                  <Button
                    variant="outlined"
                    className="rounded-2xl text-colorRoyalton border border-colorRoyalton hover:border-colorRoyalton"
                  >
                    Read More
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="p-2 flex flex-col justify-center items-center">
              <Card className="mt-2 w-80">
                <CardHeader color="blue-gray" className="relative h-32">
                  <img
                    src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                    alt="card-image"
                  />
                </CardHeader>
                <CardBody>
                  <Typography variant="h5" color="blue-gray">
                    UI/UX Review Check
                  </Typography>
                  <Typography>
                    The place is close to Barceloneta Beach and bus stop just 2
                    min by walk.
                  </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                  <Button variant="outlined" className="rounded-2xl">
                    Read More
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="p-2 flex flex-col justify-center items-center">
              <Card className="mt-2 w-80">
                <CardHeader color="blue-gray" className="relative h-32">
                  <img
                    src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                    alt="card-image"
                  />
                </CardHeader>
                <CardBody>
                  <Typography variant="h5" color="blue-gray">
                    UI/UX Review Check
                  </Typography>
                  <Typography>
                    The place is close to Barceloneta Beach and bus stop just 2
                    min by walk.
                  </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                  <Button variant="outlined" className="rounded-2xl">
                    Read More
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="p-2 flex flex-col justify-center items-center">
              <Card className="mt-2 w-80">
                <CardHeader color="blue-gray" className="relative h-32">
                  <img
                    src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                    alt="card-image"
                  />
                </CardHeader>
                <CardBody>
                  <Typography variant="h5" color="blue-gray">
                    UI/UX Review Check
                  </Typography>
                  <Typography>
                    The place is close to Barceloneta Beach and bus stop just 2
                    min by walk.
                  </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                  <Button variant="outlined" className="rounded-2xl">
                    Read More
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="p-2 flex flex-col justify-center items-center">
              <Card className="mt-2 w-80">
                <CardHeader color="blue-gray" className="relative h-32">
                  <img
                    src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                    alt="card-image"
                  />
                </CardHeader>
                <CardBody>
                  <Typography variant="h5" color="blue-gray">
                    UI/UX Review Check
                  </Typography>
                  <Typography>
                    The place is close to Barceloneta Beach and bus stop just 2
                    min by walk.
                  </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                  <Button variant="outlined" className="rounded-2xl">
                    Read More
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="p-2 flex flex-col justify-center items-center">
              <Card className="mt-2 w-80">
                <CardHeader color="blue-gray" className="relative h-32">
                  <img
                    src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                    alt="card-image"
                  />
                </CardHeader>
                <CardBody>
                  <Typography variant="h5" color="blue-gray">
                    UI/UX Review Check
                  </Typography>
                  <Typography>
                    The place is close to Barceloneta Beach and bus stop just 2
                    min by walk.
                  </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                  <Button variant="outlined" className="rounded-2xl">
                    Read More
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        {/* ) : (
          <Admin />
        )} */}
      </div>
    </>
  );
}

export default dashboardCards