import React from "react";
import { useNavigate } from "react-router-dom";

import { Header, RootHeaderBox } from "./styles/styles";
import { HeaderBarProps } from "../../../../interface/HeaderBarProps";
import { BackArrowButton } from "../../atoms/button";

const HeaderBar: React.FC<HeaderBarProps> = ({ title }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };
  return (
    <Header>
      <BackArrowButton onClick={handleClick} />
      <RootHeaderBox>
        <b>{title}</b>
      </RootHeaderBox>
    </Header>
  );
};

export default HeaderBar;
