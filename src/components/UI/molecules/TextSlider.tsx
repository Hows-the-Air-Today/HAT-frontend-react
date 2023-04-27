import React, { Component } from "react";
import Slider from "react-slick";

import PropTypes from "prop-types";
import styled from "styled-components";
import tw from "twin.macro";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { BaeminJuaFont } from "components/UI/atoms/font/BaeminJuaFont";

import TextCard from "./TextCard";

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

type TextCardData = {
  informCause: string;
};

type TextSliderDataType = {
  textCardData: TextCardData[];
};

const labels = ["오늘", "내일", "모레"];

const TextSlider: React.FC<TextSliderDataType> = ({ textCardData }) => (
  <BaeminJuaFont>
    <SliderContainer>
      <StyledSlider {...settings}>
        {textCardData &&
          textCardData.slice(0, 3).map((item, index) => (
            <TextCard
              /* eslint-disable-next-line react/no-array-index-key */
              key={index}
              label={labels[index]}
              text={item.informCause}
            />
          ))}
      </StyledSlider>
    </SliderContainer>
  </BaeminJuaFont>
);

export default TextSlider;
