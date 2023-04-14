import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import RealTimePage from "components/pages/AirQuality/RealTimePage";
import LoginPage from "components/pages/Auth/Login/LoginPage";
import RegisterPage from "components/pages/Auth/Register/RegisterPage";
import CommunityPage from "components/pages/Community/CommunityPage";
import MainPage from "components/pages/Main/MainPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/airquality" element={<RealTimePage />} />
      </Routes>
    </Router>
  );
};

export default App;
