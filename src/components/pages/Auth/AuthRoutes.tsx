import { Outlet } from "react-router-dom";

import { useRecoilValue } from "recoil";

import LoginPage from "components/pages/Auth/Login/LoginPage";
import { memberState } from "stores";

const AuthRoutes = () => {
  const member = useRecoilValue(memberState);
  const isAuthenticated = member !== null;

  return (
    <>
      {isAuthenticated && <Outlet />}
      {!isAuthenticated && <LoginPage />}
    </>
  );
};

export default AuthRoutes;
