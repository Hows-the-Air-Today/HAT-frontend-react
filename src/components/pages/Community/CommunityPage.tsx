import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

import { useInfiniteQuery } from "@tanstack/react-query";

import { dummyPopularList } from "./dummy";
import {
  PopularBox,
  PopularPhotoBox,
  PopularPhotoImageBox,
  PostsRootBox,
  WidthFullPhotoImage,
} from "./styles";
import { getPost } from "../../../api/community";
import HeaderBar from "../../UI/organisms/Header/HeaderBar";
import PostsCard from "../../UI/organisms/postscard/PostsCard";
import SelectBox from "../../UI/organisms/selectBox";

const CommunityPage: React.FC = () => {
  const [region, setRegion] = React.useState("서울"); // 임

  const [popularList, setPopularList] = useState([]);
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ["getPost", region],
      ({ pageParam }) =>
        getPost({ setPopularList, region, limit: 10, createdAt: pageParam }),
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

  console.log(data);
  return (
    <div>
      <HeaderBar title="HAT-커뮤니티" />
      <SelectBox setRegion={setRegion} />
      <PopularBox>
        <span>🌈 인기글</span>
        <PopularPhotoBox>
          {dummyPopularList?.map((item) => (
            <PopularPhotoImageBox key={item?.id}>
              <WidthFullPhotoImage src={item?.imgsrc} alt="이미지" />
            </PopularPhotoImageBox>
          ))}
        </PopularPhotoBox>
      </PopularBox>
      <hr />
      {isLoading && <div>데이터를 불러오고 있어요!</div>}
      {data?.pages[0].data?.data?.postList.data.length === 0 && (
        <div>이 지역에는 아직 게시물이 존재하지 않아요!</div>
      )}
      <InfiniteScroll hasMore={hasNextPage} loadMore={() => fetchNextPage()}>
        <PostsRootBox>
          {data?.pages?.map((page) =>
            page?.data?.data?.postList?.data?.map((postData) => (
              <>
                <PostsCard
                  postDataPost={postData?.post}
                  postsDataCommentCount={postData?.commentCount}
                  postsDatalikeCount={postData?.likeCount}
                  isOpenUpdate={false}
                  options={false}
                  handleOpenClick={false}
                />
              </>
            ))
          )}
        </PostsRootBox>
      </InfiniteScroll>
    </div>
  );
};

export default CommunityPage;
