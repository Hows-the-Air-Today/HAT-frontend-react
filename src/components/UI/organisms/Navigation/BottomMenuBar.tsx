import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Icon } from "./icons";
import { StyledBottomMenuBar, ContainerBox } from "./styles/styles";

const BottomMenuBar = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const homeIndex = Icon.findIndex((item) => item.title === "home");
  const [activeIcon, setActiveIcon] = useState(homeIndex);

  const [showBottomMenuBar, setShowBottomMenuBar] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const currentScrollPosition = window.pageYOffset;

    if (currentScrollPosition > scrollPosition) {
      // 하단 스크롤 시 하단바 숨김
      setShowBottomMenuBar(false);
    } else {
      // 상단 스크롤 시 하단바 표시
      setShowBottomMenuBar(true);
    }

    setScrollPosition(currentScrollPosition);
  };

  const handleNavigation = (path: string, index: number) => {
    navigate(path);
    setActiveIcon(index);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition, handleScroll]);

  useEffect(() => {
    const activeIndex = Icon.findIndex(
      (item) => item.path === location.pathname
    );
    setActiveIcon(activeIndex);
  }, [location.pathname]);

  return (
    <StyledBottomMenuBar show={showBottomMenuBar}>
      <ContainerBox>
        {Icon.map((item, index) => (
          <button
            /* eslint-disable-next-line react/no-array-index-key */
            key={index}
            onClick={() => handleNavigation(item.path, index)}
            type="button"
          >
            {React.cloneElement(item.icon, {
              color: index === activeIcon ? "#191f24" : "#80858A",
            })}
          </button>
        ))}
      </ContainerBox>
    </StyledBottomMenuBar>
  );
};
export default BottomMenuBar;
