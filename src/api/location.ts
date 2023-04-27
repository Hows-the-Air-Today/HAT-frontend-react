import axios from "axios";

const kakaoApiKey = process.env.REACT_APP_KAKAO_API_KEY;
const kakaoApiUrl = process.env.REACT_APP_KAKAO_COORD_TO_ADDRESS_URL;

interface Address {
  addressName: string;
  region1depthName: string;
  region2depthName: string;
  region3depthName: string;
}

export const fetchAddress = async (
  latitude: number,
  longitude: number
): Promise<Address> => {
  const url = `${kakaoApiUrl}?x=${longitude}&y=${latitude}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `KakaoAK ${kakaoApiKey}`,
      },
    });

    if (response.data.documents && response.data.documents.length > 0) {
      const addr = response.data.documents[0].address;

      const addressName = addr.address_name;
      const region1depthName = addr.region_1depth_name;
      const region2depthName = addr.region_2depth_name;
      const region3depthName = addr.region_3depth_name;

      return {
        addressName,
        region1depthName,
        region2depthName,
        region3depthName,
      };
    }
    throw new Error("No address found");
  } catch (error) {
    console.error("Error fetching address:", error);
    return {
      addressName: "",
      region1depthName: "",
      region2depthName: "",
      region3depthName: "",
    };
  }
};
