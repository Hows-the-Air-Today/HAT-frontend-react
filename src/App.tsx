import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { RecoilRoot } from "recoil";

import RealTimePage from "components/pages/AirQuality/RealTimePage";
import AuthRoutes from "components/pages/Auth/AuthRoutes";
import LoginPage from "components/pages/Auth/Login/LoginPage";
import ChangePasswordPage from "components/pages/Auth/Profile/ChangePasswordPage";
import EditNicknamePage from "components/pages/Auth/Profile/EditNicknamePage";
import EditProfile from "components/pages/Auth/Profile/EditProfile";
import MyPage from "components/pages/Auth/Profile/MyPage";
import WithdrawalPage from "components/pages/Auth/Profile/WithdrawalPage";
import RegisterPage from "components/pages/Auth/Register/RegisterPage";
import CommunityPage from "components/pages/Community/CommunityPage";
import CommunityCreatPage from "components/pages/CommunityCreatPage";
import MainPage from "components/pages/Main/MainPage";

import CommunityDetailPage from "./components/pages/community-detail";

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/airquality" element={<RealTimePage />} />
          <Route path="/community-create" element={<CommunityCreatPage />} />

          <Route element={<AuthRoutes />}>
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/my-page" element={<MyPage />} />
            <Route path="/edit" element={<EditProfile />} />
            <Route path="/edit-nickname" element={<EditNicknamePage />} />
            <Route path="/change-password" element={<ChangePasswordPage />} />
            <Route path="/withdrawal-check" element={<WithdrawalPage />} />
            <Route path="/community-detail" element={<CommunityDetailPage />}>
              <Route path=":id" element={<CommunityDetailPage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default App;
