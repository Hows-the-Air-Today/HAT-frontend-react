import styled from "styled-components";
import tw from "twin.macro";

export const ContainerBox = styled.div`
  ${tw`flex flex-row w-full justify-between`}
`;

export const StyledBottomMenuBar = styled.div<{ show: boolean }>`
  ${tw`flex px-2 py-3 max-w-full bottom-0 left-0 right-0 bg-white shadow-md`}
  position: fixed;
  transform: ${({ show }) => (show ? "translateY(0)" : "translateY(100%)")};
  transition: transform 0.3s ease-in-out;
`;
