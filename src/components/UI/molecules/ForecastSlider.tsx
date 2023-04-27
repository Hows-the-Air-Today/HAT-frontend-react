import React from "react";
import Slider from "react-slick";

import PropTypes from "prop-types";
import styled from "styled-components";
import tw from "twin.macro";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { BaeminJuaFont } from "components/UI/atoms/font/BaeminJuaFont";

import ForecastCard from "./ForecastCard";

const SliderContainer = styled.div`
  ${tw``}
`;

const StyledSlider = styled(Slider)`
  ${tw``}
`;

const NextArrowStyle = styled.div`
  ${tw``}
`;

const PrevArrowStyle = styled.div`
  ${tw``}
`;

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <NextArrowStyle
      className={className}
      style={{ ...style, background: "black", borderRadius: "100%" }}
      onClick={onClick}
    />
  );
};

NextArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape({
    style: PropTypes.string,
    background: PropTypes.string,
  }),
  onClick: PropTypes.func,
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <PrevArrowStyle
      className={className}
      style={{ ...style, background: "black", borderRadius: "100%" }}
      onClick={onClick}
    />
  );
};

PrevArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape({
    display: PropTypes.string,
    background: PropTypes.string,
  }),
  onClick: PropTypes.func,
};

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

interface ForecastSliderProps {
  x: number;
  y: number;
  pm10Grades: string[];
  pm25Grades: string[];
  vilageForecastData: any[];
}

const labels = ["오늘의 예보", "내일의 예보", "모레의 예보"];

const ForecastSlider: React.FC<ForecastSliderProps> = ({
  x,
  y,
  pm10Grades,
  pm25Grades,
  vilageForecastData,
}) => (
  <BaeminJuaFont>
    <SliderContainer>
      <StyledSlider {...settings}>
        <ForecastCard
          label={labels[0]}
          x={x}
          y={y}
          dayIndex={0}
          pm10Grade={pm10Grades[0]}
          pm25Grade={pm25Grades[0]}
          forecast={vilageForecastData[0]}
        />
        <ForecastCard
          label={labels[1]}
          x={x}
          y={y}
          dayIndex={1}
          pm10Grade={pm10Grades[1]}
          pm25Grade={pm25Grades[1]}
          forecast={vilageForecastData[1]}
        />
        <ForecastCard
          label={labels[2]}
          x={x}
          y={y}
          dayIndex={2}
          pm10Grade={pm10Grades[2]}
          pm25Grade={pm25Grades[2]}
          forecast={vilageForecastData[2]}
        />
      </StyledSlider>
    </SliderContainer>
  </BaeminJuaFont>
);

export default ForecastSlider;
