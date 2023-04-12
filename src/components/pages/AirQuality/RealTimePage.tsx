/* eslint-disable no-shadow */
import React, { useState, useEffect } from "react";

import axios from "axios";

function RealTimePage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [tmX, setTmX] = useState(null);
  const [tmY, setTmY] = useState(null);
  const [address, setAddress] = useState("");

  // Kakao REST API 키
  const KAKAO_REST_API_KEY = "48cae68a1cdf83cb860fd9382d7190f5";

  // 현재 위치를 얻는 메서드
  const getGeoLocation = () => {
    // 현재 위치를 XY 좌표로 받아옴
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      // eslint-disable-next-line no-shadow
      (error) => {
        setError(error);
      }
    );
  };

  // Kakao Map API를 통해 주소를 받아오기
  const getAddress = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`,
        {
          headers: {
            Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
          },
        }
      );
      setAddress(response.data.documents[0].address.address_name);
    } catch (error) {
      console.error(error);
    }
  };

  // Kakao Map API를 통해 TM 좌표 찾기
  const getTM = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/geo/transcoord.json?x=${longitude}&y=${latitude}&output_coord=TM`,
        {
          headers: {
            Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
          },
        }
      );
      setTmX(response.data.documents[0].x);
      setTmY(response.data.documents[0].y);
    } catch (error) {
      console.error(error);
    }
  };

  // API를 호출해 실시간 대기질 측정정보 호출
  const getAirQualityRealTime = async (tmX, tmY) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/v1/airquality/tm?tmX=${tmX}&tmY=${tmY}`
      );
      setData(response.data);
    } catch (error) {
      setError(error);
    }
  };

  // 위의 함수들을 포함해서 async/await를 통해 비동기 처리를 해주었습니다.
  useEffect(() => {
    const fetchData = async () => {
      await getGeoLocation();
      if (latitude && longitude) {
        await getAddress(latitude, longitude);
        await getTM(latitude, longitude);
      }
      if (tmX && tmY) {
        await getAirQualityRealTime(tmX, tmY);
      }
    };
    fetchData();
  }, [latitude, longitude, tmX, tmY]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (
    latitude === null ||
    longitude === null ||
    address === "" ||
    tmX === null ||
    tmY === null ||
    !data
  ) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <p>{JSON.stringify(data)}</p>
      <p>현재위치 : {address}</p>
    </div>
  );
}

export default RealTimePage;
