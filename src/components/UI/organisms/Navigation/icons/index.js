import { AiFillPlusCircle } from "react-icons/ai";
import { BiBookContent } from "react-icons/bi";
import { BsBarChart, BsPerson } from "react-icons/bs";
import { VscHome } from "react-icons/vsc";

const ICONSIZE = "2.5rem";
const COLOR = "#80858A";

export const Icon = [
  {
    title: "home",
    icon: <VscHome color={COLOR} size={ICONSIZE} />,
    path: "/",
  },
  {
    title: "community view",
    icon: <BiBookContent color={COLOR} size={ICONSIZE} />,
    path: "/community",
  },
  {
    title: "community create",
    icon: <AiFillPlusCircle color={COLOR} size={ICONSIZE} />,
    path: "/community-create",
  },
  {
    title: "rank",
    icon: <BsBarChart color={COLOR} size={ICONSIZE} />,
    path: "/airquality/ranking",
  },
  {
    title: "MyPage",
    icon: <BsPerson color={COLOR} size={ICONSIZE} />,
    path: "/my-page",
  },
];
