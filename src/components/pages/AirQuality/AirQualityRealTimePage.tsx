/* eslint-disable no-shadow */
import React, { useState, useEffect, useCallback } from "react";

import axios from "axios";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import tw from "twin.macro";

import { geolocationState } from "./Geolocation";

const Content = styled.div`
  ${tw`flex-grow flex flex-col items-center justify-center`}
  & > * {
    ${tw`mb-4`}
  }
`;
const GridContainer1 = styled.div`
  ${tw`grid grid-cols-1 gap-1`}
  margin: 5px;
`;
const GridContainer = styled.div`
  ${tw`grid grid-cols-3 gap-1`}
  margin: 5px;
`;
const GridItem = styled.div`
  ${tw`relative w-full h-full rounded-md overflow-hidden`}
  text-align: center;
  justify-content: center;
`;
const GridItemImage1 = styled.img`
  ${tw`w-full h-full object-cover`}
  margin-left: 20%;
  width: 60%;
  height: 40%;
`;
const GridItemImage = styled.img`
  ${tw`w-full h-full object-cover`}
  margin-left: 20%;
  width: 55%;
  height: 40%;
`;
const GridItemTitle = styled.h3`
  ${tw`text-lg font-semibold`}
`;
const GridItemSubtitle = styled.p`
  ${tw`text-gray-500`}
`;

