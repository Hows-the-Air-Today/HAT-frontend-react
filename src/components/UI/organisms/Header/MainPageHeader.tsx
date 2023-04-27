import React from "react";

import IconButton from "@material-ui/core/IconButton";
import NotificationsIcon from "@material-ui/icons/Notifications";
import styled from "styled-components";
import tw from "twin.macro";

import Location from "components/UI/atoms/Location";
import { MainPageHeaderProps } from "interface/MainPageHeader";

const Header = styled.header`
  ${tw`w-full py-1 px-4 bg-white flex items-center justify-between`}
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
      <Location />
      <IconButton onClick={onNotificationClick} color="primary">
        <NotificationsIcon />
      </IconButton>
    </Header>
  );
};

export default MainPageHeader;
