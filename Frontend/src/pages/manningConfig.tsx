import React, { Fragment, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useNavigate } from 'react-router-dom';
import MasterRatios from '../components/manning.components/masterRatios';
import TableSTD from '../components/manning.components/tableSTD';
import { HomeIcon, MapIcon, ArrowUturnLeftIcon } from '@heroicons/react/20/solid';
import { resetUser } from '../redux/slices/user';
import NavbarApp from '../components/general.components/navbar-app';
import { Dialog, Transition } from '@headlessui/react';
import  Location  from '../components/manningConfig.components/location';
import Plant from '../components/manningConfig.components/plant';
import Shift from '../components/manningConfig.components/shift';
function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

function manningConfig() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentComponent, setCurrentComponent] = useState(<Location/>);
  const [active, setActive] = useState(1);
  const routeData = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
 
const navigation = [   //ESTE ES EL TITULO DEL SIDEBAR DEJAR
  { name: 'Location', to: <Location/>, icon: HomeIcon, value:1, current: (active == 1 ? true :  false) },
  { name: 'Plant', to: <Plant/>, icon: HomeIcon, value:2, current: (active == 2 ? true :  false) },
  { name: 'Shift', to: <Shift/>, icon: HomeIcon, value:3, current: (active == 3 ? true :  false) },

]

  const logOut = () =>{
    dispatch(resetUser());
    navigate('/login')  }

  const actualizarEstado = (nuevoEstado:boolean) => {
    setSidebarOpen(nuevoEstado);
  };

  const handleComponentChange = (component: any, value:number) => {
    setCurrentComponent(component);
    setActive(value)
  };


  return (
    <div className="bg-gray-50 dark:bg-gray-900 "> 
    <NavbarApp estado={sidebarOpen} actualizarEstado={actualizarEstado} />

    <div className="flex h-screen overflow-hidden">

      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
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
                  <div className="px-2 space-y-1">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        // to={item.to}
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
                  <a onChange={logOut}
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
                <div className="px-2 space-y-1">
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