import React, {Fragment, useEffect, useState} from 'react'
import NavbarApp from '../components/general.components/navbar-app'
import { Dialog, Transition } from '@headlessui/react'
import { CalendarIcon, HomeIcon, MapIcon, UserGroupIcon} from '@heroicons/react/24/outline'
import DashboardCards from '../components/dashboard.components/dashboard.cards'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { resetUser } from '../redux/slices/user'
import { Link, useNavigate } from 'react-router-dom'
import Admin from '../pages/admin'
import Manning from './manning'
import Parstock from './parstock'
import { createRoute } from "../redux/slices/routes";
import Inventary from './inventary'
import ParameterValue from '../components/manning.components/parameterValue'
import { Spinner } from '@material-tailwind/react'
import Location from '../components/manningConfig.components/location'


function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

const dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentComponent, setCurrentComponent] = useState(<DashboardCards/>);
  const [checker, setChecker] = useState(0);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);
  const userData = useAppSelector((state) => state.user);
  const routeData = useAppSelector((state) => state.route);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
 
  const navigation = [   //ESTE ES EL TITULO DEL SIDEBAR DEJAR
    { name: 'Dashboard', to:"DashboardCards", icon: HomeIcon, current: (active == 1 ? true :  false) },
    { name: 'Admin', to: "Admin", icon: MapIcon, current: (active == 2 ? true :  false) },
    { name: 'Manning', to: "Manning", icon: UserGroupIcon, current: (active == 3 ? true :  false) },
    { name: 'Parstock', to: "Parstock", icon: CalendarIcon, current: (active == 4 ? true :  false) },
    { name: 'Inventary', to: "Inventary", icon: CalendarIcon, current: (active == 5 ? true :  false) },
  ]



  useEffect(() => {
    // console.log(routeData)
    const route = localStorage.getItem("route");
    //if(checker == 1){
    switch (route) {
      case 'DashboardCards':
        setCurrentComponent(<DashboardCards/>)
        setActive(1)
        break;
      case 'Admin':
        setCurrentComponent(<Admin/>)
        setActive(2)
        break;
      case 'Manning':
        setCurrentComponent(<Manning enviarDatoAlPadre={recibirDatoDelHijo}/>)
        setActive(3)
        break;
      case 'Parstock':
        setCurrentComponent(<Parstock/>)
        setActive(4)
        break;
      case 'Inventary':
        setCurrentComponent(<Inventary/>)
        setActive(5)
        break;
      case 'Parameter':
        setCurrentComponent(<ParameterValue enviarDatoAlPadre={recibirDatoDelHijo}/>)
        break;
    }
    setChecker(0)
  //} 
  }, [checker]); 

  useEffect(() => {
    // Simular la carga de datos
    setTimeout(() => {
      setLoading(false);
      setChecker(1)
    }, 1000);
  }, []);

  const logOut = () =>{
    dispatch(resetUser());
    navigate('/')  
  }

  const actualizarEstado = (nuevoEstado:boolean) => {
    setSidebarOpen(nuevoEstado);
  };

  const handleComponentChange = (component: string) => {
    dispatch(createRoute(component))
    setChecker(1)
    
  };

  const recibirDatoDelHijo = (dato: number) => {
    setChecker(dato);
  };

  const redirect = () => {
    try {
      const component = "DashboardCards";
      dispatch(createRoute(component));
      setChecker(1)
      setActive(1)
    } catch {
      navigate("/dashboard")
    }
  };

  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-900">
        <NavbarApp className="" estado={sidebarOpen} actualizarEstado={actualizarEstado} enviarDatoAlPadre={recibirDatoDelHijo} />
        <div className="flex"> {/* h-screen pt-24 mt-1 */}
          {/* Sidebar for mobiles */}
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
                            onClick={() => handleComponentChange(item.to)}
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
                  <div className="pb-4 p-2 border-t border-gray-400">
                    <nav aria-label="Sidebar" className="space-y-1 flex">
                      <a
                        className="text-colorRoyalton font-semibold border border-transparent
                      font-medium text-sm px-5 py-2.5 block w-full active:bg-gray-200"
                      onClick={redirect}
                      >
                        Home
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

          {/* Static sidebar for desktop */}
          <div className="hidden lg:flex lg:flex-shrink-0">
            
            <div className="flex flex-col w-64">
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex flex-1 min-h-0 border-r border-gray-200 bg-gray-100">
                <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                  <div className="flex items-center flex-shrink-0 px-4">
                    <p className="font-semibold text-color-black">
                      Main modules 
                    </p>
                  </div>
                  <nav className="mt-5 flex-1" aria-label="Sidebar">
                    <div className="px-2 space-y-1 cursor-pointer">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          onClick={() => handleComponentChange(item.to)}
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

          {/* Renderizado de los componentes y si existe una recarga de navegador suelta el sppiner*/}
          {loading ? (
            <div className="flex items-center justify-center flex-1 h-screen">
              <Spinner className="h-12 w-12 text-gray-900/50 mb-40" />
            </div>
          ) : (
            <React.Fragment>{currentComponent}</React.Fragment>
          )}
        </div>
      </div>
    </>
  );
}

export default dashboard



