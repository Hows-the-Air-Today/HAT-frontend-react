import React, { useState } from "react";
import { AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import {
  CommentLikesContainer,
  FooterBox,
  IconContainer,
  PostsNickNameBar,
  PostsPhotoBox,
  WidthFullPhotoImage,
} from "../../../pages/Community/styles";
import DropBoxMenu from "../dropBox/DropBoxMenu";

const PostsCard = ({
  isOpenUpdate,
  postsDataCommentCount,
  postsDatalikeCount,
  postDataPost,
  options,
  handleOpenClick,
}) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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
              onClick={() => navigate(`/${postDataPost?.id}/comment`)}
            >
              <AiOutlineComment size={33} />
              <p>{postsDataCommentCount} 개</p>
            </IconContainer>
            <IconContainer>
              <AiOutlineHeart size={33} />
              <p>{postsDatalikeCount} 개</p>
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
