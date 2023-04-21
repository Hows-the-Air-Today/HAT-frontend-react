import React from "react";

export interface BackArrowProps {
  onClick: () => void;
  style?: React.CSSProperties;
}

export interface CommonButtonProps {
  onClick: () => void;
  text: string;

  size?: "small" | "medium" | "large";

  variant?: "text" | "outlined" | "contained";
  fullWidth?: boolean;
}
