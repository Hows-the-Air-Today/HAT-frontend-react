import React from "react";
import * as Md from "react-icons/md";

import { Button } from "@material-ui/core";

import {
  BackArrowProps,
  CommonButtonProps,
} from "../../../interface/ButtonProps";

export const BackArrowButton: React.FC<BackArrowProps> = ({
  onClick,
  style,
}) => {
  return (
    <Md.MdOutlineKeyboardArrowLeft
      style={{ ...style, cursor: "pointer" }}
      size={25}
      onClick={onClick}
    />
  );
};

export const CommonButton: React.FC<CommonButtonProps> = (props) => {
  return (
    <Button {...props} onClick={props.onClick}>
      {props.text}
    </Button>
  );
};
