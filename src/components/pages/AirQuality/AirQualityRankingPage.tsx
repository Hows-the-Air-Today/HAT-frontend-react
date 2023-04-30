import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import Switch from "react-switch";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import tw from "twin.macro";

import { getAirQualityRanking } from "api/airQuality";
import logo from "assets/images/hat-logo-black.png";
import { BaeminJuaFont } from "components/UI/atoms/font/BaeminJuaFont";
import { Loading } from "components/UI/atoms/Loading";
import AirQualityRankingCard from "components/UI/molecules/AirQualityRankingCard";
import MainPageHeader from "components/UI/organisms/Header/MainPageHeader";
import BottomMenuBar from "components/UI/organisms/Navigation/BottomMenuBar";
import { addressState } from "stores/stores";
import { getTextGradeColor } from "utils/gradeColor";

const Container = styled.div`
  ${tw`min-h-screen max-w-full flex flex-col items-center justify-center overflow-x-hidden`}
`;

const Content = styled.div`
  ${tw`w-full flex-auto flex flex-col items-center justify-center space-y-4`}
`;

const RegionTitle = styled.div`
  ${tw`flex justify-center items-center text-lg mb-4`}
`;

const ColoredRegion = styled.span.attrs<{ color: string }>(({ color }) => ({
  className: color,
}))<{ color: string }>`
  ${tw`font-bold mx-2`}
`;

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

const AirQualityRankingPage = () => {
  const address = useRecoilValue(addressState);

  const [airQualityRankingData, setAirQualityRankingData] = useState<any>();
  const [isBest, setIsBest] = useState(true);
  const [bestRegion, setBestRegion] = useState("");
  const [worstRegion, setWorstRegion] = useState("");
  const [bestKhaiGrade, setBestKhaiGrade] = useState("");
  const [worstKhaiGrade, setWorstKhaiGrade] = useState("");

  const sliderRef = useRef<Slider>(null);
  const handleToggleChange = (checked: boolean) => {
    setIsBest(!checked);

    // 토글이 on 상태일 때 (checked가 true일 때) 다음 슬라이드로 이동 (index 1)
    // 토글이 off 상태일 때 (checked가 false일 때) 이전 슬라이드로 이동 (index 0)
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(checked ? 1 : 0);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current) => setIsBest(current === 0),
  };

  useEffect(() => {
    const fetchAirQualityRanking = async () => {
      const response = await getAirQualityRanking();

      if (response) {
        console.log("response", response);

        const { data } = response.data;

        setAirQualityRankingData(data);

        // 최상위 지역명 설정
        setBestRegion(data.bestRankingList[0].sidoName);
        setWorstRegion(data.worstRankingList[0].sidoName);

        // 최상위 khaiGrade 값 설정
        setBestKhaiGrade(data.bestRankingList[0].khaiGrade);
        setWorstKhaiGrade(data.worstRankingList[0].khaiGrade);
      }
    };

    if (!airQualityRankingData) {
      fetchAirQualityRanking();
    }
  }, []);

  return (
    <BaeminJuaFont>
      <Container>
        <MainPageHeader logoUrl={logo} title="지역별 랭킹" />
        <Content>
          {airQualityRankingData ? (
            <>
              <Switch
                onChange={handleToggleChange}
                checked={!isBest}
                onColor="#bbbbb7"
                onHandleColor="#F05252"
                offColor="#bbbbb7"
                offHandleColor="#76A9FA"
                width={140}
                height={30}
                handleDiameter={30}
                borderRadius={15}
                uncheckedIcon={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "150%",
                      height: "100%",
                      color: "white",
                      backgroundColor: "#bbbbb7",
                      borderRadius: 15,
                      fontSize: "medium",
                      letterSpacing: "4px",
                    }}
                  >
                    WORST
                  </div>
                }
                uncheckedHandleIcon={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "200%",
                      height: "100%",
                      color: "white",
                      backgroundColor: "#76A9FA",
                      borderRadius: 15,
                      fontSize: "medium",
                      letterSpacing: "4px",
                    }}
                  >
                    BEST
                  </div>
                }
                checkedIcon={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "150%",
                      height: "100%",
                      paddingLeft: 10,
                      color: "white",
                      borderRadius: 15,
                      fontSize: "medium",
                      letterSpacing: "4px",
                    }}
                  >
                    BEST
                  </div>
                }
                checkedHandleIcon={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "250%",
                      height: "100%",
                      color: "white",
                      backgroundColor: "#F05252",
                      borderRadius: 15,
                      fontSize: "medium",
                      letterSpacing: "4px",
                    }}
                  >
                    WORST
                  </div>
                }
              />
              <RegionTitle>
                {isBest
                  ? "현재 가장 쾌적한 지역은"
                  : "현재 가장 쾌적하지 않은 지역은"}
                <ColoredRegion
                  color={
                    isBest
                      ? getTextGradeColor(getGrade(bestKhaiGrade))
                      : getTextGradeColor(getGrade(worstKhaiGrade))
                  }
                >
                  {isBest ? bestRegion : worstRegion}
                </ColoredRegion>
                {"입니다."}
              </RegionTitle>
              <div className="w-screen max-w-min flex-wrap mb-8 items-center justify-center">
                <Slider {...settings} ref={sliderRef}>
                  <AirQualityRankingCard
                    rankingData={airQualityRankingData.bestRankingList}
                  />
                  <AirQualityRankingCard
                    rankingData={airQualityRankingData.worstRankingList}
                  />
                </Slider>
              </div>
            </>
          ) : (
            <Loading />
          )}
        </Content>
        <BottomMenuBar />
      </Container>
    </BaeminJuaFont>
  );
};

export default AirQualityRankingPage;
