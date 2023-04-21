import styled from "styled-components";
import tw from "twin.macro";

export const Header = styled.header`
  ${tw`w-full py-4 px-2 bg-white shadow-md flex flex-row`}
`;

export const RootHeaderBox = styled.div`
  width: calc(100% - 50px);
  display: flex;
  align-content: center;
  justify-content: center;
`;
