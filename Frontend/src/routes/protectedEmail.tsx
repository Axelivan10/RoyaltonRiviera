import { Navigate, Outlet, useNavigate } from "react-router-dom";

function ProtectedEmail() {
  // const navigate = useNavigate();
  const authLogin = localStorage.getItem("token");


  if (!authLogin) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Outlet />
    </>
  );

}

export default ProtectedEmail;
