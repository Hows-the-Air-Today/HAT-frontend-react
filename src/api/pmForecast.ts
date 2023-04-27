import { airQualityInstance } from "utils/axios";

export const getPMForecast = async () => {
  const url = `/forecast`;

  try {
    const response = await airQualityInstance.get(url);

    return response;
  } catch (error) {
    console.error("Error fetching PM forecast:", error);

    return null;
  }
};
