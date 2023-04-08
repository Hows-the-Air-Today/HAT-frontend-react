import React from "react";

import styled from "styled-components";
import tw from "twin.macro";

import logo from "../../../assets/images/hat-logo-black.png";
import MainPageHeader from "../../UI/organisms/Header/MainPageHeader";
import BottomMenuBar from "../../UI/organisms/Navigation/BottomMenuBar";

const Container = styled.div`
  ${tw`min-h-screen flex flex-col items-center justify-center bg-gray-100`}
`;

const Content = styled.div`
  ${tw`flex-grow flex items-center justify-center`}
`;

const MainPage: React.FC = () => {
  const handleNotificationClick = () => {
    console.log("Notification button clicked");
  };

  return (
    <Container>
      <MainPageHeader
        logoUrl={logo}
        title="Main Page"
        onNotificationClick={handleNotificationClick}
      />
      <Content>
        <h1>Welcome to the Main Page</h1>
      </Content>
      <BottomMenuBar />
    </Container>
  );
};

export default MainPage;
