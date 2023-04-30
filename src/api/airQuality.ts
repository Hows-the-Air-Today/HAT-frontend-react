import { airQualityInstance } from "utils/axios";

export const getAirQuality = async (tmX, tmY) => {
  const url = `/tm?tmx=${tmX}&tmy=${tmY}`;

  try {
    const response = await airQualityInstance.get(url);

    return response;
  } catch (error) {
    console.error("Error fetching air quality:", error);

    return null;
  }
};

export const getAirQualityRanking = async () => {
  const url = `/ranking`;

  try {
    const response = await airQualityInstance.get(url);

    return response;
  } catch (error) {
    console.error("Error fetching air quality ranking:", error);

    return null;
  }
};
