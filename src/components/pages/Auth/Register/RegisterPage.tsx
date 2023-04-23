import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styled from "styled-components";
import tw from "twin.macro";

import logo from "../../../../assets/images/hat-logo-black.png";
import BottomMenuBar from "../../../UI/organisms/Navigation/BottomMenuBar";

const RegisterPageContainer = styled.div`
  ${tw`flex flex-col justify-center items-center h-screen bg-gray-100`}
`;

const RegisterCard = styled.div`
  ${tw`flex flex-col justify-center items-center bg-white p-8 rounded-lg shadow-md`}
`;
const Logo = styled.img`
  ${tw`w-60 mr-2`}
`;

const RegisterForm = styled.form`
  ${tw`flex flex-col w-full`}
`;

const RegisterInput = styled.input`
  ${tw`w-full border-2 border-gray-200 p-2 rounded-md outline-none focus:border-blue-500 transition duration-300`}
`;

const RegisterButton = styled.button`
  ${tw`w-full mt-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition duration-300`}
`;

const RegisterPage: React.FC = () => {
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginPasswordCheck, setLoginPasswordCheck] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleSignUpSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch(
      "http://k8s-default-hatingre-74b7349773-1953812321.ap-northeast-2.elb.amazonaws.com/api/v1/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loginId,
          loginPassword,
          loginPasswordCheck,
          email,
          nickname,
        }),
      }
    );

    if (!response.ok) {
      alert("회원가입에 실패하였습니다. 입력 정보를 확인해주세요.");
    } else {
      alert("회원가입이 완료되었습니다.");
      navigate("/login");
    }
  };

  return (
    <RegisterPageContainer>
      <RegisterCard>
        <Link to="/">
          <Logo src={logo} alt="HAT 로고" style={{ marginBottom: "50px" }} />
        </Link>
        <RegisterForm onSubmit={handleSignUpSubmit}>
          <RegisterInput
            style={{ marginBottom: "10px" }}
            type="text"
            placeholder="사용하실 아이디를 입력해주세요."
            value={loginId}
            onChange={(event) => setLoginId(event.target.value)}
          />
          <RegisterInput
            style={{ marginBottom: "10px" }}
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={loginPassword}
            onChange={(event) => setLoginPassword(event.target.value)}
          />
          <RegisterInput
            style={{ marginBottom: "10px" }}
            type="password"
            placeholder="동일한 비밀번호를 입력해주세요."
            value={loginPasswordCheck}
            onChange={(event) => setLoginPasswordCheck(event.target.value)}
          />
          <RegisterInput
            style={{ marginBottom: "10px" }}
            type="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <RegisterInput
            style={{ marginBottom: "10px" }}
            type="text"
            placeholder="사용하실 닉네임을 입력해주세요."
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
          />
          <RegisterButton type="submit">회원가입</RegisterButton>
        </RegisterForm>
        <span>가입한 계정이 있으신가요?</span>
        <a href="/login">로그인 하기</a>
      </RegisterCard>
      <BottomMenuBar />
    </RegisterPageContainer>
  );
};

export default RegisterPage;
