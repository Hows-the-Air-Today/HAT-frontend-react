import React, { useRef, useState } from "react";
import * as Ai from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import { useRecoilState } from "recoil";

import { postCreateAndUpdate } from "../../../api/community";
import { memberState } from "../../../stores";
import { typeOfImageCheckValidation } from "../../../utils/utils-js";
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
  const location = useLocation();
  const imageInput = useRef<HTMLInputElement>(null);
  const locationState = location?.state;

  const [member, setMember] = useRecoilState(memberState);

  const { accessToken } = member;
  const { nickname } = member;
  const { memberId } = member;
  const { memberProfileImage } = member;

  const [isUploading, setIsUploading] = useState(false);
  const [boxIndex, setBoxIndex] = useState<number>();
  const [textFieldData, setTextFieldData] = useState({
    content: locationState?.data?.content ? locationState?.data?.content : "",
  });

  const [postImages, setPostImages] = useState([
    ...new Array(1).fill({
      postImageUrl: locationState?.data?.imageUrl
        ? locationState?.data?.imageUrl
        : "",
    }),
  ]);
  const [originPostImages, setOriginPostImages] = useState<any>(
    new Array(postImageBoxCount).fill({
      postImageUrl: locationState?.data?.imageUrl
        ? locationState?.data?.imageUrl
        : "",
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
  const onSubmitPosts = (e) => {
    e.preventDefault();

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
      memberImageUrl: memberProfileImage,
    };
    const typeCheck = typeOfImageCheckValidation(
      originPostImages[0]?.postImageUrl
    );
    if (typeCheck === "파일") {
      formData.append("postImagesDto", originPostImages[0]?.postImageUrl);
    } else {
      formData.append(
        "stringImagesDto",
        JSON.stringify(originPostImages[0]?.postImageUrl)
      );
    }

    formData.append("saveRequestDto", JSON.stringify(body));

    if (isUploading) {
      alert("게시글이 업로드 중이에요!");
      return;
    }

    setIsUploading(true);
    postCreateAndUpdate(locationState, formData, accessToken)
      .then((res) => {
        setIsUploading(false);

        navigate(-1);
        alert(
          `게시물 ${locationState === null ? "작성" : "수정"} 완료되었습니다.`
        );
      })
      .catch((err) => {
        setIsUploading(false);

        console.log(err);
      });
  };

  return (
    <div>
      <HeaderBar
        title={locationState?.type === "수정" ? "게시물 수정" : "게시물 작성"}
      />
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
            value={textFieldData?.content}
            onChange={handleDataChange("content")}
            placeholder="내용을 입력해주세요"
          />
        </CommunityInputBox>
        <CommunityFooter>
          <CommonButton
            variant="outlined"
            text={locationState?.type === "수정" ? "수정" : "등록"}
            onClick={(e) => {
              onSubmitPosts(e);
            }}
          />
        </CommunityFooter>
      </RootBox>
    </div>
  );
};
export default CommunityCreatPage;
