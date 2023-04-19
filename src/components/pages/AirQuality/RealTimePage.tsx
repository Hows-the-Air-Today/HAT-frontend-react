import React, { useState, useCallback, useEffect } from "react";

import axios from "axios";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import tw from "twin.macro";

import AirQualityRealTimePage from "./AirQualityRealTimePage";
import { geolocationState } from "./Geolocation";
import WeatherRealTimePage from "./WeatherRealTimePage";
import logo from "../../../assets/images/hat-logo-black.png";
import MainPageHeader from "../../UI/organisms/Header/MainPageHeader";
import BottomMenuBar from "../../UI/organisms/Navigation/BottomMenuBar";

const AirQualityContainer = styled.div`
  ${tw`flex flex-col items-center bg-gray-100`}
  height: 100vh;
`;

const Content = styled.div`
  ${tw`flex-grow flex flex-col items-center justify-center`}
`;

const Content1 = styled.div`
  ${tw`flex-grow flex flex-col items-center justify-center`}
  margin-bottom: 12vh;
  margin-right: 7vh;
`;
function RealTimePage() {
  const [geolocation, setGeolocation] = useRecoilState(geolocationState);
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);

  // 현재 위치를 얻는 메서드
  const getGeoLocation = useCallback(() => {
    // 현재 위치를 XY 좌표로 받아옴
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeolocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      // eslint-disable-next-line no-shadow
      (error) => {
        setError(error);
      }
    );
  }, [setGeolocation]);
  const handleNotificationClick = () => {
    console.log("Notification button clicked");
  };

  // Kakao REST API 키
  const kakaoRestApiKey = process.env.REACT_APP_KAKAO_REST_API_KEY;

  // Kakao Map API를 통해 주소를 받아오기
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAddress = useCallback(
    async (latitude, longitude) => {
      try {
        const response = await axios.get(
          `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`,
          {
            headers: {
              Authorization: `KakaoAK ${kakaoRestApiKey}`,
            },
          }
        );
        setAddress(response.data.documents[0].address.address_name);
        // eslint-disable-next-line no-shadow
      } catch (error) {
        console.error(error);
      }
    },
    [kakaoRestApiKey]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = useCallback(async () => {
    getGeoLocation();
    if (geolocation.latitude && geolocation.longitude) {
      await getAddress(geolocation.latitude, geolocation.longitude);
    }
  }, [geolocation.latitude, geolocation.longitude, getAddress, getGeoLocation]);

  // 위의 함수들을 포함해서 async/await를 통해 비동기 처리를 해주었습니다.
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <AirQualityContainer>
      <MainPageHeader
        logoUrl={logo}
        title={address}
        onNotificationClick={handleNotificationClick}
      />
      <div style={{ flex: 1 }}>
        <Content>
          <AirQualityRealTimePage />
        </Content>
        <Content1>
          <WeatherRealTimePage />
        </Content1>
      </div>
      <BottomMenuBar />
    </AirQualityContainer>
  );
}

export default RealTimePage;
