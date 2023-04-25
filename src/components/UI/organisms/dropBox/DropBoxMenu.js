import React from "react";

import { Menu, MenuItem } from "@material-ui/core";

// eslint-disable-next-line react/prop-types
const DropBoxMenu = ({ postId, open, anchorEl, setAnchor }) => {
  const options = [
    { id: 1, title: "수정" },
    { id: 2, title: "삭제" },
  ];

  const ITEM_HEIGHT = 48;
  const handleClose = () => {
    setAnchor(null);
  };
  return (
    <Menu
      id="long-menu"
      MenuListProps={{
        "aria-labelledby": "long-button",
      }}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      PaperProps={{
        style: {
          maxHeight: ITEM_HEIGHT * 4.5,
          width: "20ch",
        },
      }}
    >
      {options?.map((option) => (
        <MenuItem
          onClick={() => {
            // onClickSelect(option.title);
            console.log(postId);
          }}
          selected={null}
        >
          <p>{option.title}</p>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default DropBoxMenu;
