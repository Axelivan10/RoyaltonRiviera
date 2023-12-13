import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { resetUser } from '../../redux/slices/user';

const navbarLogout = (props:any) => {
  const Navigate = useNavigate();
  const dispatch = useAppDispatch();



  
  const handleClick = () => {
    dispatch(resetUser())
    Navigate('/')
    // const nuevoEstado = !props.estado;
    // props.actualizarEstado(nuevoEstado);
  };


  return (
    <>
      <nav
        className="flex items-center justify-between p-6 lg:px-8 "
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
        {props.estado ? (                                                     //ESTO SIRVE PARA QUE NO SE VEA EL BOTON PERO LO PROBARÉ CON REDUX MEJOR
          <a className="-m-1.5 p-1.5">
              <button
                type="button"
                onClick={handleClick}
                className="text-colorRoyalton bg-gray-50 focus:outline-none font-semibold
                 border border-transparent hover:border-colorRoyalton focus:ring-4 focus:ring-gray-200 font-medium rounded-2xl text-sm px-5 py-2.5 
                 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 
                 dark:focus:ring-gray-700"
              >
                Back
              </button>
          </a>
           ) : null}
        </div>

        <div className="flex lg:flex-1 lg:justify-end">
          <a className="-m-1.5 p-1.5">
            {/* <Link to="/"> */}
              <button
                type="button"
                className="text-colorRoyalton bg-gray-50 focus:outline-none font-semibold
                 border border-transparent hover:border-colorRoyalton focus:ring-4 focus:ring-gray-200 font-medium rounded-2xl text-sm px-5 py-2.5 
                 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 
                 dark:focus:ring-gray-700"
              >
                Spanish / English
              </button>
            {/* </Link> */}
          </a>
        </div>
      </nav>
    </>
  );
}

export default navbarLogout