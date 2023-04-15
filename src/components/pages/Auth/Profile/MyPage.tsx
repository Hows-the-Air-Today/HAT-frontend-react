import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import tw from "twin.macro";

import { memberState } from "stores/member";

import logo from "../../../../assets/images/hat-logo-black.png";
import MainPageHeader from "../../../UI/organisms/Header/MainPageHeader";
import BottomMenuBar from "../../../UI/organisms/Navigation/BottomMenuBar";

const Content = styled.div`
  ${tw`flex-grow flex flex-col items-center justify-center`}
  & > * {
    ${tw`mb-4`}
  }
`;

const ProfileContainer = styled.div`
  ${tw`flex flex-col items-center bg-gray-100`}
`;

const ProfileImage = styled.img`
  ${tw`w-28 h-28 rounded-full object-cover mb-4 mt-8`}
`;

const ProfileName = styled.h1`
  ${tw`text-2xl font-semibold`}
`;

const GridContainer = styled.div`
  ${tw`grid grid-cols-3 gap-1`}
  margin: 5px;
`;

const GridItem = styled.div`
  ${tw`relative w-full h-32 rounded-md overflow-hidden`}
`;

const GridItemImage = styled.img`
  ${tw`w-full h-full object-cover`}
`;

const GridItemOverlay = styled.div`
  ${tw`absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 hover:opacity-75`}
  &:hover {
    ${tw`bg-gray-800 text-white`}
  }
`;

const GridItemTitle = styled.h3`
  ${tw`text-lg font-semibold`}
`;

const GridItemSubtitle = styled.p`
  ${tw`text-gray-500`}
`;

const Profile: React.FC = () => {
  const [profileName, setProfileName] = useState("");
  const [member, setMember] = useRecoilState(memberState);
  //   console.log(member);

  const handleNotificationClick = () => {
    console.log("Notification button clicked");
  };
  return (
    <ProfileContainer>
      <MainPageHeader
        logoUrl={logo}
        title="My Page"
        onNotificationClick={handleNotificationClick}
      />
      <Content>
        <ProfileImage src="/images/very-good-hat.svg" alt="Profile image" />
        <ProfileName>{member && `${member.nickname}`}</ProfileName>
        <GridContainer>
          <GridItem>
            <GridItemImage src="/images/sample1.png" alt="Sample 1" />
            <GridItemOverlay>
              <GridItemTitle>Post1</GridItemTitle>
              <GridItemSubtitle>April 1, 2023</GridItemSubtitle>
            </GridItemOverlay>
          </GridItem>
          <GridItem>
            <GridItemImage src="/images/sample2.jpeg" alt="Sample 2" />
            <GridItemOverlay>
              <GridItemTitle>Post 2</GridItemTitle>
              <GridItemSubtitle>April 2, 2023</GridItemSubtitle>
            </GridItemOverlay>
          </GridItem>
          <GridItem>
            <GridItemImage src="/images/sample3.jpeg" alt="Sample 3" />
            <GridItemOverlay>
              <GridItemTitle>Post 3</GridItemTitle>
              <GridItemSubtitle>April 3, 2023</GridItemSubtitle>
            </GridItemOverlay>
          </GridItem>
        </GridContainer>
      </Content>
      <BottomMenuBar />
    </ProfileContainer>
  );
};

export default Profile;
