import React, { useState, useEffect } from "react";
import { BsSnow2 } from "react-icons/bs";
import { GiHeavyRain } from "react-icons/gi";
import { IoIosPartlySunny, IoIosCloudy } from "react-icons/io";
import { IoSunny } from "react-icons/io5";
import { WiRain, WiRainMix } from "react-icons/wi";

import { TextLoading } from "components/UI/atoms/TextLoading";

interface VilageForecastProps {
  x: number;
  y: number;
  dayIndex: number;
  forecast: any;
}

const getWeatherIcon = (sky, pty) => {
  if (pty === "1") {
    return <WiRain />;
  }
  if (pty === "2") {
    return <WiRainMix />;
  }
  if (pty === "3") {
    return <BsSnow2 />;
  }
  if (pty === "4") {
    return <GiHeavyRain />;
  }
  if (sky === "1") {
    return <IoSunny />;
  }
  if (sky === "3") {
    return <IoIosPartlySunny />;
  }
  if (sky === "4") {
    return <IoIosCloudy />;
  }
  return null;
};

const VilageForecast: React.FC<VilageForecastProps> = ({
  x,
  y,
  dayIndex,
  forecast,
}) => {
  console.log("forecast", forecast);

  if (!forecast) {
    return <TextLoading />;
  }

  const { sky, pty, tmp } = forecast;

  return forecast ? (
    <div className="flex flex-row gap-1 align-middle text-center justify-center items-center">
      {getWeatherIcon(sky, pty)}
      <div className="align-middle">{tmp}°C</div>
    </div>
  ) : (
    <TextLoading />
  );
};

export default VilageForecast;
