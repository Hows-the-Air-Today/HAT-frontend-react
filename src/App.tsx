import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
      </Routes>
    </Router>
  );
};

export default App;
