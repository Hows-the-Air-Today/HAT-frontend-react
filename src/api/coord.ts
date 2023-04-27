import axios from "axios";

const kakaoApiKey = process.env.REACT_APP_KAKAO_API_KEY;
const kakaoApiUrl = process.env.REACT_APP_KAKAO_TRANS_COORD_URL;

interface Coord {
  tmX: number;
  tmY: number;
}

export const transCoord = async (
  latitude: number,
  longitude: number
): Promise<Coord> => {
  const url = `${kakaoApiUrl}?x=${longitude}&y=${latitude}&input_coord=WGS84&output_coord=TM`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `KakaoAK ${kakaoApiKey}`,
      },
    });

    if (response.data.documents && response.data.documents.length > 0) {
      const tmX = response.data.documents[0].x;
      const tmY = response.data.documents[0].y;

      return { tmX, tmY };
    }
    throw new Error("No coord found");
  } catch (error) {
    console.error("Error fetching coord:", error);

    return { tmX: 0, tmY: 0 };
  }
};
