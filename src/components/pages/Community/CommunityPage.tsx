import React, { useEffect, useRef, useState } from "react";
import { AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import { RiMore2Fill } from "react-icons/ri";
import InfiniteScroll from "react-infinite-scroller";

import { useInfiniteQuery, useMutation } from "@tanstack/react-query";

import { dummyPopularList } from "./dummy";
import {
  CommentLikesContainer,
  FooterBox,
  IconContainer,
  PopularBox,
  PopularPhotoBox,
  PopularPhotoImageBox,
  PostsNickNameBar,
  PostsPhotoBox,
  PostsRootBox,
  WidthFullPhotoImage,
} from "./styles";
import { deletePost, getPost } from "../../../api/community";
import DropBoxMenu from "../../UI/organisms/dropBox/DropBoxMenu";
import HeaderBar from "../../UI/organisms/Header/HeaderBar";
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

  useEffect(() => {
    if (!hasNextPage && !isLoading) {
      alert("마지막 페이지입니다.");
    }
  }, [hasNextPage]);

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
              <div key={postData?.post?.id}>
                <PostsNickNameBar>
                  <div>
                    <PostsPhotoBox>
                      <img
                        src={postData?.post?.memberImage}
                        alt="프로필이미지"
                      />
                    </PostsPhotoBox>
                    <span>{postData?.post?.memberNickname}</span>
                  </div>
                  <span>{postData?.post?.region}</span>
                </PostsNickNameBar>
                <div>
                  <WidthFullPhotoImage
                    src={postData?.post?.imageArray[0]?.postImageUrl}
                    alt=""
                  />
                </div>
                <FooterBox>
                  <p>{postData?.post?.content}</p>
                  <hr />
                  <CommentLikesContainer>
                    <div className="flex gap-1">
                      <IconContainer>
                        <AiOutlineComment size={33} />
                        <p>{postData?.commentCount} 개</p>
                      </IconContainer>
                      <IconContainer>
                        <AiOutlineHeart size={33} />
                        <p>{postData?.likeCount} 개</p>
                      </IconContainer>
                    </div>
                  </CommentLikesContainer>
                </FooterBox>
              </div>
            ))
          )}
        </PostsRootBox>
      </InfiniteScroll>
    </div>
  );
};

export default CommunityPage;
