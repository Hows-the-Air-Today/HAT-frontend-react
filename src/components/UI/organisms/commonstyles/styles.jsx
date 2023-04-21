import * as Md from "react-icons/md";

import styled from "styled-components";
import tw from "twin.macro";

// MdOutlineCancel
export const RootBox = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const CameraBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 73px;
  height: 73px;
  border-radius: 5px;
  border: 1px solid #e5e7eb;
  margin-right: 10px;
  position: relative;
`;

export const CameraRootContainer = styled.div`
  display: flex;
  cursor: pointer;
`;
export const FlexBox = styled.div`
  display: flex;
  padding-bottom: 20px;
`;

export const CameraInput = styled.input`
  display: none;
`;

export const CustomImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: fill;
`;

export const CancelButton = styled(Md.MdCancel)`
  color: red;
  cursor: pointer;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 88%;
`;

export const CommunityCustomInput = styled.input`
  width: 100%;
  border: 1px solid #e5e7eb;
  padding: 10px;
  outline: none;
  height: 50px;
`;

export const CommunityCustomTextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #e5e7eb;
  outline: none;
  resize: none;
  height: 250px;
`;

export const CommunityInputBox = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 240px);
  gap: 10px;
`;

export const CommunityFooter = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: right;
`;
