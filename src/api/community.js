import axios from "axios";

export async function getPost({ setPopularList, region, limit, createdAt }) {
  const { data } = await axios.get("http://localhost:10000/api/v1/post/", {
    params: { region, limit, createdAt },
  });
  setPopularList(data?.data?.postList?.data[0]?.popularList);
  return { data };
}

export async function deletePost(postsId) {
  const { data } = await axios.delete(
    `http://localhost:10000/api/v1/post/${postsId}`
  );

  return { data };
}

// eslint-disable-next-line consistent-return
export async function detailPost(postsId, accessToken) {
  const { data } = await axios.get(
    `http://localhost:10000/api/v1/post/post-detail/${postsId}`,
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
    location?.type === "undefined"
      ? await axios.post(
          `http://localhost:10000/api/v1/post/create-post`, // 추후 api.url 달예정
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
      : await axios.patch(
          `http://localhost:10000/api/v1/post/${location?.data?.postId}`,
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
