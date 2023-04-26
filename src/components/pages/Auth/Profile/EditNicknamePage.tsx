import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import tw from "twin.macro";

import { memberState } from "stores/memberState";

import BottomMenuBar from "../../../UI/organisms/Navigation/BottomMenuBar";

const EditNicknameContainer = styled.div`
  ${tw`flex flex-col justify-center items-center h-screen bg-gray-100`}
`;

const EditCard = styled.div`
  ${tw`flex flex-col justify-center items-center bg-white p-8 rounded-lg shadow-md`}
  & > h1 {
    ${tw`font-bold text-center text-lg mb-4`}
  }
  width: 80%;
  display: flex;
  align-items: center;
`;

const EditForm = styled.form`
  ${tw`flex flex-col w-full`}
`;

const Input = styled.input`
  ${tw`w-full border-2 border-gray-200 p-2 rounded-md outline-none focus:border-blue-500 transition duration-300`}
`;

const TitleContainer = styled.div`
  ${tw`pb-2 my-2 flex items-center justify-between`}
  width: 100%;
  & span {
    ${tw`font-bold text-black mr-2`}
  }
  & p {
    ${tw`font-bold text-center flex-1 `}
  }
`;

const EditButton = styled.button`
  ${tw`w-full mt-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition duration-300`}
`;

const EditNickname: React.FC = () => {
  const [member, setMember] = useRecoilState(memberState);
  const [nickname, setNickname] = useState("");
  const prevNicknameRef = useRef(member.nickname);
  const navigate = useNavigate();

  const { memberId } = member;
  const { accessToken } = member;

  const handleEditSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!nickname) {
      alert("변경하실 닉네임을 입력해주세요.");
      return;
    }

    const response = await fetch(
      "http://localhost:11000/api/v1/auth/nickname",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ memberId, nickname }),
      }
    );
    if (!response.ok) {
      alert("정보를 다시 입력해주세요");
    } else {
      alert("닉네임 수정이 완료되었습니다.");
      setMember((prev) => ({
        ...prev,
        nickname,
      }));
      navigate("/edit");
    }
  };

  return (
    <EditNicknameContainer>
      <EditCard>
        <TitleContainer>
          <span>
            <Link to="/edit">
              <IoIosArrowBack />
            </Link>
          </span>
          <p>
            <h1>닉네임 수정</h1>
          </p>
        </TitleContainer>
        <EditForm onSubmit={handleEditSubmit}>
          <Input
            type="text"
            placeholder="변경하실 닉네임을 작성해주세요"
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
          />
          <EditButton type="submit">수정하기</EditButton>
        </EditForm>
      </EditCard>
      <BottomMenuBar />
    </EditNicknameContainer>
  );
};

export default EditNickname;
