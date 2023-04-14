import * as Ai from "react-icons/ai";
import * as Md from "react-icons/md";
import * as Rx from "react-icons/rx";
import * as TfiIcons from "react-icons/tfi";
import * as VscIcon from "react-icons/vsc";

const ICONSIZE = "2.5rem";
const COLOR = "#80858A";

export const Icon = [
  {
    title: "home",
    icon: <VscIcon.VscHome color={COLOR} size={ICONSIZE} />,
    path: "/",
  },
  {
    title: "community view",
    icon: <Md.MdOutlineBroadcastOnPersonal color={COLOR} size={ICONSIZE} />,
    path: "/community",
  },
  {
    title: "community create",
    icon: <Ai.AiFillPlusCircle color={COLOR} size={ICONSIZE} />,
    path: "/community-create",
  },
  {
    title: "rank",
    icon: <TfiIcons.TfiBarChart color={COLOR} size={ICONSIZE} />,
    path: "/rank",
  },
  {
    title: "MyPage",
    icon: <Rx.RxPerson color={COLOR} size={ICONSIZE} />,
    path: "/my-page",
  },
];
