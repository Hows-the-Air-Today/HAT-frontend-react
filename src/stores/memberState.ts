import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const memberState = atom({
  key: "memberState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
