import React from "react";
import { useNavigate } from "react-router-dom";

import { Icon } from "./icons";
import { StyledBottomMenuBar, ContainerBox } from "./styles/styles";

const BottomMenuBar = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <StyledBottomMenuBar>
      <ContainerBox>
        {Icon.map((item, index) => (
          <button onClick={() => navigate(item.path)} type="button">
            {item.icon}
          </button>
        ))}
      </ContainerBox>
    </StyledBottomMenuBar>
  );
};
export default BottomMenuBar;
