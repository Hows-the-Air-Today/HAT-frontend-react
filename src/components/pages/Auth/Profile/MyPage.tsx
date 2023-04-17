import React, { useEffect, useState, useRef } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

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

const Icon = styled(BiDotsVerticalRounded)`
  font-size: 32px;
`;

const EditButton = styled.button`
  position: absolute;
  right: 16px;
  margin: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dropdown = styled.div`
  ${tw`absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-10`}
`;

const DropdownItem = styled.button`
  ${tw`w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900`}
  &:focus {
    ${tw`bg-gray-100`}
  }
`;

const Profile: React.FC = () => {
  const [member, setMember] = useRecoilState(memberState);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleEditButtonClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:11000/api/v1/auth/logout");
      setMember(null);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditProfile = () => {
    // navigate to edit profile page
    console.log("Edit profile clicked");
    navigate(`/edit`);
  };

  const handleNotificationClick = () => {
    console.log("Notification button clicked");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <ProfileContainer>
      <MainPageHeader
        logoUrl={logo}
        title="My Page"
        onNotificationClick={handleNotificationClick}
      />
      <Content>
        <div>
          <EditButton onClick={handleEditButtonClick}>
            <Icon />
          </EditButton>
          {dropdownOpen && (
            <Dropdown ref={dropdownRef}>
              <DropdownItem onClick={handleEditProfile}>
                Edit Profile
              </DropdownItem>
              <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
            </Dropdown>
          )}
          <ProfileImage src="/images/very-good-hat.svg" alt="Profile image" />
        </div>
        <ProfileName>{member && `${member.nickname}`}</ProfileName>
        <GridContainer>
          <GridItem>
            <GridItemImage src="/images/sample1.png" alt="Sample 1" />
            <GridItemOverlay>
              <GridItemTitle>Post1</GridItemTitle>
              <GridItemSubtitle>April 1, 2023</GridItemSubtitle>
            </GridItemOverlay>
          </GridItem>
        </GridContainer>
      </Content>
      <BottomMenuBar />
    </ProfileContainer>
  );
};

export default Profile;
