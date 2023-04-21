import React from "react";

import {
  CommunityCustomInput,
  CommunityCustomTextArea,
} from "../organisms/commonstyles/styles";

type InputTypes = {
  placeholder?: string;
  value?: string;
  onChange?: (e: any) => void;
};
export const CommunityTextField: React.FC<InputTypes> = (props) => {
  return <CommunityCustomInput {...props} />;
};

export const CommunityTextAreaField: React.FC<InputTypes> = (props) => {
  return (
    <CommunityCustomTextArea
      onChange={props.onChange}
      value={props.value}
      {...props}
    />
  );
};
