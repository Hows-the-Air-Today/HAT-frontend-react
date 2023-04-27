import React from "react";
import { TailSpin } from "react-loader-spinner";

export const Loading = () => {
  return (
    <TailSpin
      visible
      height="80"
      width="80"
      color="#f8b26a"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};
