import React from "react";

import styled from "styled-components";
import tw from "twin.macro";

interface TextCardProps {
  label: string;
  text: string;
}

const CardContainer = styled.div`
  ${tw`max-w-full rounded-lg p-4 m-2 bg-white shadow-lg items-center`}
`;

const TextCardLabel = styled.h3`
  ${tw`text-xl text-center mb-2`}
`;

const TextCardContent = styled.p`
  ${tw`text-lg text-center`}
`;

const TextCard: React.FC<TextCardProps> = ({ label, text }) => {
  return (
    <CardContainer>
      <TextCardLabel>{label}</TextCardLabel>
      <TextCardContent>{text}</TextCardContent>
    </CardContainer>
  );
};

export default TextCard;
