import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {ArrowPathIcon, Bars3Icon, ChartPieIcon, CursorArrowRaysIcon, FingerPrintIcon, SquaresPlusIcon, XMarkIcon} from "@heroicons/react/24/outline";
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { Avatar } from "@material-tailwind/react";
import Logo2 from '../../assets/img/logo2.png'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import user, { resetUser } from '../../redux/slices/user'
import { useNavigate } from 'react-router-dom'
import { createRoute } from "../../redux/slices/routes";
import {userData} from "../../api/login.api"

const NavbarApp = (props:any) => {
  const [user, setUser] = useState(0)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logOut = () =>{
    dispatch(resetUser());
    navigate('/')  
  }

  const handleClick = () => {
    const nuevoEstado = !props.estado;
    props.actualizarEstado(nuevoEstado);
  };

  const redirect = () => {
    try {
      const component = "DashboardCards";
      dispatch(createRoute(component));
      props.enviarDatoAlPadre(1);
    } catch {
      navigate("/dashboard")
    }
  };

  const handleUserData = async ()  =>{              //AQUI VA EL API PARA EL NAVBAR CON EL NOMBRE Y LA FOTO
    try {  
      const response = await userData(1); 
     
    } catch (error) {
        throw new Error('Login Fail');
    }
  }

  return (
    <>
    {/* <div className="fixed top-0 left-0 w-full bg-white z-10"> */}
   <div className="border-b border-gray-300">
        <nav
          className="flex items-center justify-between p-2 lg:px-32 sm:px-20"
          aria-label="Global"
        >
          <div className="flex flex-row items-center justify-between">
            <div className="w-1/4 p-4">
              <div className="flex"> 
               <button
                  type="button"
                  className="lg:hidden -mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
                  onClick={handleClick}
                >
                  <span className="sr-only">Open sidebar</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
             
              </div>
            </div>
            <div className="lg:ml-2">
              <a href="#" className="block lg:inline-block">
                <span className="sr-only">Royalton</span>
                <img
                  className="h-20 pt-2"
                  src={Logo2}
                  alt=""
                />
              </a>
            </div>
            
          </div>

          <div className="lg:flex lg:flex-1 lg:justify-end items-center pr-2 lg:pr-6 p-4">
            <div className="flex items-center">
              <p className="lg:pr-4 pr-2 sm:pr-4 text-right">Axel González</p>
              <Avatar
                src="https://docs.material-tailwind.com/img/face-2.jpg"
                alt="avatar"
                withBorder={true}
                className="p-0.5"
              />
            </div>
          </div>

          <div className="hidden lg:flex lg:gap-x-4 lg:justify-end items-center">
            <a className="-m-1.5 p-1.5">
              <button
                onClick={redirect}
                type="button"
                className="text-colorRoyalton bg-gray-50 focus:outline-none font-semibold
           border border-transparent hover:border-colorRoyalton focus:ring-4 focus:ring-gray-200 font-medium rounded-2xl text-sm px-5 py-2.5 
           dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 
           dark:focus:ring-gray-700"
              >
                Home
              </button>
            </a>

            <a className="-m-1.5 p-1.5">
              <button
                type="button"
                className="text-colorRoyalton bg-gray-50 focus:outline-none font-semibold
           border border-transparent hover:border-colorRoyalton focus:ring-4 focus:ring-gray-200 font-medium rounded-2xl text-sm px-5 py-2.5 
           dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 
           dark:focus:ring-gray-700"
              >
                Spanish / English
              </button>
            </a>

            <a className="-m-1.5 p-1.5">
              <button
              onClick={logOut}
                type="button"
                className="text-colorRoyalton bg-gray-50 focus:outline-none font-semibold
           border border-transparent hover:border-colorRoyalton focus:ring-4 focus:ring-gray-200 font-medium rounded-2xl text-sm px-5 py-2.5 
           dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 
           dark:focus:ring-gray-700"
              >
                Log out
              </button>
            </a>
          </div>
          
        </nav>

      {/* </div> */}
    </div>
   
    </>
  );
}

export default NavbarApp;
