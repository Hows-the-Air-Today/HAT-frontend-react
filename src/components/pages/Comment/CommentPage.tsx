import { UUID } from "crypto";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import tw from "twin.macro";

import HeaderBar from "components/UI/organisms/Header/HeaderBar";
import { memberState } from "stores/memberState";

import CommentMenuPage from "./CommentMenuPage";
import timeForToday from "./TimeForToday";
import BottomMenuBar from "../../UI/organisms/Navigation/BottomMenuBar";

const Container = styled.div`
  ${tw`min-h-screen flex flex-col items-center justify-center bg-gray-100`}
`;

const Content = styled.div`
  ${tw`w-full max-w-lg flex-grow flex flex-col space-y-2 mt-2 mb-36`}
`;

const LoadMoreButton = styled.button`
  ${tw`py-2 px-4 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600`}
`;

const CommentContainer = styled.div`
  ${tw`w-full max-w-lg p-4 rounded-lg shadow-md bg-white`}
`;

const Comment = styled.div`
  ${tw`flex items-center my-2`}
`;

const CommentAvatar = styled.img`
  ${tw`w-14 h-14 rounded-full border border-black`}
`;

const CommentContent = styled.div`
  ${tw`flex flex-col ml-4 mr-4`}
`;

const Commentheader = styled.div`
  ${tw`grid grid-flow-row-dense grid-cols-5`}
`;

const CommentAuthor = styled.div`
  ${tw`font-bold col-span-4`}
`;

const CommentText = styled.div`
  ${tw`mt-2 mb-2 mr-4`}
`;

const CommentDate = styled.div`
  ${tw`text-gray-500 text-sm`}
`;

const Editbutton = styled.button`
  ${tw`mt-4 mb-2 ml-3 py-1 px-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500`}
`;

const CommentInputContainer = styled.div`
  ${tw`w-full max-w-lg p-4 rounded-lg shadow-md bg-white mb-9 `}
  position: fixed;
  bottom: 0;
  & > * {
    ${tw`mb-4`}
  }
`;

const CommentInput = styled.input`
  ${tw`w-8/12 h-12 px-4 py-2 border border-gray-400 rounded`}
`;

const CommentSubmitButton = styled.button`
  ${tw`w-3/12 ml-6  py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600`}
`;

const NotException = styled.div`
  ${tw`mt-52 ml-32 items-center justify-center`}
`;

const EditForm = styled.div`
  ${tw`mt-2 mb-2`}
`;

const host = process.env.REACT_APP_HOST;
const community = process.env.REACT_APP_COMMUNITY;

export const CommentPage: React.FC = () => {
  const [comments, setComments] = useState([]);
  const [noComment, setNoComment] = useState(false);
  const [page, setPage] = useState(0);
  const { postId } = useParams();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [InputComment, setInputComment] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [member] = useRecoilState(memberState);
  const [Editing, setEditing] = useState(false);
  const [cId, setCId] = useState("");
  const { memberId } = member;
  const { nickname } = member;
  const { memberProfileImage } = member;
  const { accessToken } = member;

  const handleClick = (text: boolean, id: UUID, cContent: string) => {
    setEditing(text);
    setCId(id);
    setCommentContent(cContent);
  };

  const deleteComment = (commentId: string): void => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.commentId !== commentId)
    );
  };

  const createComment = (content) => {
    axios
      .post(
        `${host}${community}/${postId}/comments`,
        {
          content,
          memberId,
          nickname,
          memberProfileImage,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        const newComment = response.data.data;
        setComments((prevComments) => [newComment, ...prevComments]);
        window.scrollTo(0, 0);
        setNoComment(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputComment(event.target.value);
  };

  const handleCommentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (InputComment) {
      createComment(InputComment);
      setInputComment("");
    } else {
      alert("댓글을 입력해주세요.");
    }
  };

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${host}${community}/${postId}/comments?page=${page}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setComments((prevComments) => {
          if (page === 0) {
            return response.data.data.commentPageDTOList;
          }
          return [...prevComments, ...response.data.data.commentPageDTOList];
        });
        setHasMore(response.data.data.hasNext);
        setLoading(false);
        if (!hasMore && response.data.data.commentPageDTOList.length === 0) {
          setNoComment(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setNoComment(true);
      });
  }, [page]);

  const handleLoadMoreClick = () => {
    if (loading || !hasMore) {
      return;
    }

    setPage((prevPage) => prevPage + 1);
  };

  const updateComment = (commentId: string): void => {
    if (commentContent) {
      axios
        .patch(
          `${host}${community}/${postId}/comments/${commentId}`,
          { content: commentContent },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          setComments((prevComments) =>
            prevComments.map((comment) =>
              comment.commentId === commentId
                ? { ...comment, content: commentContent, updatedAt: null }
                : comment
            )
          );
          setEditing(false);
          setNoComment(false);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("댓글을 입력해주세요.");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const isPageBottom =
        window.scrollY + window.innerHeight >= document.body.offsetHeight;

      if (isPageBottom) {
        handleLoadMoreClick();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleLoadMoreClick]);

  return (
    <Container>
      <HeaderBar title="댓글" />
      <Content>
        {comments.map((comment) => {
          return (
            <CommentContainer key={comment.commentId}>
              <Comment>
                <CommentAvatar src={comment.memberProfileImage} />
                <CommentContent>
                  <Commentheader>
                    <CommentAuthor>{comment.nickName}</CommentAuthor>
                    {comment.nickName === member.nickname && (
                      <div>
                        {Editing && comment.commentId === cId ? (
                          // editing이 true일 때의 코드
                          <></>
                        ) : (
                          // editing이 false일 때의 코드
                          <CommentMenuPage
                            propFunction={handleClick}
                            commentId={comment.commentId}
                            comment={comment}
                            values={commentContent}
                            deleteId={deleteComment}
                          />
                        )}
                      </div>
                    )}
                  </Commentheader>
                  {Editing && comment.commentId === cId ? (
                    <EditForm>
                      <input
                        type="text"
                        id="comment-content"
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        className="border-2 border-gray-300 rounded-md px-4 py-2"
                      />
                      <Editbutton
                        type="button"
                        onClick={() => updateComment(comment.commentId)}
                      >
                        완료
                      </Editbutton>
                    </EditForm>
                  ) : (
                    <CommentText>{comment.content}</CommentText>
                  )}
                  <CommentDate>
                    {timeForToday(comment.createdAt)}
                    {comment.updatedAt !== comment.createdAt && " (수정됨)"}
                  </CommentDate>
                </CommentContent>
              </Comment>
            </CommentContainer>
          );
        })}
        <NotException>
          {loading && "로딩중...🌈"}
          {noComment && "댓글이 없습니다 ⛈️"}
        </NotException>
        {!loading && hasMore && (
          <LoadMoreButton onClick={handleLoadMoreClick}>더 보기</LoadMoreButton>
        )}
      </Content>
      <CommentInputContainer>
        <form onSubmit={handleCommentSubmit}>
          <CommentInput
            value={InputComment}
            onChange={handleCommentChange}
            placeholder="댓글을 입력하세요."
          />
          <CommentSubmitButton type="submit">작성</CommentSubmitButton>
        </form>
      </CommentInputContainer>
      <BottomMenuBar />
    </Container>
  );
};

export default CommentPage;
