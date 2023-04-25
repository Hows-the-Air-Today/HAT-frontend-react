import * as React from "react";

import { SelectProps } from "../../../../interface/CommunityPage";
import { CustomSelectStyle } from "../../../pages/Community/styles";

const dummySelectData: any = [
  { id: 1, region: "서울" },
  { id: 3, region: "전포동" },
];

const SelectBox: React.FC<SelectProps> = ({ setRegion }) => {
  const handleChange = (e) => {
    setRegion(e.target.value);
  };

  return (
    <div>
      <CustomSelectStyle onChange={(e) => handleChange(e)}>
        {dummySelectData.map((item) => (
          <option key={item?.id}>{item.region}</option>
        ))}
      </CustomSelectStyle>
      <hr />
    </div>
  );
};

export default SelectBox;
