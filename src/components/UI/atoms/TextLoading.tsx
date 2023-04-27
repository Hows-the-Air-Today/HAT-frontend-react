import React from "react";
import { ThreeDots } from "react-loader-spinner";

export const TextLoading: React.FC = () => {
  return (
    <ThreeDots
      visible
      height="40"
      width="40"
      radius="1"
      color="#dce4eb"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};
