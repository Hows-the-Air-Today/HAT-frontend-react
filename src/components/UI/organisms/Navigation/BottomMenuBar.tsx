import React from "react";

import styled from "styled-components";
import tw from "twin.macro";

const StyledBottomMenuBar = styled.div`
  ${tw`fixed bottom-0 left-0 right-0 bg-white shadow-md flex`}
`;

const MenuButton = styled.button`
  ${tw`w-1/5 text-center py-2 hover:bg-gray-200`}
`;

const BottomMenuBar: React.FC = () => {
  return (
    <StyledBottomMenuBar>
      <MenuButton>Home</MenuButton>
      <MenuButton>Community</MenuButton>
      <MenuButton>Add</MenuButton>
      <MenuButton>Ranking</MenuButton>
      <MenuButton>Profile</MenuButton>
    </StyledBottomMenuBar>
  );
};

export default BottomMenuBar;
