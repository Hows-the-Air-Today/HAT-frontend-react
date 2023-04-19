import { atom } from "recoil";

export const geolocationState = atom({
  key: "geolocation",
  default: {
    latitude: 37.481878,
    longitude: 127.062814,
  },
});
