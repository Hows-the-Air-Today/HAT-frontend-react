import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";

import { dummyPopularList } from "./dummy";
import {
  PopularBox,
  PopularPhotoBox,
  PopularPhotoImageBox,
  PostsRootBox,
  WidthFullPhotoImage,
} from "./styles";
// eslint-disable-next-line import/namespace
import { getPost } from "../../../api/community";
import { memberState } from "../../../stores";
import PopularCard from "../../UI/molecules/PopularCard";
import HeaderBar from "../../UI/organisms/Header/HeaderBar";
import PostsCard from "../../UI/organisms/postscard/PostsCard";
import SelectBox from "../../UI/organisms/selectBox";

const CommunityPage: React.FC = () => {
  const [region, setRegion] = React.useState("서울"); // 임

  const [member, setMember] = useRecoilState(memberState);

  const { accessToken } = member;

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ["getPost", region],
      ({ pageParam }) =>
        getPost({
          region,
          limit: 10,
          createdAt: pageParam,
          accessToken,
        }),
      {
        getNextPageParam: (lastPage) => {
          const createdParam =
            lastPage?.data?.data?.postList?.data[
              lastPage.data.data.postList.data.length - 1
            ]?.post?.createdAt;

          return createdParam;
        },
      }
    );

  return (
    <div>
      <HeaderBar title="HAT-커뮤니티" />
      <SelectBox setRegion={setRegion} />
      <PopularCard region={region} />
      <hr />
      {isLoading && <div>데이터를 불러오고 있어요!</div>}
      {data?.pages[0].data?.data?.postList.data.length === 0 && (
        <div>이 지역에는 아직 게시물이 존재하지 않아요!</div>
      )}
      <InfiniteScroll hasMore={hasNextPage} loadMore={() => fetchNextPage()}>
        <PostsRootBox>
          {data?.pages?.map((page) =>
            page?.data?.data?.postList?.data?.map((postData) => (
              <PostsCard
                postDataPost={postData?.post}
                postsDataCommentCount={postData?.commentCount}
                postsDatalikeCount={postData?.likeCount}
                isOpenUpdate={false}
                options={false}
                handleOpenClick={false}
              />
            ))
          )}
        </PostsRootBox>
      </InfiniteScroll>
    </div>
  );
};

export default CommunityPage;
