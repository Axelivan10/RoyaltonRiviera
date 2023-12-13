import { Button, Checkbox  } from "@material-tailwind/react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import logo from "../assets/img/logo.jpg"
import NavbarLogout from "../components/login.components/navbar-logout";
import Email from "../components/login.components/email";
import {Login} from "../api/login.api";
import Swal from 'sweetalert2'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { authUser, createUser, resetUser } from "../redux/slices/user";


function login() {
  const [userAvailable, setUserAvailable] = useState(false); //ESTO ES PARA QUE SE VAYA AL EMAIL Y QUE APAREZA EL BOTON REGRESAR.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();



  useEffect(()=>{
    setEmail('')
    setPassword('')
    dispatch(resetUser())
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {  
      const user = await Login(email, password); 
        dispatch(authUser(user));
        dispatch(createUser(user));
      
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your are logged",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        navigate('/email')
      }, 2000);


    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Something wrong try again",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
      }, 2000);
        throw new Error('Login Fail');
    }
    
  };

  // const actualizarEstado = (nuevoEstado:boolean) => {
  //   setUserAvailable(nuevoEstado);
  // };


  
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 h-screen flex flex-col">
        <NavbarLogout
          estado={userAvailable}
          // actualizarEstado={actualizarEstado}
        />
        
        {/* {!userAvailable ? ( */}
          <div className="flex flex-col items-center justify-center px-6 lg:mt-16">
            {" "}
            {/*py-8 */}
            <a
              href="#"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <img
                className="w-20 h-20 mr-2 rounded-full"
                src={logo}
                alt="logo"
              />
            </a>
            <div className="w-full bg-white rounded-2xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-8 00">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Welcome Back
                </h1>

                <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-primary-600 dark:text-primary-500 font-semibold"
                    >
                      Email
                    </label>
                    <div className="relative block mb-2">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 16"
                        >
                          <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                          <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                        </svg>
                      </div>

                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        className="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-xl focus:ring-primary-600 
                        ocus:border-primary-600 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 
                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@bluediamondresorts.com"
                        required
                      />
                      
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-primary-600 dark:text-primary-500 font-semibold"
                    >
                      Password
                    </label>
                    <div className="relative block mb-2">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            clipRule="evenodd"
                            fillRule="evenodd"
                            d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                          />
                        </svg>
                      </div>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-xl focus:ring-primary-600 
                      focus:border-primary-600 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 
                      dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                  
                 <Checkbox
                      className="checked:bg-colorRoyalton"
                      label={
                        <span className="text-black text-sm font-medium">
                          Remember Me
                        </span>
                      }
                      crossOrigin={undefined}
                      // id="rememberMe"
                      // checked={rememberMe}
                      // onChange={handleRememberMeChange}
                    />
                   
                  </div>

                  <Button
                    type="submit"
                    className="mt-6 w-full bg-colorRoyalton hover:bg-colorHover rounded-xl"
                    onClick={handleLogin}
                  >
                    Sing In
                  </Button>

                  <p className="text-sm text-primary-600 text-colorRoyalton text-center font-semibold">
                    |
                  </p>
                </form>
              </div>
            </div>
          </div>
         {/* ) : (
           <Email />
         )} */}
      </section>
    </>
  );
}



export default login