import axios from "axios";

import { convertLatLonToForecastGrid } from "services/convertLatLonToForecastGrid";
import { getKSTDate } from "utils/kstDate";

const weatherApiKey = process.env.REACT_APP_OPEN_API_KEY;
const weatherApiUrl = process.env.REACT_APP_WEATHER_FORECAST_URL;

interface VilageForecast {
  // 맑음(1), 구름많음(3), 흐림(4)
  sky: string;
  // 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4)
  pty: string;
  tmp: string;
}

const getBaseDateAndTime = () => {
  const now = new Date();
  const currentHour = now.getHours();
  const baseTimeCandidates = [2, 5, 8, 11, 14, 17, 20, 23];
  const timeIndex = baseTimeCandidates.findIndex((time) => currentHour < time);

  let baseDate;
  let baseTime;

  if (timeIndex === -1 || (timeIndex === 0 && currentHour < 2)) {
    baseDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    baseTime = "2300";
  } else {
    baseDate = now;
    baseTime = (baseTimeCandidates[timeIndex - 1] * 100)
      .toString()
      .padStart(4, "0");
  }

  const year = baseDate.getFullYear();
  const month = (baseDate.getMonth() + 1).toString().padStart(2, "0");
  const day = baseDate.getDate().toString().padStart(2, "0");

  return { date: year + month + day, time: baseTime };
};

export const fetchVilageForecast = async (
  latitude,
  longitude
): Promise<VilageForecast[]> => {
  const { x, y } = convertLatLonToForecastGrid(latitude, longitude);
  const nx = Math.floor(x);
  const ny = Math.floor(y);

  console.log("nx:", nx);
  console.log("ny:", ny);

  const { date } = getBaseDateAndTime();
  const { time } = getBaseDateAndTime();

  console.log("date:", date);
  console.log("time:", time);

  const url = `${weatherApiUrl}/getVilageFcst?serviceKey=${weatherApiKey}&numOfRows=1000&pageNo=1&dataType=json&base_date=${date}&base_time=${time}&nx=${nx}&ny=${ny}`;

  console.log("fetchVilageForecast url:", url);

  try {
    const response = await axios.get(url);

    console.log("fetchVilageResponse", response);

    const { data } = response;
    const { response: responseData } = data;
    const { body } = responseData;
    const { items } = body;
    const { item } = items;

    const today = getKSTDate(new Date());
    console.log("today:", today);
    const tomorrow = getKSTDate(new Date(today));
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfterTomorrow = getKSTDate(new Date(today));
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

    const targetDates = [
      today.toISOString().slice(0, 10).replace(/-/g, ""),
      tomorrow.toISOString().slice(0, 10).replace(/-/g, ""),
      dayAfterTomorrow.toISOString().slice(0, 10).replace(/-/g, ""),
    ];

    console.log("targetDates:", targetDates);

    const filteredItems = item
      .filter((i) => targetDates.includes(i.fcstDate))
      .filter((i) => ["SKY", "PTY", "TMP"].includes(i.category));

    const forecasts: VilageForecast[] = targetDates.map((fcstDate) => {
      const skyItem = filteredItems.find(
        (i) => i.category === "SKY" && i.fcstDate === fcstDate
      );
      const ptyItem = filteredItems.find(
        (i) => i.category === "PTY" && i.fcstDate === fcstDate
      );
      const tmpItem = filteredItems.find(
        (i) => i.category === "TMP" && i.fcstDate === fcstDate
      );

      return {
        sky: skyItem?.fcstValue || "",
        pty: ptyItem?.fcstValue || "",
        tmp: tmpItem?.fcstValue || "",
      };
    });

    console.log("forecasts:", forecasts);

    return forecasts;
  } catch (error) {
    console.error("Error fetching vilage forecast:", error);

    return [
      {
        sky: "",
        pty: "",
        tmp: "",
      },
      {
        sky: "",
        pty: "",
        tmp: "",
      },
      {
        sky: "",
        pty: "",
        tmp: "",
      },
    ];
  }
};
