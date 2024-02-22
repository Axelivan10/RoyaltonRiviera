import React, { Fragment, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useNavigate } from 'react-router-dom';
import MasterRatios from '../components/manning.components/masterRatios';
import TableSTD from '../components/manning.components/tableSTD';
import { BuildingOfficeIcon, MapPinIcon, ClockIcon, TruckIcon, HomeIcon, BookmarkIcon, ArchiveBoxIcon, TableCellsIcon, PresentationChartBarIcon } from '@heroicons/react/20/solid';
import { resetUser } from '../redux/slices/user';
import NavbarApp from '../components/general.components/navbar-app';
import { Dialog, Transition } from '@headlessui/react';
import  Location  from '../components/manningConfig.components/location';
import Plant from '../components/manningConfig.components/plant';
import Shift from '../components/manningConfig.components/shift';
import ServiceType from '../components/manningConfig.components/serviceType';
import Position from '../components/manningConfig.components/position';
import { createRoute,  } from '../redux/slices/routes';
import Positionxlocation from '../components/manningConfig.components/positionxlocation';
import SizeCriteria from '../components/manningConfig.components/sizeCriteria';
import StandardTable from '../components/manningConfig.components/standardTable';
import FlowsRest from '../components/manningConfig.components/flowsRest';
import FlowsGrl from '../components/manningConfig.components/flowsGrl';
import KitchenGrl from '../components/manningConfig.components/kitchenGrl';

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

function manningConfig(props:any) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentComponent, setCurrentComponent] = useState(<Location/>);
  const [active, setActive] = useState(1);
  const routeData = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
 
const navigation = [   //ESTE ES EL TITULO DEL SIDEBAR DEJAR
  { name: 'Location', to: <Location/>, icon: MapPinIcon, value:1, current: (active == 1 ? true :  false) },
  { name: 'Plant', to: <Plant/>, icon: BuildingOfficeIcon, value:2, current: (active == 2 ? true :  false) },
  { name: 'Shift', to: <Shift/>, icon: ClockIcon, value:3, current: (active == 3 ? true :  false) },
  { name: 'Service Type', to: <ServiceType/>, icon: TruckIcon, value:4, current: (active == 4 ? true :  false) },
  { name: 'Position', to: <Position/>, icon: BookmarkIcon, value:5, current: (active == 5 ? true :  false) },
  { name: 'Position-Location', to: <Positionxlocation/>, icon: ArchiveBoxIcon, value:6, current: (active == 6 ? true :  false) },
  { name: 'Standard Table', to: <StandardTable/>, icon: TableCellsIcon, value:7, current: (active == 7 ? true :  false) },
  { name: 'Size Criteria', to: <SizeCriteria/>, icon: PresentationChartBarIcon, value:8, current: (active == 8 ? true :  false) },
  { name: 'Flows Rest', to: <FlowsRest/>, icon: PresentationChartBarIcon, value:9, current: (active == 9 ? true :  false) },
  { name: 'Flows Grl', to: <FlowsGrl/>, icon: PresentationChartBarIcon, value:10, current: (active == 10 ? true :  false) },
  { name: 'Kitchen Grl', to: <KitchenGrl/>, icon: PresentationChartBarIcon, value:11, current: (active == 11 ? true :  false) },
]

const redirect = () => {
  try {
    const component = "DashboardCards";
    dispatch(createRoute(component));
    props.enviarDatoAlPadre(1);
  } catch {
    navigate("/dashboard")
  }
};

  const logOut = () =>{
    dispatch(resetUser());
    navigate('/')  
  }

  const actualizarEstado = (nuevoEstado:boolean) => {
    setSidebarOpen(nuevoEstado);
  };

  const handleComponentChange = (component: any, value:number) => {
    setCurrentComponent(component);
    setActive(value)
    setSidebarOpen(false)
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 "> 
    <NavbarApp estado={sidebarOpen} actualizarEstado={actualizarEstado} />

    <div className="flex h-screen overflow-hidden">

      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <HomeIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-1 h-0 pt-5 pb-4">
                <div className="flex-shrink-0 flex items-center px-4">
                  <p className="font-semibold text-colorRoyalton">
                    Main modules
                  </p>
                </div>
                <nav aria-label="Sidebar" className="mt-5">
                  <div className="px-2 space-y-1 cursor-pointer">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        onClick={() => handleComponentChange(item.to, item.value)}
                        className={classNames(
                          item.current
                            ? "bg-gray-200 text-colorRoyalton font-semibold"
                            : "text-colorRoyalton hover:bg-gray-50",
                          "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-colorRoyalton"
                              : "text-colorRoyalton",
                            "mr-4 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </div>
                </nav>
              </div>
              <div className='pb-4 p-2 border-t border-gray-400'>
                <nav aria-label="Sidebar" className="space-y-1 flex">
                  <a 
                    onClick={redirect}
                    className="text-colorRoyalton font-semibold border border-transparent
                  font-medium text-sm px-5 py-2.5 block w-full active:bg-gray-200"
                  >Home
                  </a>
                </nav>

                <nav aria-label="Sidebar" className="space-y-1 flex">
                  <a
                    className="text-colorRoyalton font-semibold border border-transparent
                  font-medium text-sm px-5 py-2.5 block w-full active:bg-gray-200"
                  >
                    English / Spanish
                  </a>
                </nav>
                <nav aria-label="Sidebar" className="space-y-1 flex">
                  <a 
                    onClick={logOut}
                    className="text-colorRoyalton font-semibold border border-transparent
                  font-medium text-sm px-5 py-2.5 block w-full active:bg-gray-200"
                  >
                    Log Out
                  </a>
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-1 min-h-0 border-r border-gray-200 bg-gray-100">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <p className="font-semibold text-color-black">Tables</p>
              </div>
              <nav className="mt-5 flex-1" aria-label="Sidebar">
                <div className="px-2 space-y-1 cursor-pointer">
                  {navigation.map((item) => (
                    <a 
                      key={item.name}
                      onClick={() => handleComponentChange(item.to, item.value)}
                      className={classNames(
                        item.current
                          ? "bg-gray-200 text-colorRoyalton font-semibold"
                          : "text-colorRoyalton hover:bg-gray-50",
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? "text-colorRoyalton"
                            : "text-colorRoyalton",
                          "mr-3 h-6 w-6"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        </div>  
      </div>
      
      {currentComponent}

    </div>

  </div>
  )

}

export default manningConfig