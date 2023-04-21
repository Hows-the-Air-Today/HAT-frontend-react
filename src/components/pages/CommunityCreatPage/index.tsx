import React, { useRef, useState } from "react";
import * as Ai from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useRecoilState } from "recoil";

import { memberState } from "../../../stores";
import { CommonButton } from "../../UI/atoms/button";
import { CommunityTextAreaField } from "../../UI/atoms/input";
import {
  CameraBox,
  CameraInput,
  CameraRootContainer,
  CancelButton,
  CommunityFooter,
  CommunityInputBox,
  CustomImage,
  FlexBox,
  RootBox,
} from "../../UI/organisms/commonstyles/styles";
import HeaderBar from "../../UI/organisms/Header/HeaderBar";

const CommunityCreatPage: React.FC = () => {
  const postImageBoxCount = 1;

  const navigate = useNavigate();
  const imageInput = useRef<HTMLInputElement>(null);

  const [member, setMember] = useRecoilState(memberState);

  const { accessToken } = member;
  const { nickname } = member;
  const { memberId } = member;

  const [boxIndex, setBoxIndex] = useState<number>();

  const [textFieldData, setTextFieldData] = useState({
    content: "",
  });

  const [postImages, setPostImages] = useState([
    ...new Array(1).fill({
      postImageUrl: "",
    }),
  ]);
  const [originPostImages, setOriginPostImages] = useState<any>(
    new Array(postImageBoxCount).fill({
      postImageUrl: "",
    })
  );
  const handleChangeFileRender = (e, index) => {
    e.preventDefault();
    const file = imageInput.current.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setPostImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[index] = {
          postImageUrl: reader.result,
        };
        return newImages;
      });
    };

    setOriginPostImages((prev) => {
      const newData = [...prev];
      newData[index] = {
        postImageUrl: file,
      };

      return newData;
    });
    reader?.readAsDataURL(file);
  };
  const onClickDeletePicture = (e, index) => {
    e.stopPropagation();
    if (postImages[index].postImageUrl !== " ") {
      setPostImages((prevImages) => {
        const newData = [...prevImages];
        newData[index] = {
          postImageUrl: "",
        };
        return newData;
      });
    }
  };

  const handleDataChange = (type) => (e) => {
    setTextFieldData({ ...textFieldData, [type]: e.target.value });
  };

  const onSubmitPosts = async () => {
    const formData = new FormData();

    if (
      textFieldData?.content === "" ||
      originPostImages[0]?.postImageUrl === ""
    ) {
      alert("이미지 와 내용을 모두 입력해주세요");
      return;
    }

    const body: any = {
      region: "서울",
      memberId,
      content: textFieldData?.content,
      memberNickname: nickname,
    };

    formData.append("postImagesDto", originPostImages[0]?.postImageUrl);
    formData.append("saveRequestDto", JSON.stringify(body));

    try {
      const { data } = await axios.post(
        `http://localhost:10000/api/v1/post`, // 추후 api.url 달예정
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (data?.msg === "success") {
        alert("게시글 작성이 완료되었습니다");

        navigate("/community");
      }
    } catch (error) {
      console.log(error);
      // console.log(e?.response);
    }
  };

  return (
    <div>
      <HeaderBar title="게시물 작성" />
      <RootBox>
        <FlexBox>
          {postImages.map((item, index) => (
            <div>
              <CameraInput
                id="cameraInput"
                onChange={(e) => {
                  handleChangeFileRender(e, index);
                }}
                type="file"
                accept="image/*"
                ref={imageInput}
              />
              <CameraRootContainer
                onClick={() => {
                  imageInput.current.click();
                  setBoxIndex(index);
                }}
              >
                <CameraBox>
                  <Ai.AiOutlinePlus size={20} />
                  {item?.postImageUrl && (
                    <CustomImage
                      src={item?.postImageUrl ? item?.postImageUrl : null}
                    />
                  )}

                  {item?.postImageUrl && (
                    <CancelButton
                      size={20}
                      onClick={(e) => onClickDeletePicture(e, index)}
                    />
                  )}
                </CameraBox>
              </CameraRootContainer>
            </div>
          ))}
        </FlexBox>
        <CommunityInputBox>
          <CommunityTextAreaField
            onChange={handleDataChange("content")}
            placeholder="내용을 입력해주세요"
          />
        </CommunityInputBox>
        <CommunityFooter>
          <CommonButton
            variant="outlined"
            text="등록"
            onClick={onSubmitPosts}
          />
        </CommunityFooter>
      </RootBox>
    </div>
  );
};
export default CommunityCreatPage;
