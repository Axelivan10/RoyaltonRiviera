import { Navigate, Outlet, useNavigate } from "react-router-dom";

function ProtectedPrivateRoutes() {
  // const navigate = useNavigate();
  const authEmail = localStorage.getItem("auth");


  if (!authEmail) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Outlet />
    </>
  );

}

export default ProtectedPrivateRoutes;


/* 
import { useNavigate, Outlet } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { resetUser } from "../redux/reducer/user";

function ProtectedRoutes() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();

  const auth = localStorage.getItem('auth');
  const auth2 = localStorage.getItem('auth2');
 
  if (!auth) {
    navigate('/');
  }



  


  return (
    <>
      <Outlet />
    </>
  );
}

export default ProtectedRoutes;

*/