function AirQualityRealTimePage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [geolocation] = useRecoilState(geolocationState);
  const [tmX, setTmX] = useState(null);
  const [tmY, setTmY] = useState(null);
  // Kakao REST API 키
  const kakaoRestApiKey = process.env.REACT_APP_KAKAO_REST_API_KEY;

  // Kakao Map API를 통해 TM 좌표 찾기
  const getTM = useCallback(
    async (latitude, longitude) => {
      try {
        const response = await axios.get(
          `https://dapi.kakao.com/v2/local/geo/transcoord.json?x=${longitude}&y=${latitude}&output_coord=TM`,
          {
            headers: {
              Authorization: `KakaoAK ${kakaoRestApiKey}`,
            },
          }
        );
        setTmX(response.data.documents[0].x);
        setTmY(response.data.documents[0].y);
      } catch (error) {
        console.error(error);
      }
    },
    [kakaoRestApiKey]
  );

  // API를 호출해 실시간 대기질 측정정보 호출
  const getAirQualityRealTime = useCallback(async (tmX, tmY) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/v1/airquality/tm?tmx=${tmX}&tmy=${tmY}`
      );
      setData(response.data);
    } catch (error) {
      setError(error);
    }
  }, []);

  const fetchData = useCallback(async () => {
    if (geolocation.latitude && geolocation.longitude) {
      await getTM(geolocation.latitude, geolocation.longitude);
    }
    if (tmX && tmY) {
      await getAirQualityRealTime(tmX, tmY);
    }
  }, [
    geolocation.latitude,
    geolocation.longitude,
    getAirQualityRealTime,
    getTM,
    tmX,
    tmY,
  ]);

  // 위의 함수들을 포함해서 async/await를 통해 비동기 처리를 해주었습니다.
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  let airQuality;
  let khaiGrade;
  let so2Grade;
  let coGrade;
  let o3Grade;
  let no2Grade;
  let pm10Grade;
  let pm25Grade;

  // getGrade 함수는 등급 값을 받아와서 문자열로 반환하는 함수입니다.
  function getGrade(value) {
    switch (value) {
      case "1":
        return "매우 좋음";
      case "2":
        return "좋음";
      case "3":
        return "나쁨";
      case "4":
        return "매우 나쁨";
      default:
        return "통신 장애";
    }
  }

  if (data) {
    airQuality = data.airQuality;
    khaiGrade = getGrade(airQuality.khaiGrade);
    so2Grade = getGrade(airQuality.so2Grade);
    coGrade = getGrade(airQuality.coGrade);
    o3Grade = getGrade(airQuality.o3Grade);
    no2Grade = getGrade(airQuality.no2Grade);
    pm10Grade = getGrade(airQuality.pm10Grade);
    pm25Grade = getGrade(airQuality.pm25Grade);
  }

  function getGradeImage(grade) {
    switch (grade) {
      case "좋음":
        return "good.png";
      case "매우 좋음":
        return "very_good.png";
      case "나쁨":
        return "bad.png";
      case "매우 나쁨":
        return "very_bad.png";
      default:
        return "error.png";
    }
  }
  const khaiGradeImage = getGradeImage(khaiGrade);
  const so2GradeImage = getGradeImage(so2Grade);
  const coGradeImage = getGradeImage(coGrade);
  const o3GradeImage = getGradeImage(o3Grade);
  const no2GradeImage = getGradeImage(no2Grade);
  const pm10GradeImage = getGradeImage(pm10Grade);
  const pm25GradeImage = getGradeImage(pm25Grade);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (
    geolocation.latitude === null ||
    geolocation.longitude === null ||
    tmX === null ||
    tmY === null ||
    !data
  ) {
    return <div>Loading...</div>;
  }
  return (
    <Content>
      <GridContainer1>
        <GridItem>
          <GridItemTitle>미세먼지</GridItemTitle>
          <GridItemImage1
            src={`/images/${pm10GradeImage}`}
            alt={`${pm10Grade} 이미지`}
          />
          <GridItemSubtitle>{airQuality.pm10Value} μg/m³</GridItemSubtitle>
          <GridItemSubtitle>{pm10Grade}</GridItemSubtitle>
        </GridItem>
      </GridContainer1>
      <GridContainer>
        <GridItem>
          <GridItemTitle>초미세먼지</GridItemTitle>
          <GridItemImage
            src={`/images/${pm25GradeImage}`}
            alt={`${pm25Grade} 이미지`}
          />
          <GridItemSubtitle>{airQuality.pm25Value} μg/m³</GridItemSubtitle>
          <GridItemSubtitle>{pm25Grade}</GridItemSubtitle>
        </GridItem>
        <GridItem>
          <GridItemTitle>통합 대기 환경</GridItemTitle>
          <GridItemImage
            src={`/images/${khaiGradeImage}`}
            alt={`${khaiGrade} 이미지`}
          />
          <GridItemSubtitle>{airQuality.khaiValue}</GridItemSubtitle>
          <GridItemSubtitle>{khaiGrade}</GridItemSubtitle>
        </GridItem>
        <GridItem>
          <GridItemTitle>이산화질소</GridItemTitle>
          <GridItemImage
            src={`/images/${no2GradeImage}`}
            alt={`${no2Grade} 이미지`}
          />
          <GridItemSubtitle>{airQuality.no2Value} ppm</GridItemSubtitle>
          <GridItemSubtitle>{no2Grade}</GridItemSubtitle>
        </GridItem>
        <GridItem>
          <GridItemTitle>오존</GridItemTitle>
          <GridItemImage
            src={`/images/${o3GradeImage}`}
            alt={`${o3Grade} 이미지`}
          />
          <GridItemSubtitle>{airQuality.o3Value} ppm</GridItemSubtitle>
          <GridItemSubtitle>{o3Grade}</GridItemSubtitle>
        </GridItem>
        <GridItem>
          <GridItemTitle>아황산가스</GridItemTitle>
          <GridItemImage
            src={`/images/${so2GradeImage}`}
            alt={`${so2Grade} 이미지`}
          />
          <GridItemSubtitle>{airQuality.so2Value} ppm</GridItemSubtitle>
          <GridItemSubtitle>{so2Grade}</GridItemSubtitle>
        </GridItem>
        <GridItem>
          <GridItemTitle>일산화탄소</GridItemTitle>
          <GridItemImage
            src={`/images/${coGradeImage}`}
            alt={`${coGrade} 이미지`}
          />
          <GridItemSubtitle>{airQuality.coValue} ppm</GridItemSubtitle>
          <GridItemSubtitle>{coGrade}</GridItemSubtitle>
        </GridItem>
      </GridContainer>
    </Content>
  );
}

export default AirQualityRealTimePage;
