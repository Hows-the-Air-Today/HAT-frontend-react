import React from "react";
import InfiniteScroll from "react-infinite-scroller";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";

import { LoadingBox, PostsRootBox } from "./styles";
// eslint-disable-next-line import/namespace
import { getPost } from "../../../api/community";
import logo from "../../../assets/images/hat-logo-black.png";
import { memberState } from "../../../stores";
import { Loading } from "../../UI/atoms/Loading";
import PopularCard from "../../UI/molecules/PopularCard";
import MainPageHeader from "../../UI/organisms/Header/MainPageHeader";
import BottomMenuBar from "../../UI/organisms/Navigation/BottomMenuBar";
import PostsCard from "../../UI/organisms/postscard/PostsCard";
import SelectBox from "../../UI/organisms/selectBox";

const CommunityPage: React.FC = () => {
  const [region, setRegion] = React.useState("서울"); // 임

  const [member, setMember] = useRecoilState(memberState);

  const { memberId } = member;

  const { accessToken } = member;

  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
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
      <MainPageHeader logoUrl={logo} title="Main Page" />
      <SelectBox setRegion={setRegion} />
      <PopularCard region={region} />
      <hr />
      {isLoading && <div>데이터를 불러오고 있어요!</div>}
      {data?.pages[0].data?.data?.postList.data.length === 0 && (
        <div>이 지역에는 아직 게시물이 존재하지 않아요!</div>
      )}
      <InfiniteScroll hasMore={hasNextPage} loadMore={() => fetchNextPage()}>
        <PostsRootBox>
          {data?.pages?.map((page) => {
            return page?.data?.data?.postList?.data?.map((postData) => {
              const likedMembers = postData?.post?.likes
                ?.filter((like) => like?.liked)
                ?.map((like) => like?.memberId);
              const likedMember = likedMembers?.includes(memberId);
              return (
                <PostsCard
                  refetch={refetch}
                  postDataPost={postData?.post}
                  postsDataCommentCount={postData?.commentCount}
                  postsDatalikeCount={postData?.likeCount}
                  likedMemberId={likedMember}
                  isOpenUpdate={false}
                  options={false}
                  handleOpenClick={false}
                />
              );
            });
          })}
        </PostsRootBox>
      </InfiniteScroll>
      {hasNextPage && (
        <LoadingBox>
          <Loading />
        </LoadingBox>
      )}

      <BottomMenuBar />
    </div>
  );
};

export default CommunityPage;
