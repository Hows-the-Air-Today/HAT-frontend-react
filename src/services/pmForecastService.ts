interface InformGradeList {
  grade: string;
  region: string;
}

interface PMForecastDataType {
  informCode: string;
  informCause: string;
  informGradeList: Array<InformGradeList>;
  informData: string;
  dataTime: string;
}

interface PMForecastResponseDataType {
  pm10ForecastList: Array<PMForecastDataType>;
  pm25ForecastList: Array<PMForecastDataType>;
}

interface PMForecastItem {
  informCode: string;
  informCause: string;
  informGradeList: Array<string>;
  informData: string;
  dataTime: string;
}

export const getInformCause = (
  data: any
): {
  informCause: string;
}[] => {
  console.log("data", data);

  const informCauseList = data.map((item: any, idx: number) => {
    const { informCause } = item;

    return {
      informCause,
    };
  });

  return informCauseList;
};

const mapRegion = (region1depthName, region2depthName) => {
  const cityRegion = region2depthName.split(" ")[0];

  console.log("cityRegion", cityRegion);

  if (region1depthName === "경기") {
    const northRegions = [
      "고양시",
      "구리시",
      "남양주시",
      "동두천시",
      "양주시",
      "의정부시",
      "파주시",
      "포천시",
      "가평군",
      "연천군",
    ];
    const southRegions = [
      "과천시",
      "광명시",
      "광주시",
      "군포시",
      "김포시",
      "부천시",
      "성남시",
      "수원시",
      "시흥시",
      "안산시",
      "안성시",
      "안양시",
      "여주시",
      "오산시",
      "용인시",
      "의왕시",
      "이천시",
      "평택시",
      "하남시",
      "화성시",
      "양평군",
    ];

    if (southRegions.includes(cityRegion)) return "경기남부";
    if (northRegions.includes(cityRegion)) return "경기북부";
  }

  if (region1depthName === "강원") {
    const eastRegions = [
      "강릉시",
      "동해시",
      "삼척시",
      "속초시",
      "태백시",
      "고성군",
      "양양군",
    ];
    const westRegions = [
      "원주시",
      "춘천시",
      "양구군",
      "영월군",
      "인제군",
      "정선군",
      "철원군",
      "평창군",
      "홍천군",
      "화천군",
      "횡성군",
    ];

    if (eastRegions.includes(cityRegion)) return "영동";
    if (westRegions.includes(cityRegion)) return "영서";
  }

  return region1depthName;
};

const getRegionName = (address) => {
  const { region1depthName, region2depthName } = address;
  return mapRegion(region1depthName, region2depthName);
};

export const getInformGradeList = (data: any, address: any) => {
  const regionName = getRegionName(address);

  const { pm10ForecastList } = data;
  const { pm25ForecastList } = data;

  console.log("pm10ForecastList", pm10ForecastList);
  console.log("pm25ForecastList", pm25ForecastList);

  const getGradeForRegion = (list) => {
    return list.map((item) => {
      console.log("regionName:", regionName);
      console.log("informGradeList:", item.informGradeList);
      const gradeItem = item.informGradeList.find(
        (grade) => grade.region === regionName
      );
      return gradeItem ? gradeItem.grade : null;
    });
  };

  const pm10Grades = getGradeForRegion(pm10ForecastList);
  const pm25Grades = getGradeForRegion(pm25ForecastList);

  console.log("pm10Grades", pm10Grades);
  console.log("pm25Grades", pm25Grades);

  return { pm10Grades, pm25Grades };
};
