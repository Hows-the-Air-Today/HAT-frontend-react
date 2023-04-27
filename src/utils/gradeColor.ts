export const getGradeColor = (grade: string) => {
  switch (grade) {
    case "좋음":
      return "bg-air-blue";
    case "보통":
      return "bg-air-green";
    case "나쁨":
      return "bg-air-yellow";
    case "매우나쁨":
      return "bg-air-red";
    default:
      return "bg-gray-500";
  }
};

export const getTextGradeColor = (grade: string) => {
  switch (grade) {
    case "좋음":
      return "text-air-blue";
    case "보통":
      return "text-air-green";
    case "나쁨":
      return "text-air-yellow";
    case "매우나쁨":
      return "text-air-red";
    default:
      return "text-gray-500";
  }
};

export const getCompletedBarColor = (grade: string) => {
  switch (grade) {
    case "좋음":
      return "#76A9FA";
    case "보통":
      return "#31C48D";
    case "나쁨":
      return "#FACA15";
    case "매우나쁨":
      return "#F05252";
    default:
      return "#e0e0de";
  }
};
