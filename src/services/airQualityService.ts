import {
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";

const getGrade = (value: number): string => {
  if (value <= 15) return "좋음";
  if (value > 15 && value <= 35) return "보통";
  if (value > 35 && value <= 75) return "나쁨";
  return "매우나쁨";
};

const getKhaiGrade = (value: number): string => {
  switch (value) {
    case 1:
      return "좋음";
    case 2:
      return "보통";
    case 3:
      return "나쁨";
    case 4:
      return "매우나쁨";
    default:
      return "좋음";
  }
};

const getTimeAgo = (dataTime: string): string => {
  const now = new Date();
  const targetDate = new Date(dataTime);

  const hoursDifference = differenceInHours(now, targetDate);
  const minutesDifference = differenceInMinutes(now, targetDate);
  const secondsDifference = differenceInSeconds(now, targetDate);

  if (hoursDifference > 0) return `${hoursDifference}시간 전`;
  if (minutesDifference > 0) return `${minutesDifference}분 전`;
  return `${secondsDifference}초 전`;
};

interface AirQualityDataType {
  stationName: string;
  pm10: number;
  pm25: number;
  pm10Grade: "좋음" | "보통" | "나쁨" | "매우나쁨";
  pm25Grade: "좋음" | "보통" | "나쁨" | "매우나쁨";
  khaiValue: number;
  newKhaiGrade: "좋음" | "보통" | "나쁨" | "매우나쁨";
  timeAgo: string;
}

export const caclulateAirQualityData = (data: any): AirQualityDataType => {
  const { stationName, pm10Value, pm25Value, khaiValue, khaiGrade, dataTime } =
    data;

  const pm10 = Number(pm10Value);
  const pm25 = Number(pm25Value);
  const pm10Grade = getGrade(pm10);
  const pm25Grade = getGrade(pm25);
  const newKhaiGrade = getKhaiGrade(Number(khaiGrade));
  const timeAgo = getTimeAgo(dataTime);

  return <AirQualityDataType>{
    stationName,
    pm10,
    pm25,
    pm10Grade,
    pm25Grade,
    khaiValue,
    newKhaiGrade,
    timeAgo,
  };
};
