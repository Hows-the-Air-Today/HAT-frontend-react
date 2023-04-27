import axios from "axios";

const host = process.env.REACT_APP_HOST;
const airQuality = process.env.REACT_APP_AIR_QUALITY;

const axiosAirQualityApi = (url) => {
  return axios.create({
    baseURL: url,
  });
};

const axiosAuthApi = (url) => {
  return axios.create({
    baseURL: url,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};

export const airQualityInstance = axiosAirQualityApi(`${host}${airQuality}`);
