import axios from "axios";

const host = process.env.REACT_APP_HOST;
const community = process.env.REACT_APP_COMMUNITY;

export async function getPost({ setPopularList, region, limit, createdAt }) {
  const { data } = await axios.get(`${host}${community}`, {
    params: { region, limit, createdAt },
  });
  setPopularList(data?.data?.postList?.data[0]?.popularList);
  return { data };
}

export async function deletePost(postsId) {
  const { data } = await axios.delete(`${host}${community}/${postsId}`);

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
  console.log(location?.data?.postId);
  console.log(data);
}
