import React from "react";

import IconButton from "@material-ui/core/IconButton";
import NotificationsIcon from "@material-ui/icons/Notifications";
import styled from "styled-components";
import tw from "twin.macro";

import { MainPageHeaderProps } from "../../../../interface/MainPageHeader";

const Header = styled.header`
  ${tw`w-full py-4 px-6 bg-white shadow-md flex items-center justify-between`}
`;

const Logo = styled.img`
  ${tw`w-auto h-8`}
`;

const Title = styled.h1`
  ${tw`text-xl font-bold`}
`;

const MainPageHeader: React.FC<MainPageHeaderProps> = ({
  logoUrl,
  title,
  onNotificationClick,
}) => {
  return (
    <Header>
      <Logo src={logoUrl} alt="Logo" />
      <Title>{title}</Title>
      <IconButton onClick={onNotificationClick} color="primary">
        <NotificationsIcon />
      </IconButton>
    </Header>
  );
};

export default MainPageHeader;
