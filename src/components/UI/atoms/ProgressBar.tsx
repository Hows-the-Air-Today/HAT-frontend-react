import React from "react";

import ProgressBar from "@ramonak/react-progress-bar";

const KhaiGradeBar = () => {
  return (
    <ProgressBar
      completed={50}
      bgColor="#6a1b9a"
      baseBgColor="#dce4eb"
      labelColor="#6a1b9a"
      isLabelVisible={false}
      height="10px"
      borderRadius="0"
      labelAlignment="center"
    />
  );
};

export default KhaiGradeBar;
