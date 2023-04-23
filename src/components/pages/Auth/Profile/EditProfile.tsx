import React, { useState, useRef } from "react";
import { BiEditAlt } from "react-icons/bi";
import { RiEmotionSadLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import { useRecoilState } from "recoil";
import styled from "styled-components";
import tw from "twin.macro";

import { memberState } from "stores/memberState";

import logo from "../../../../assets/images/hat-logo-black.png";
import MainPageHeader from "../../../UI/organisms/Header/MainPageHeader";
import BottomMenuBar from "../../../UI/organisms/Navigation/BottomMenuBar";

const ProfileImage = styled.img`
  ${tw`w-28 h-28 rounded-full object-cover mb-4 mt-8`}
`;

const Content = styled.div`
  ${tw`flex-grow flex flex-col items-center justify-center relative`}
  & > * {
    ${tw`mb-4`}
  }
`;

const EditProfileButton = styled.button`
  ${tw`absolute bottom-0 right-0 mt-2 mr-2 w-8 h-8 rounded-full text-white bg-blue-500 hover:bg-blue-600 transition duration-300 flex items-center justify-center`}
`;

const EditProfileContainer = styled.div`
  ${tw`flex flex-col items-center bg-gray-100`}
`;

const EditCard = styled.div`
  ${tw`flex flex-col items-start bg-white p-8 rounded-lg shadow-md`}
  & > h1 {
    ${tw`font-bold text-left text-lg mb-4`}
  }
  width: 80%;
`;

const ReadOnlyContainer = styled.div`
  ${tw`border-b-2 border-gray-300 pb-2 my-2 flex items-center justify-between`}
  width: 100%;
  & span {
    ${tw`font-bold text-black mr-2`}
  }
  & p {
    ${tw`text-right`}
  }
`;

const InfoInputContainer = styled.div`
  ${tw`border-b-2 border-gray-300 pb-2 my-2 flex items-center justify-between`}
  width: 100%;
  & span {
    ${tw`font-bold text-black mr-2`}
  }
  & p {
    ${tw`text-gray-500 text-right`}
  }
`;

const WithdrawalContainer = styled.div`
  ${tw`border-b-2 border-gray-300 pb-2 my-2 flex items-center justify-between`}
  width: 100%;
  & span {
    ${tw`font-bold text-black mr-2`}
  }
  & p {
    ${tw`text-gray-500 text-right`}
  }
`;

const EditableInfo = styled.p`
  ${tw`text-gray-500 text-right inline-flex items-center`}
  &:hover {
    ${tw`text-blue-500`}
  }
`;

const WithdrawalButton = styled.p`
  ${tw`text-right inline-flex items-center`}
  &:hover {
    ${tw`text-red-500`}
  }
`;

const EditMyProfile: React.FC = () => {
  const [member, setMember] = useRecoilState(memberState);
  const navigate = useNavigate();
  const handleNotificationClick = () => {
    console.log("Notification button clicked");
  };

  const handleEditNicknameClick = () => {
    console.log("Edit nickname clicked");
    navigate(`/edit-nickname`);
  };
  const handleEditPasswordClick = () => {
    console.log("Edit nickname clicked");
    navigate(`/change-password`);
  };

  const handleWithdrawalClick = () => {
    console.log("Click Withdrawal");
    navigate(`/withdrawal-check`);
  };

  return (
    <EditProfileContainer>
      <MainPageHeader
        logoUrl={logo}
        title="Edit Profile"
        onNotificationClick={handleNotificationClick}
      />
      <Content>
        <ProfileImage src="/images/very-good-hat.svg" alt="Profile image" />
        <EditProfileButton type="submit">
          <BiEditAlt />
        </EditProfileButton>
      </Content>
      <EditCard style={{ marginTop: "20px" }}>
        <h1>계정 관리</h1>
        <ReadOnlyContainer>
          <span>아이디:</span>
          <p>&nbsp;{member && `${member.loginId}`}</p>
        </ReadOnlyContainer>
        <InfoInputContainer>
          <span>비밀번호:</span>
          <EditableInfo onClick={handleEditPasswordClick}>
            비밀번호 변경하기
            <BiEditAlt style={{ marginLeft: "8px" }} />
          </EditableInfo>
        </InfoInputContainer>
        <ReadOnlyContainer>
          <span>이메일:</span>
          <p>&nbsp;{member && `${member.email}`}</p>
        </ReadOnlyContainer>
        <InfoInputContainer>
          <span>닉네임:</span>
          <EditableInfo onClick={handleEditNicknameClick}>
            {member && `${member.nickname}`}
            <BiEditAlt style={{ marginLeft: "8px" }} />
          </EditableInfo>
        </InfoInputContainer>
        <WithdrawalContainer>
          <span>서비스 탈퇴</span>
          <WithdrawalButton onClick={handleWithdrawalClick}>
            <RiEmotionSadLine style={{ marginLeft: "8px" }} />
          </WithdrawalButton>
        </WithdrawalContainer>
      </EditCard>
      <BottomMenuBar />
    </EditProfileContainer>
  );
};

export default EditMyProfile;
