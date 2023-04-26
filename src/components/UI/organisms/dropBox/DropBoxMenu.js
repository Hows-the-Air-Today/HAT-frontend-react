import React, { useEffect, useRef, useState } from "react";
import { RiMore2Fill } from "react-icons/ri";

import { Menu, MenuItem } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

// eslint-disable-next-line import/extensions

const DropBoxMenu = ({ option, setOpen, handleOpenClick }) => {
  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const boxMenu = Boolean(anchorEl);
  const ref = useRef(null);
  const handleClose = () => {
    console.log("adsf");
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setAnchorEl(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  return (
    <div ref={ref}>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={boxMenu ? "long-menu" : undefined}
        aria-expanded={boxMenu ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <RiMore2Fill />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={boxMenu}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {option.map((options, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              handleOpenClick(options.title);
              setAnchorEl(null);
            }}
          >
            {options?.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DropBoxMenu;
