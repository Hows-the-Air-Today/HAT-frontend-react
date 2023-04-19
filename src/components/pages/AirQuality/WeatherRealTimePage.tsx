/* eslint-disable no-shadow */
import React, { useState, useEffect, useCallback } from "react";

import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useRecoilState } from "recoil";

import { geolocationState } from "./Geolocation";
// 격자 X, Y의 값을 구해주는 메서드
function grid(v1, v2) {
  const RE = 6371.00877; // 지구 반경(km)
  const GRID = 5.0; // 격자 간격(km)
  const SLAT1 = 30.0; // 투영 위도1(degree)
  const SLAT2 = 60.0; // 투영 위도2(degree)
  const OLON = 126.0; // 기준점 경도(degree)
  const OLAT = 38.0; // 기준점 위도(degree)
  const XO = 43; // 기준점 X좌표(GRID)
  const YO = 136; // 기1준점 Y좌표(GRID)

  const DEGRAD = Math.PI / 180.0;
  // const RADDEG = 180.0 / Math.PI;

  const re = RE / GRID;
  const slat1 = SLAT1 * DEGRAD;
  const slat2 = SLAT2 * DEGRAD;
  const olon = OLON * DEGRAD;
  const olat = OLAT * DEGRAD;

  let sn =
    Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
    Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
  let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sf = (sf ** sn * Math.cos(slat1)) / sn;
  let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  ro = (re * sf) / ro ** sn;
  const rs = { x: 0, y: 0 };

  let ra = Math.tan(Math.PI * 0.25 + v1 * DEGRAD * 0.5);
  ra = (re * sf) / ra ** sn;

  let theta = v2 * DEGRAD - olon;
  if (theta > Math.PI) {
    theta -= 2.0 * Math.PI;
  }
  if (theta < -Math.PI) {
    theta += 2.0 * Math.PI;
  }
  theta *= sn;
  rs.x = Math.floor(ra * Math.sin(theta) + XO + 0.5);
  rs.y = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);

  const x = Math.floor(rs.x);
  const y = Math.floor(rs.y);
  return { x, y };
}

// 현재 시간을 받아오는 함수
function CurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  let day = now.getDate();
  let hour = now.getHours();
  const minute = now.getMinutes();

  // 현재 시간에서 30분 뺀 시간 계산
  const prevTime = new Date(now.getTime() - 30 * 60000);
  const prevDay = prevTime.getDate();
  const prevHour = prevTime.getHours();

  // 만약 현재 시간에서 30분이 지나지 않았다면, 이전 시간 사용
  if (minute < 30) {
    hour = prevHour;
    if (hour === 23) {
      day = prevDay;
    }
  }
  // 항상 00시 30분을 기준으로 API를 호출할 수 있게 선언.
  const formattedDate = `${year}${month.toString().padStart(2, "0")}${day
    .toString()
    .padStart(2, "0")}`;
  const formattedTime = `${hour.toString().padStart(2, "0")}30`;
  return {
    date: formattedDate,
    time: formattedTime,
  };
}
function WeatherRealTimePage() {
  const [geolocation] = useRecoilState(geolocationState);
  const [weatherDataResponse, setWeatherDataResponse] = useState(null); // 날씨 데이터 state 변수 추가
  const { date, time } = CurrentDateTime(); // CurrentDateTime 함수 사용
  const [error, setError] = useState(null);

  // 인증키
  const openApiKey = process.env.REACT_APP_OPEN_API_KEY;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getWeatherRealTime = useCallback(async () => {
    try {
      // 현재 위치 정보를 이용해 grid 함수 호출하여 URL 문자열 생성
      const { x, y } = grid(geolocation.latitude, geolocation.longitude);
      // axios를 사용해 JSON 데이터를 요청하고 받아옴
      const response = await axios.get(
        `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${openApiKey}&numOfRows=1000&pageNo=1&dataType=json&base_date=${date}&base_time=${time}&nx=${Math.floor(
          x
        )}&ny=${Math.floor(y)}`
      );
      setWeatherDataResponse(response.data); // 받아온 데이터를 state 변수에 저장
    } catch (error) {
      setError(error);
    }
  }, [date, geolocation.latitude, geolocation.longitude, openApiKey, time]);

  const fetchData = useCallback(async () => {
    await getWeatherRealTime();
  }, [getWeatherRealTime]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (
    geolocation.latitude === null ||
    geolocation.longitude === null ||
    !weatherDataResponse
  ) {
    return <div>Loading...</div>;
  }

  const filteredData = weatherDataResponse.response.body.items.item.filter(
    (item) => {
      return ["T1H"].includes(item.category);
    }
  );

  const data = filteredData.map((item) => ({
    category: item.category,
    fcstValue: item.fcstValue,
    fcstTime: `${item.fcstTime.substr(0, 2)}시`,
  }));

  return (
    <LineChart width={400} height={150} data={data}>
      <XAxis dataKey="fcstTime" />
      <YAxis dataKey="fcstValue" />
      <Line
        type="monotone"
        dataKey="fcstValue"
        stroke="#8884d8"
        name="기온(℃)"
      />
      <Tooltip active />
      <Legend />
    </LineChart>
  );
}
export default WeatherRealTimePage;
