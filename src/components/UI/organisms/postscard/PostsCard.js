import React from "react";
import { AiOutlineComment, AiOutlineHeart } from "react-icons/ai";

import {
  CommentLikesContainer,
  FooterBox,
  IconContainer,
  PostsNickNameBar,
  PostsPhotoBox,
  WidthFullPhotoImage,
} from "../../../pages/Community/styles";

const PostsCard = ({
  postsDataCommentCount,
  postsDatalikeCount,
  postDataPost,
}) => {
  return (
    <div key={postDataPost?.id}>
      <PostsNickNameBar>
        <div>
          <PostsPhotoBox>
            <img src={postDataPost?.memberImage} alt="프로필이미지" />
          </PostsPhotoBox>
          <span>{postDataPost?.memberNickname}</span>
        </div>
        <span>{postDataPost?.region}</span>
      </PostsNickNameBar>
      <div>
        <WidthFullPhotoImage
          src={postDataPost?.imageArray[0]?.postImageUrl}
          alt=""
        />
      </div>
      <FooterBox>
        <p>{postDataPost?.content}</p>
        <hr />
        <CommentLikesContainer>
          <div className="flex gap-1">
            <IconContainer>
              <AiOutlineComment size={33} />
              <p>{postsDataCommentCount} 개</p>
            </IconContainer>
            <IconContainer>
              <AiOutlineHeart size={33} />
              <p>{postsDatalikeCount} 개</p>
            </IconContainer>
          </div>
        </CommentLikesContainer>
      </FooterBox>
    </div>
  );
};

export default PostsCard;
