import React, { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";
import styled from "styled-components";
import tw from "twin.macro";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { getAirQuality } from "api/airQuality";
import { getPMForecast } from "api/pmForecast";
import { fetchVilageForecast } from "api/vilageForecast";
import { ReactComponent as BadAirQualitySvg } from "assets/images/airQuality/airquality_bad.svg";
import { ReactComponent as GoodAirQualitySvg } from "assets/images/airQuality/airquality_good.svg";
import { ReactComponent as VeryBadAirQualitySvg } from "assets/images/airQuality/airquality_very_bad.svg";
import { ReactComponent as VeryGoodAirQualitySvg } from "assets/images/airQuality/airquality_very_good.svg";
import logo from "assets/images/hat-logo-black.png";
import { Loading } from "components/UI/atoms/Loading";
import AirQualityCard from "components/UI/molecules/AirQualityCard";
import ForecastSlider from "components/UI/molecules/ForecastSlider";
import TextSlider from "components/UI/molecules/TextSlider";
import MainPageHeader from "components/UI/organisms/Header/MainPageHeader";
import BottomMenuBar from "components/UI/organisms/Navigation/BottomMenuBar";
import { caclulateAirQualityData } from "services/airQualityService";
import { getInformCause, getInformGradeList } from "services/pmForecastService";
import { locationState, tmCoordState, addressState } from "stores/stores";

interface AirQualityDataType {
  pm10: number;
  pm25: number;
  pm10Grade: "좋음" | "보통" | "나쁨" | "매우나쁨";
  pm25Grade: "좋음" | "보통" | "나쁨" | "매우나쁨";
  khaiValue: number;
  newKhaiGrade: "좋음" | "보통" | "나쁨" | "매우나쁨";
  stationName: string;
  timeAgo: string;
}

const Container = styled.div`
  ${tw`min-h-screen max-w-full flex flex-col items-center justify-center`}
`;

const Content = styled.div`
  ${tw`w-full md:w-3/4 flex-auto flex flex-col items-center justify-center space-y-4`}
`;

const MainPage: React.FC = () => {
  const location = useRecoilValue(locationState);
  const tmCoords = useRecoilValue(tmCoordState);
  const address = useRecoilValue(addressState);

  console.log("location", location);

  const { tmX, tmY } = tmCoords || {};

  const [airQualityData, setAirQualityData] = useState<AirQualityDataType>();
  const [informCauseData, setInformCauseData] =
    useState<{ informCause: string }[]>();
  const [vilageForecastData, setVilageForecastData] = useState<
    {
      sky: string;
      pty: string;
      tmp: string;
    }[]
  >();
  const [pm10Grades, setPm10Grades] = useState<string[]>([]);
  const [pm25Grades, setPm25Grades] = useState<string[]>([]);

  useEffect(() => {
    const fetchAirQualityData = async () => {
      const response = await getAirQuality(tmX, tmY);
      console.log("response", response);
      console.log("response.airQuality", response.data.airQuality);
      if (response) {
        const calculateData = caclulateAirQualityData(response.data.airQuality);
        console.log("calculateData", calculateData);

        setAirQualityData(calculateData);
      }
    };
    if (tmCoords) {
      fetchAirQualityData();
      console.log("airQualityData", airQualityData);
    }
  }, [tmCoords]);

  useEffect(() => {
    const fetchPMForecastData = async () => {
      const response = await getPMForecast();
      console.log("response", response);
      console.log("response.pmForecast", response.data.data.pm10ForecastList);
      if (response) {
        const informCauseList = getInformCause(
          response.data.data.pm10ForecastList
        );
        console.log("informCauseList", informCauseList);

        setInformCauseData(informCauseList);
        console.log("informCauseData", informCauseData);

        const informGrades = getInformGradeList(response.data.data, address);
        console.log("informGrades", informGrades);
        setPm10Grades(informGrades.pm10Grades);
        setPm25Grades(informGrades.pm25Grades);

        console.log("pm10Grades", pm10Grades);
        console.log("pm25Grades", pm25Grades);
      }
    };
    if (address) {
      fetchPMForecastData();
    }
  }, [address]);

  useEffect(() => {
    const fetchData = async () => {
      const vilageForecastList = await fetchVilageForecast(
        location.latitude,
        location.longitude
      );
      setVilageForecastData(vilageForecastList);
      console.log("VilageForecastData_1", vilageForecastList);
    };
    if (address) {
      fetchData();
      console.log("VilageForecastData_2", vilageForecastData);
    }
  }, [address]);

  const getSvgImageForGrade = (grade: string): React.ReactNode => {
    switch (grade) {
      case "좋음":
        return <VeryGoodAirQualitySvg width="100%" height="100%" />;
      case "보통":
        return <GoodAirQualitySvg width="100%" height="100%" />;
      case "나쁨":
        return <BadAirQualitySvg width="100%" height="100%" />;
      case "매우나쁨":
        return <VeryBadAirQualitySvg width="100%" height="100%" />;
      default:
        return null;
    }
  };

  const svgImage = getSvgImageForGrade(airQualityData?.newKhaiGrade);
  const handleNotificationClick = () => {
    console.log("Notification button clicked");
  };

  return (
    <Container>
      <MainPageHeader
        logoUrl={logo}
        title="Main Page"
        onNotificationClick={handleNotificationClick}
      />
      <Content>
        <div className="justify-center">
          {airQualityData ? (
            <>
              <AirQualityCard
                svgImage={svgImage}
                khaiValue={airQualityData.khaiValue}
                khaiGrade={airQualityData.newKhaiGrade}
                pm10Value={airQualityData.pm10}
                pm25Value={airQualityData.pm25}
                pm10Grade={airQualityData.pm10Grade}
                pm25Grade={airQualityData.pm25Grade}
                stationName={airQualityData.stationName}
                timeAgo={airQualityData.timeAgo}
              />
              <div className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mb-8">
                <TextSlider textCardData={informCauseData} />
              </div>
              <div className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
                {location && pm10Grades && pm25Grades && vilageForecastData && (
                  <ForecastSlider
                    x={location.latitude}
                    y={location.longitude}
                    pm10Grades={pm10Grades}
                    pm25Grades={pm25Grades}
                    vilageForecastData={vilageForecastData}
                  />
                )}
              </div>
            </>
          ) : (
            <Loading />
          )}
        </div>
      </Content>
      <BottomMenuBar />
    </Container>
  );
};

export default MainPage;
