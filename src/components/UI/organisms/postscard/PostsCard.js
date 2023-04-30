import React, { useState, useEffect } from "react";
import { AiOutlineComment, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useRecoilState } from "recoil";
import { memberState } from "stores/memberState";

import {
  CommentLikesContainer,
  FooterBox,
  IconContainer,
  PostsNickNameBar,
  PostsPhotoBox,
  WidthFullPhotoImage,
} from "../../../pages/Community/styles";
import DropBoxMenu from "../dropBox/DropBoxMenu";

const host = process.env.REACT_APP_HOST;
const community = process.env.REACT_APP_COMMUNITY;

const PostsCard = ({
  isOpenUpdate,
  postsDataCommentCount,
  postsDatalikeCount,
  refetch,
  likedMemberId,
  postDataPost,
  options,
  handleOpenClick,
}) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [member] = useRecoilState(memberState);
  const [likeCount, setLikeCount] = useState(postsDatalikeCount);
  const { memberId } = member;
  const { accessToken } = member;
  const [isLiked, setIsLiked] = useState(likedMemberId);

  useEffect(() => {
    setLikeCount(postsDatalikeCount);
    setIsLiked(likedMemberId);
  }, [postsDatalikeCount, likedMemberId]);

  const handleHeartClick = (postId) => {
    axios
      .post(
        `${host}${community}/${postId}/likes`,
        {
          memberId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        refetch();
        setLikeCount(response.data.data.likeCount);
        setIsLiked(response.data.data.like);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div key={postDataPost?.id}>
      <PostsNickNameBar>
        <div>
          <PostsPhotoBox>
            <img
              src={postDataPost?.memberImage || postDataPost?.memberImageUrl}
              alt="프로필이미지"
            />
          </PostsPhotoBox>
          <span>{postDataPost?.memberNickname}</span>
        </div>
        <div>
          <span>{postDataPost?.region}</span>
        </div>
      </PostsNickNameBar>
      <div>
        <WidthFullPhotoImage
          src={
            !postDataPost?.imageArray
              ? postDataPost?.imageUrl
              : postDataPost?.imageArray[0]?.postImageUrl
          }
          alt=""
        />
      </div>
      <FooterBox>
        <p>{postDataPost?.content}</p>
        <hr />
        <CommentLikesContainer>
          <div className="flex gap-1">
            <IconContainer
              onClick={() =>
                navigate(`/${postDataPost?.id || postDataPost?.postId}/comment`)
              }
            >
              <AiOutlineComment size={33} />
              <p>{postsDataCommentCount} 개</p>
            </IconContainer>
            <IconContainer
              onClick={() =>
                handleHeartClick(postDataPost?.id || postDataPost?.postId)
              }
            >
              {isLiked ? (
                <AiFillHeart size={33} color="red" />
              ) : (
                <AiOutlineHeart size={33} />
              )}
              <p>{likeCount} 개</p>
            </IconContainer>
          </div>
          <div />
          {isOpenUpdate === "업데이트" && (
            <DropBoxMenu
              handleOpenClick={handleOpenClick}
              option={options}
              open={open}
              setOpen={setOpen}
            />
          )}
        </CommentLikesContainer>
      </FooterBox>
    </div>
  );
};

export default PostsCard;
