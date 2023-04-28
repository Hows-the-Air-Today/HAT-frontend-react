import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import tw from "twin.macro";

import { memberState } from "stores/memberState";

import BottomMenuBar from "../../../UI/organisms/Navigation/BottomMenuBar";

const WithdrawalContainer = styled.div`
  ${tw`flex flex-col justify-center items-center h-screen bg-gray-100`}
`;

const WithdrawalCard = styled.div`
  ${tw`flex flex-col justify-center items-center bg-white p-8 rounded-lg shadow-md`}
  & > h1 {
    ${tw`font-bold text-center text-lg mb-4`}
  }
  width: 80%;
  display: flex;
  align-items: center;
`;

const WithdrawalForm = styled.form`
  ${tw`flex flex-col w-full`}
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

const CheckContainer = styled.div`
  ${tw`pb-2 my-2 flex items-center justify-center`}
  width: 100%;
  display: flex;
  align-items: center;
`;

const WithdrawalCheckbox = styled.input`
  ${tw`w-4 h-4 mr-2 outline-none`}
`;

const WithdrawalButton = styled.button`
  ${tw`w-full mt-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition duration-300`}
`;

const TextCardContainer = styled.div`
  ${tw`max-w-sm rounded-lg overflow-hidden shadow-md bg-white`}
  width: 100%;
`;

const TextCardContent = styled.div`
  ${tw`p-4`}
`;

const TextCardTitle = styled.h2`
  ${tw`text-lg font-bold mb-2 text-center text-red-500`}
`;

const TextCardDescription = styled.p`
  ${tw`text-gray-700`}
  display: flex;
  flex-direction: column;
  line-height: 1.5;
  margin: 16px;
`;

const host = process.env.REACT_APP_HOST;
const memberUrl = process.env.REACT_APP_MEMBER;

const WithdrawalMember: React.FC = () => {
  const [member, setMember] = useRecoilState(memberState);
  const [isWithdrawalConfirmed, setIsWithdrawalConfirmed] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();

  const { memberId } = member;
  const { accessToken } = member;

  const handleWithdrawalSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isChecked) {
      alert("서비스 탈퇴를 위해 동의해주세요.");
      return;
    }

    const response = await fetch(`${host}${memberUrl}/${memberId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ memberId }),
    });
    if (!response.ok) {
      alert("서비스 탈퇴에 실패했습니다. 다시 시도해주세요.");
    } else {
      alert("서비스 탈퇴가 완료되었습니다.");
      setMember(null);
      navigate("/");
    }
  };
  return (
    <WithdrawalContainer>
      <WithdrawalCard>
        <TitleContainer>
          <span>
            <Link to="/edit">
              <IoIosArrowBack />
            </Link>
          </span>
          <p>
            <h1>서비스 탈퇴</h1>
          </p>
        </TitleContainer>
        <TextCardContainer>
          <TextCardContent>
            <TextCardTitle>주의 사항</TextCardTitle>
            <TextCardDescription>
              <span>✅ 회원님께서 가입하신 모든 정보는 모두 삭제 됩니다.</span>
              <span>✅ 정말로 탈퇴를 원하시나요? 🥹 </span>
            </TextCardDescription>
          </TextCardContent>
        </TextCardContainer>
        <WithdrawalForm onSubmit={handleWithdrawalSubmit}>
          <CheckContainer>
            <span>동의하기</span>
            <WithdrawalCheckbox
              type="checkbox"
              id="withdrawal-checkbox"
              onChange={() => setIsChecked(!isChecked)}
              checked={isChecked}
            />
          </CheckContainer>
          <WithdrawalButton type="submit">탈퇴하기</WithdrawalButton>
        </WithdrawalForm>
      </WithdrawalCard>
      <BottomMenuBar />
    </WithdrawalContainer>
  );
};

export default WithdrawalMember;
