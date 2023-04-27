import React from "react";

import styled from "styled-components";
import tw from "twin.macro";

import { ReactComponent as Hoodie } from "assets/images/dress/hoodie.svg";
import { ReactComponent as Jacket } from "assets/images/dress/jacket.svg";
import { ReactComponent as LongSleeve } from "assets/images/dress/long_sleeve.svg";
import { ReactComponent as Padding } from "assets/images/dress/padding.svg";
import { ReactComponent as ShortSleeve } from "assets/images/dress/short_sleeve.svg";
import { ReactComponent as Sleeveless } from "assets/images/dress/sleeveless.svg";
import { ReactComponent as TrenchCoat } from "assets/images/dress/trench_coat.svg";
import { ReactComponent as WoolCoat } from "assets/images/dress/wool_coat.svg";
import VilageForecast from "components/UI/atoms/VilageForecast";
import { getTextGradeColor } from "utils/gradeColor";

interface ForecastCardProps {
  label: string;
  x: number;
  y: number;
  dayIndex: number;
  pm10Grade: string;
  pm25Grade: string;
  forecast: any;
}

const CardContainer = styled.div`
  ${tw`max-w-full rounded-lg p-4 m-2 bg-white shadow-lg items-center grid grid-rows-4 grid-cols-2 gap-2`}
`;

const TextCardLabel = styled.h3`
  ${tw`text-xl text-center mb-2 col-span-2`}
`;

const TextCardContent = styled.p`
  ${tw`text-lg text-center`}
`;

const TemperatureIconContainer = styled.div`
  ${tw`text-center items-center justify-center row-span-3`}
`;

const SvgContainer = styled.div`
  ${tw`w-32 h-32 mb-4 items-center justify-center`}
`;

const getTemperatureIcon = (temperature) => {
  if (temperature >= 28) {
    return <Sleeveless width="100%" height="100%" />;
  }
  if (temperature >= 23) {
    return <ShortSleeve width="100%" height="100%" />;
  }
  if (temperature >= 20) {
    return <LongSleeve width="100%" height="100%" />;
  }
  if (temperature >= 17) {
    return <Hoodie width="100%" height="100%" />;
  }
  if (temperature >= 12) {
    return <Jacket width="100%" height="100%" />;
  }
  if (temperature >= 9) {
    return <TrenchCoat width="100%" height="100%" />;
  }
  if (temperature >= 5) {
    return <WoolCoat width="100%" height="100%" />;
  }

  return <Padding width="100%" height="100%" />;
};

const ForecastCard: React.FC<ForecastCardProps> = ({
  label,
  x,
  y,
  dayIndex,
  pm10Grade,
  pm25Grade,
  forecast,
}) => {
  const temperatureIcon = getTemperatureIcon(forecast.tmp);

  return (
    <CardContainer>
      <TextCardLabel>{label}</TextCardLabel>
      <VilageForecast x={x} y={y} dayIndex={dayIndex} forecast={forecast} />
      <TemperatureIconContainer>
        <SvgContainer>{temperatureIcon}</SvgContainer>
      </TemperatureIconContainer>
      <TextCardContent className={getTextGradeColor(pm25Grade)}>
        초미세먼지 {pm25Grade}
      </TextCardContent>
      <TextCardContent className={getTextGradeColor(pm10Grade)}>
        미세먼지 {pm10Grade}
      </TextCardContent>
    </CardContainer>
  );
};

export default ForecastCard;
