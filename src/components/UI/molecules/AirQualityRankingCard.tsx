import React from "react";

import styled from "styled-components";
import tw from "twin.macro";

import BronzeCrown from "assets/images/crown/bronzeCrown.svg";
import GoldCrown from "assets/images/crown/goldCrown.svg";
import SilverCrown from "assets/images/crown/silverCrown.svg";
import Default from "assets/images/default.png";
import Busan from "assets/images/sido/Busan.png";
import Chungbuk from "assets/images/sido/Chungbuk.png";
import Chungnam from "assets/images/sido/Chungnam.png";
import Daegu from "assets/images/sido/Daegu.png";
import Daejeon from "assets/images/sido/Daejeon.png";
import Gangwon from "assets/images/sido/Gangwon.png";
import Gwangju from "assets/images/sido/Gwangju.png";
import Gyeongbuk from "assets/images/sido/Gyeongbuk.png";
import Gyeonggi from "assets/images/sido/Gyeonggi.png";
import Gyeongnam from "assets/images/sido/Gyeongnam.png";
import Incheon from "assets/images/sido/Incheon.png";
import Jeju from "assets/images/sido/Jeju.png";
import Jeonbuk from "assets/images/sido/Jeonbuk.png";
import Jeonnam from "assets/images/sido/Jeonnam.png";
import Sejong from "assets/images/sido/Sejong.png";
import Seoul from "assets/images/sido/Seoul.png";
import Ulsan from "assets/images/sido/Ulsan.png";
import { getTextGradeColor } from "utils/gradeColor";

const Card = styled.div`
  ${tw`max-w-full text-center items-center justify-center place-content-center rounded-lg p-4 shadow-lg`}
`;

const Table = styled.table`
  ${tw`w-full text-center items-center justify-center border-collapse`}
  th,
  td {
    ${tw`border-b border-gray-300 py-2 px-1`}
  }
  th {
    ${tw`text-center items-center justify-center font-semibold`}
  }
  tr {
    ${tw`text-center items-center justify-center`}
  }
  tr:nth-child(3n + 1) td:nth-child(5),
  tr:nth-child(3n + 1) td:nth-child(6) {
    ${tw`border-b-0`}
  }
  tr:nth-child(3n + 2) td:nth-child(1),
  tr:nth-child(3n + 2) td:nth-child(2) {
    ${tw`border-b-0`}
  }
`;

const CrownContainer = styled.div`
  ${tw`flex justify-center items-center`}
`;

const ProfileImage = styled.img`
  ${tw`mx-auto items-center justify-center rounded-full w-10 h-10 object-cover`}
`;

const StationName = styled.td`
  ${tw`border-b border-gray-300 py-2 px-1 whitespace-nowrap`}
`;

interface AirQualityRankingData {
  sidoName: string;
  stationName: string;
  khaiGrade: string;
  khaiValue: number;
  pm25Grade: string;
  pm25Value: string;
  pm10Grade: string;
  pm10Value: string;
}

interface AirQualityRankingCardProps {
  rankingData: AirQualityRankingData[];
}

const getGrade = (grade: string): string => {
  switch (grade) {
    case "1":
      return "좋음";
    case "2":
      return "보통";
    case "3":
      return "나쁨";
    case "4":
      return "매우나쁨";
    default:
      return "좋음";
  }
};

const getProfileImage = (sidoName: string) => {
  switch (sidoName) {
    case "강원":
      return Gangwon;
    case "경기":
      return Gyeonggi;
    case "경남":
      return Gyeongnam;
    case "경북":
      return Gyeongbuk;
    case "광주":
      return Gwangju;
    case "대구":
      return Daegu;
    case "대전":
      return Daejeon;
    case "부산":
      return Busan;
    case "서울":
      return Seoul;
    case "세종":
      return Sejong;
    case "울산":
      return Ulsan;
    case "인천":
      return Incheon;
    case "전남":
      return Jeonnam;
    case "전북":
      return Jeonbuk;
    case "제주":
      return Jeju;
    case "충남":
      return Chungnam;
    case "충북":
      return Chungbuk;
    default:
      return Default;
  }
};

const getCrownImage = (index: number) => {
  switch (index) {
    case 0:
      return GoldCrown;
    case 1:
      return SilverCrown;
    case 2:
      return BronzeCrown;
    default:
      return GoldCrown;
  }
};

const AirQualityRankingCard: React.FC<AirQualityRankingCardProps> = ({
  rankingData,
}) => {
  return (
    <Card>
      <Table>
        <thead>
          <tr>
            <th>순위</th>
            <th colSpan={2}>지역</th>
            <th>측정소</th>
            <th colSpan={3}>대기 정보</th>
          </tr>
        </thead>
        <tbody>
          {rankingData.map((data, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={index}>
              <tr>
                <td rowSpan={3}>
                  <CrownContainer>
                    {index < 3 ? (
                      <img
                        src={getCrownImage(index)}
                        alt={`${index + 1} place`}
                        style={{ width: "24px", height: "24px" }}
                      />
                    ) : (
                      index + 1
                    )}
                  </CrownContainer>
                </td>
                <td rowSpan={3}>
                  <ProfileImage
                    src={getProfileImage(data.sidoName)}
                    alt={`${data.sidoName} profile`}
                  />
                </td>
                <td rowSpan={3}>{data.sidoName}</td>
                <StationName
                  rowSpan={3}
                  dangerouslySetInnerHTML={{
                    __html: data.stationName.replace(
                      /\s*\(([^)]+)\)\s*/g,
                      "<br />&nbsp;($1)&nbsp;<br />"
                    ),
                  }}
                />
                <td className={getTextGradeColor(getGrade(data.khaiGrade))}>
                  통합대기
                </td>
                <td className={getTextGradeColor(getGrade(data.khaiGrade))}>
                  {data.khaiValue}
                </td>
              </tr>
              <tr>
                <td className={getTextGradeColor(getGrade(data.pm25Grade))}>
                  초미세먼지
                </td>
                <td className={getTextGradeColor(getGrade(data.pm25Grade))}>
                  {data.pm25Value}
                </td>
              </tr>
              <tr>
                <td className={getTextGradeColor(getGrade(data.pm10Grade))}>
                  미세먼지
                </td>
                <td className={getTextGradeColor(getGrade(data.pm10Grade))}>
                  {data.pm10Value}
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default AirQualityRankingCard;
