import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import tw from "twin.macro";

import { memberState } from "stores/memberState";

import BottomMenuBar from "../../../UI/organisms/Navigation/BottomMenuBar";

const ChangePasswordContainer = styled.div`
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

const host = process.env.REACT_APP_HOST;
const memberUrl = process.env.REACT_APP_MEMBER;

const ChangePassword: React.FC = () => {
  const [member, setMember] = useRecoilState(memberState);
  const [loginPassword, setLoginPassword] = useState("");
  const [loginPasswordCheck, setLoginPasswordCheck] = useState("");
  const navigate = useNavigate();

  const { memberId } = member;
  const { accessToken } = member;

  const handleEditSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch(`${host}${memberUrl}/password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ memberId, loginPassword, loginPasswordCheck }),
    });
    if (!response.ok) {
      alert("정보를 다시 입력해주세요");
    } else {
      alert("비밀번호 변경이 완료되었습니다.");
      member.memberState(null);
      navigate("/");
    }
  };

  useEffect(() => {
    setMember((prev) => ({
      ...prev,
      loginPassword,
    }));
  }, [loginPassword]);

  return (
    <ChangePasswordContainer>
      <EditCard>
        <TitleContainer>
          <span>
            <Link to="/edit">
              <IoIosArrowBack />
            </Link>
          </span>
          <p>
            <h1>비밀번호 변경하기</h1>
          </p>
        </TitleContainer>
        <EditForm onSubmit={handleEditSubmit}>
          <Input
            type="password"
            placeholder="변경하실 비밀번호를 작성해주세요"
            value={loginPassword}
            onChange={(event) => setLoginPassword(event.target.value)}
          />
          <Input
            type="password"
            placeholder="변경하실 비밀번호를 다시 작성해주세요"
            value={loginPasswordCheck}
            onChange={(event) => setLoginPasswordCheck(event.target.value)}
          />
          <EditButton type="submit">변경하기</EditButton>
        </EditForm>
      </EditCard>
      <BottomMenuBar />
    </ChangePasswordContainer>
  );
};

export default ChangePassword;
