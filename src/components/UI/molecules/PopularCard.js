import React, { useEffect, useState } from "react";

import { useRecoilState } from "recoil";

import { getPopular } from "../../../api/community";
// eslint-disable-next-line import/extensions
import { memberState } from "../../../stores";
import {
  PopularBox,
  PopularPhotoBox,
  PopularPhotoImageBox,
  WidthFullPhotoImage,
} from "../../pages/Community/styles";

const PopularCard = ({ region }) => {
  const [member, setMember] = useRecoilState(memberState);
  const [popularData, setPopularData] = useState([]);

  const { accessToken } = member;

  useEffect(() => {
    getPopular(region, accessToken)
      .then((res) => {
        setPopularData(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
        alert("서버와 연결이 끊어졌습브니다");
      });
  }, [region]);

  return (
    <PopularBox>
      <span>🌈 인기글</span>
      <PopularPhotoBox>
        {popularData?.map((item) => (
          <PopularPhotoImageBox key={item?.postId}>
            <WidthFullPhotoImage src={item?.imageUrl} alt="이미지" />
          </PopularPhotoImageBox>
        ))}
      </PopularPhotoBox>
    </PopularBox>
  );
};
export default PopularCard;
