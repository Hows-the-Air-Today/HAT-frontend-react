import { UUID } from "crypto";

import React, { useEffect, useState, useRef } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useParams } from "react-router-dom";

import axios from "axios";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import tw from "twin.macro";

import { memberState } from "stores/memberState";

const Icon = styled(BiDotsVerticalRounded)`
  font-size: 32px;
`;

const EditButton = styled.button`
  ${tw`ml-12 h-5 w-10 `}
`;

const Dropdown = styled.div`
  ${tw`absolute bg-white rounded-lg shadow-xl z-10`}
  form {
    ${tw`p-4`}
  }
  label {
    ${tw`block mb-2 font-bold text-gray-700`}
  }
  input[type="text"] {
    ${tw`block w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none`}
  }
  button {
    ${tw`block w-full mt-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
  }
`;

const DropdownItem = styled.button`
  ${tw` text-left px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900`}
  &:focus {
    ${tw`bg-gray-100`}
  }
`;

interface LowComponentProps {
  propFunction: (text: boolean, id: UUID, cContent: string) => void;
  deleteId: (id: string) => void;
}

const CommentMenuPage: React.FC<{
  commentId: UUID;
  comment: any;
  propFunction;
  values: string;
  deleteId;
}> = ({ propFunction, commentId, comment, values, deleteId }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { postId } = useParams();
  const [text] = useState(true);
  const [member] = useRecoilState(memberState);
  const [id] = useState(commentId);
  const { accessToken } = member;

  const submitText = () => {
    setDropdownOpen(false);
    propFunction(text, id, comment.content);
  };

  const handleEditButtonClick = () => {
    setDropdownOpen(true); // 수정 버튼 클릭 시 dropdownOpen을 true로 설정
  };

  const deleteComment = () => {
    axios
      .delete(
        `http://localhost:10000/api/v1/post/${postId}/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        alert("삭제됨");
        deleteId(id);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div>
      <EditButton onClick={handleEditButtonClick}>
        <Icon />
      </EditButton>
      {dropdownOpen && (
        <Dropdown ref={dropdownRef}>
          <DropdownItem onClick={submitText}> 수정 </DropdownItem>
          <DropdownItem onClick={deleteComment}>삭제</DropdownItem>
        </Dropdown>
      )}
    </div>
  );
};
export default CommentMenuPage;
