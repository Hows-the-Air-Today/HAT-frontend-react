import axios from "axios";

const host = process.env.REACT_APP_HOST;
const community = process.env.REACT_APP_COMMUNITY;

export async function getPost({ region, limit, createdAt, accessToken }) {
  const { data } = await axios.get(`${host}${community}/`, {
    params: { region, limit, createdAt },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return { data };
}

export async function deletePost(postsId, accessToken) {
  const { data } = await axios.delete(`${host}${community}/${postsId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return { data };
}

// eslint-disable-next-line consistent-return
export async function detailPost(postsId, accessToken) {
  const { data } = await axios.get(
    `${host}${community}/post-detail/${postsId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return { data };
}

export async function postCreateAndUpdate(location, formData, accessToken) {
  const { data } =
    location === null
      ? await axios.post(
          `${host}${community}/create-post`, // 추후 api.url 달예정
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
      : await axios.patch(
          `${host}${community}/${location?.data?.postId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
}

export async function getPopular(region, accessToken) {
  const { data } = await axios.get(`${host}${community}/get-popular`, {
    params: { region },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return { data };
}
