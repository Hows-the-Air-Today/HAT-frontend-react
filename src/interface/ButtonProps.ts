import React from "react";

export interface BackArrowProps {
  onClick: () => void;
  style?: React.CSSProperties;
}

export interface CommonButtonProps {
  onClick: (e) => void;
  text: string;

  size?: "small" | "medium" | "large";

  variant?: "text" | "outlined" | "contained";
  fullWidth?: boolean;
}
