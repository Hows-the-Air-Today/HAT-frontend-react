import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { RecoilRoot } from "recoil";

import RealTimePage from "components/pages/AirQuality/RealTimePage";
import AuthRoutes from "components/pages/Auth/AuthRoutes";
import LoginPage from "components/pages/Auth/Login/LoginPage";
import EditProfile from "components/pages/Auth/Profile/EditProfile";
import MyPage from "components/pages/Auth/Profile/MyPage";
import RegisterPage from "components/pages/Auth/Register/RegisterPage";
import CommunityPage from "components/pages/Community/CommunityPage";
import MainPage from "components/pages/Main/MainPage";

import CommunityCreatPage from "./components/pages/CommunityCreatPage";

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
          </Route>
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default App;
