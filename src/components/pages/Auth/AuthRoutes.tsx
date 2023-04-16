import { Outlet } from "react-router-dom";

import { useRecoilValue } from "recoil";

import LoginPage from "components/pages/Auth/Login/LoginPage";
import { memberState } from "stores";

const AuthRoutes = () => {
  const member = useRecoilValue(memberState);
  return member !== null ? <Outlet /> : <LoginPage />;
};

export default AuthRoutes;
