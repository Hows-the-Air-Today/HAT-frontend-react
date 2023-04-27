import React, { useEffect, useState } from "react";
import { VscRadioTower } from "react-icons/vsc";

import ProgressBar from "@ramonak/react-progress-bar";
import styled from "styled-components";
import tw from "twin.macro";

import { BaeminJuaFont } from "components/UI/atoms/font/BaeminJuaFont";
import { D2CodingFont } from "components/UI/atoms/font/D2CodingFont";
import {
  getGradeColor,
  getTextGradeColor,
  getCompletedBarColor,
} from "utils/gradeColor";

const GridContainer = styled.div`
  ${tw`grid grid-cols-4 gap-y-4`}
`;

const CardContainer = styled.div`
  ${tw`max-w-full rounded-lg shadow-lg p-4 m-2 flex flex-col items-center bg-opacity-10`}
`;

const StationContainer = styled.div`
  ${tw`text-center items-center justify-center grid grid-rows-1 grid-cols-3 space-x-6`}
`;

const SvgContainer = styled.div`
  ${tw`w-60 h-60 mb-4 items-center justify-center`}
`;

const MainContent = styled.div`
  ${tw`flex flex-col justify-center items-center`}
`;

const MainGradeContainer = styled.div`
  ${tw`text-4xl mb-4 text-center`}
`;

const SubHeader = styled.div`
  ${tw`col-span-2 flex items-center justify-center rounded-md mt-6`}
`;

const SubGrade = styled.div`
  ${tw`text-xl text-center justify-center items-center px-2 py-1 break-words`}
`;

const SubValue = styled.div`
  ${tw`flex rounded-md text-center justify-center text-white text-lg px-2 py-1 break-words`}
`;

const GaugeContainer = styled.div`
  ${tw`relative h-8 items-center`}
`;
interface SpeechBubbleProps {
  show: boolean;
}

const SpeechBubble = styled.div<SpeechBubbleProps>`
  ${tw`absolute flex items-center justify-center text-sm text-white px-2 py-1 rounded-lg border transition-opacity transition-transform duration-300 ease-in-out`}
  opacity: ${(props) => (props.show ? 1 : 0)};
  transform: ${(props) => (props.show ? "scale(1)" : "scale(0.5)")};
`;

const getPercentage = (value: number) => {
  return (value / 500) * 100;
};

type AirQualityCardProps = {
  svgImage: React.ReactNode;
  khaiValue: number;
  khaiGrade: "좋음" | "보통" | "나쁨" | "매우나쁨";
  pm10Value: number;
  pm25Value: number;
  pm10Grade: "좋음" | "보통" | "나쁨" | "매우나쁨";
  pm25Grade: "좋음" | "보통" | "나쁨" | "매우나쁨";
  stationName: string;
  timeAgo: string;
};

const AirQualityCard: React.FC<AirQualityCardProps> = ({
  svgImage,
  khaiValue,
  khaiGrade,
  pm10Value,
  pm25Value,
  pm10Grade,
  pm25Grade,
  stationName,
  timeAgo,
}) => {
  const percentage = getPercentage(khaiValue);
  const indicatorPosition = `calc(${percentage}% - 1rem)`;

  const [showSpeechBubble, setShowSpeechBubble] = useState(false);

  useEffect(() => {
    setShowSpeechBubble(false);

    const animationDuration = 1000;
    const timer = setTimeout(() => {
      setShowSpeechBubble(true);
    }, animationDuration);

    return () => {
      clearTimeout(timer);
    };
  }, [khaiValue]);

  return (
    <BaeminJuaFont>
      <CardContainer className={`${getGradeColor(khaiGrade)}`}>
        <StationContainer>
          <div>{stationName}</div>
          <VscRadioTower />
          <div>{timeAgo}</div>
        </StationContainer>
        <SvgContainer>{svgImage}</SvgContainer>
        <MainContent>
          <MainGradeContainer className={getTextGradeColor(khaiGrade)}>
            {khaiGrade}
          </MainGradeContainer>
          <div className="grid-rows-2 w-full m-2">
            <div
              className="flex items-center mb-6"
              style={{ paddingLeft: indicatorPosition }}
            >
              {showSpeechBubble && (
                <SpeechBubble
                  className={getGradeColor(khaiGrade)}
                  show={showSpeechBubble}
                >
                  {khaiValue}
                </SpeechBubble>
              )}
            </div>
            <div className="m-2" />
            <GaugeContainer>
              <ProgressBar
                className="absolute w-full"
                completed={String(khaiValue)}
                maxCompleted={500}
                bgColor={getCompletedBarColor(khaiGrade)}
                baseBgColor="#FFFFFF"
                width="100%"
                height="25px"
                customLabel=" "
                customLabelStyles={{
                  color: "white",
                  borderRight: "11px dotted white",
                }}
                isLabelVisible
                animateOnRender
              />
              <div
                className="absolute h-6 rounded-lg bg-air-blue opacity-20"
                style={{ width: "10%" }}
              />
              <div
                className="absolute h-6 rounded-lg  bg-air-green opacity-20"
                style={{ width: "10%", left: "10%" }}
              />
              <div
                className="absolute h-6 rounded-lg bg-air-yellow opacity-20"
                style={{ width: "30%", left: "20%" }}
              />
              <div
                className="absolute h-6 rounded-lg  bg-air-red opacity-20"
                style={{ width: "50%", left: "50%" }}
              />
            </GaugeContainer>
          </div>
          <GridContainer>
            <SubHeader>초미세먼지</SubHeader>
            <SubHeader>미세먼지</SubHeader>
            <SubGrade className={getTextGradeColor(pm25Grade)}>
              {pm25Grade}
            </SubGrade>
            <SubValue className={getGradeColor(pm25Grade)}>
              {pm25Value}
              <D2CodingFont>µg/m³</D2CodingFont>
            </SubValue>
            <SubGrade className={getTextGradeColor(pm10Grade)}>
              {pm10Grade}
            </SubGrade>
            <SubValue className={getGradeColor(pm10Grade)}>
              {pm10Value}
              <D2CodingFont>µg/m³</D2CodingFont>
            </SubValue>
          </GridContainer>
        </MainContent>
      </CardContainer>
    </BaeminJuaFont>
  );
};

export default AirQualityCard;
