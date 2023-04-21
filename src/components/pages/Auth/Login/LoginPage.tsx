import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useRecoilState } from "recoil";
import styled from "styled-components";
import tw from "twin.macro";

import { memberState } from "stores/memberState";

import logo from "../../../../assets/images/hat-logo-black.png";
import BottomMenuBar from "../../../UI/organisms/Navigation/BottomMenuBar";

const LoginPageContainer = styled.div`
  ${tw`flex flex-col justify-center items-center h-screen bg-gray-100`}
`;

const LoginCard = styled.div`
  ${tw`flex flex-col justify-center items-center bg-white p-8 rounded-lg shadow-md`}
`;
const Logo = styled.img`
  ${tw`w-60 mr-2`}
`;

const LoginForm = styled.form`
  ${tw`flex flex-col w-full`}
`;

const LoginInput = styled.input`
  ${tw`w-full border-2 border-gray-200 p-2 rounded-md outline-none focus:border-blue-500 transition duration-300`}
`;

const LoginButton = styled.button`
  ${tw`w-full mt-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition duration-300`}
`;

const LoginPage: React.FC = () => {
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [member, setMember] = useRecoilState(memberState);
  const navigate = useNavigate();

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch("http://localhost:11000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ loginId, loginPassword }),
    });

    if (!response.ok) {
      alert("로그인에 정보를 다시 입력해주세요");
    } else {
      const data = await response.json();
      setMember(data);
      alert("HAT에 오신 것을 환영합니다.");
      navigate("/my-page");
    }
  };

  return (
    <LoginPageContainer>
      <LoginCard>
        <Link to="/">
          <Logo src={logo} alt="HAT 로고" style={{ marginBottom: "50px" }} />
        </Link>
        <LoginForm onSubmit={handleLoginSubmit}>
          <LoginInput
            style={{ marginBottom: "10px" }}
            type="text"
            placeholder="아이디"
            value={loginId}
            onChange={(event) => setLoginId(event.target.value)}
          />
          <LoginInput
            style={{ marginBottom: "10px" }}
            type="password"
            placeholder="비밀번호"
            value={loginPassword}
            onChange={(event) => setLoginPassword(event.target.value)}
          />
          <LoginButton type="submit">로그인</LoginButton>
        </LoginForm>
        <span>계정이 없으신가요?</span>
        <a href="/register">가입하기</a>
      </LoginCard>
      <BottomMenuBar />
    </LoginPageContainer>
  );
};

export default LoginPage;
