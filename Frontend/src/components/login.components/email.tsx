import React, {useEffect, useState}from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, } from "@material-tailwind/react";
import Stepper from "./stepper";
import {checkCode, getCode} from "../../api/login.api";
import Swal from "sweetalert2";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import NavbarLogout from "./navbar-logout";
import { authEmail } from "../../redux/slices/user";


function email() {

  const [code, setCode] = useState('');
  const [time, setTime] = useState(false);
  const [expiration, setExpiration] = useState("")
  // const [authCorrect, setAuthCorrect] = useState(false);
  const [seconds, setSeconds] = useState(180);
  const navigate = useNavigate();
  const [stepper, setStepper] = useState(0);
  const [check, setCheck] = useState(false);
  const userData = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();


  useEffect(()=>{
    setCode('')
    setTime(false)
    setExpiration('')
    localStorage.removeItem('auth')
  }, [])

  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      // Limpia el intervalo cuando el componente se desmonta o cuando el temporizador llega a cero
      return () => clearInterval(interval);
    }
  }, [seconds]);

  
  const notSimbols = (e:any) => {
    const invalidChars = ["+", "-", ".","e"];
    if (invalidChars.includes(e.key)) {
      e.preventDefault(); // Evitar que se ingrese el carácter
    }
  };
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const handleInputChange = (e:any) => {
    const value = e.target.value;
    if (value.length <= 6) {
      setCode(e.target.value);
    }
    if (e.target.value == "") {
      setStepper(0);
    } else {
      setStepper(1);
    }
      
    
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setStepper(0)

  
    try {
      if(userData.id == 0) throw new Error('Data empthy');

      const user = await getCode(userData.id,userData.email); 
      setCheck(true)

      Swal.fire({
        position: "top-end",
        icon: "info",
        title: "Email sent",
        showConfirmButton: false,
        timer: 2000,
      });
      
      changeStateBotton()
      setExpiration(user.data.tiempoLimite)
      setSeconds(180)
      return user
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Something wrong try again",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        navigate('/')
      },
      2800);
       throw new Error('Login Fail');
    }
  };

  const changeStateBotton = () => {
    setTime(!time)
    setTimeout(() => {
      setTime(false)},
      180000);                        //ESTA ES UNA MANERA DE VERIFICAR QUE TARDE 3 MINUTOS SIN ACTIVARSE DE NUEVO
  }                                 //EN EL BACK LE PONDREMOS QUE TARDE 2 MINUTOS

  const checkingCode = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await checkCode(userData.id, expiration, code);
      console.log(user.data)
      dispatch(authEmail(user))

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Correct code! You will be redirected to the dashboard",
        showConfirmButton: false,
        timer: 2500
      });
      setStepper(2)
      // setAuthCorrect(true)
      setCode('')
      setTimeout(() => {
        navigate('/dashboard')
      },
      3000); 
      return console.log("correct code")
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Something wrong try again",
        showConfirmButton: false,
        timer: 2500
      });
      // setAuthCorrect(false)
        throw new Error('Login Fail, incorrect code');
    }
  };


  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 h-screen flex flex-col">
        <NavbarLogout estado={true} />
        <div className="flex justify-center items-center sm:grid-cols-2 sm:h-screen xlg:h-screen pb-12">
          <div className="flex flex-col sm:flex-row p-4 w-full max-w-screen-xl">
            <div className="w-full sm:w-1/2 md:w-1/2 lg:mr-40 p-8 bg-white rounded-2xl shadow dark:border">
              <div className="grid grid-start pb-4">
                <p className="font-semibold mb-4">Email Verification</p>
                <p className="mb-2">
                  Please enter the 6 digits verification code sent from
                  Royalton's email. The code will be active for 3 minutes.{" "}
                </p>
                {/* <p>Email Verification code</p> */}
                <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-primary-600 dark:text-primary-500 mt-2 mb-4"
                    >
                      Email verification code
                    </label>

                    <div className="relative block mb-2">
                      <input
                        type="number"
                        id="code"
                        value={code}
                        onChange={handleInputChange}
                        onKeyPress={notSimbols}
                        inputMode="numeric"
                        className="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-xl focus:ring-primary-600 
                        focus:border-primary-600 block w-full pl-10 p-2.5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                        [&::-webkit-inner-spin-button]:appearance-none"
                        placeholder="Enter your code"
                        required
                      />
                      <Button
                        variant="text"
                        size="sm"
                        // color={code ? "gray" : "blue-gray"}
                        disabled={time}
                        className="!absolute right-1 top-1 rounded-full mr-4 text-colorRoyalton active:bg-gray-50 hover:text-yellow-700 hover:font-semibold hover:bg-gray-50 focus:ring-blue-500 "
                        onClick={handleEmail}
                      >
                        Get Code
                      </Button>
                    </div>

                    {time ? (
                      <div className="container mx-auto text-center">
                        <p className="pt-4">"Get code" will be available</p>
                        <h1 className=" font-semibold">
                          Time left: {formatTime(seconds)}
                        </h1>
                      </div>
                    ) : null}
                  </div>

                  <Button
                    type="submit"
                    className="mt-6 w-full bg-colorRoyalton hover:bg-colorHover rounded-xl"
                    onClick={checkingCode}
                    disabled={!time}
                  >
                    Send
                  </Button>
                </form>
                <p className="font-semibold mt-4">
                  Have you not received your code yet?
                </p>
              </div>
            </div>

            <div className="w-full sm:w-1/2 lg:p-2 lg:pt-24 sm:pt-24 p-8 pt-12 ">
              <Stepper estado={stepper} estado2={check} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
  
}

export default email;

