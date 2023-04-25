import styled from "styled-components";

export const PopularBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

export const PopularPhotoBox = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

export const CustomSelectStyle = styled.select`
  margin: 10px;
  outline: none;
`;
export const WidthFullPhotoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export const PostsRootBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PopularPhotoImageBox = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
`;

export const PostsNickNameBar = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;
export const PostsPhotoBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const FooterBox = styled.div`
  margin: 10px;

  p {
    margin-bottom: 5px;
  }
`;

export const CommentLikesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 0px;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
`;
