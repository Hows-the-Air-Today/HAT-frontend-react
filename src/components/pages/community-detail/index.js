import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useRecoilState } from "recoil";

import { deletePost, detailPost } from "../../../api/community";
// eslint-disable-next-line import/extensions
import { memberState } from "../../../stores";
// eslint-disable-next-line import/extensions
import HeaderBar from "../../UI/organisms/Header/HeaderBar";
import PostsCard from "../../UI/organisms/postscard/PostsCard";

const options = [
  { id: 1, title: "수정" },
  { id: 2, title: "삭제" },
];
const CommunityDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [member, setMember] = useRecoilState(memberState);
  const [getData, setGetData] = useState([]);

  const { memberId } = member;
  const { accessToken } = member;

  useEffect(() => {
    if (!location?.state?.postId) {
      navigate("/");
    } else {
      detailPost(location?.state.postId, accessToken)
        .then((res) => setGetData(res?.data?.data))
        .catch((err) => alert("서버와 연결이끊어졌습니다."));
    }
  }, [location?.state?.postId]);

  const handleOpenClick = (type) => {
    switch (type) {
      case "삭제":
        deletePost(location?.state?.postId)
          .then((res) => {
            console.log(res);
            alert("성공적으로 삭제되었습니다.");
            navigate(-1);
          })
          .catch((e) => {
            alert(e?.response?.data?.reason);
          });
        break;
      case "수정":
        navigate("/community-create", {
          state: {
            data: getData,
            type: "수정",
          },
        });
        break;
      default:
        break;
    }
  };

  function refetch() {}

  const likedMembers = getData?.likes
    ?.filter((like) => like?.liked)
    ?.map((like) => like?.memberId);
  const likedMember = likedMembers?.includes(memberId);

  return (
    <div>
      <HeaderBar title="게시물 상세" />
      <PostsCard
        refetch={refetch || null}
        handleOpenClick={handleOpenClick}
        options={options}
        isOpenUpdate="업데이트"
        postDataPost={getData}
        likedMemberId={likedMember}
        postsDataCommentCount={getData?.commentCount}
        postsDatalikeCount={getData?.likeCount}
      />
    </div>
  );
};

export default CommunityDetailPage;
