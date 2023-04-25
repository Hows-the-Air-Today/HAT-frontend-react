import axios from "axios";

export async function getPost({ setPopularList, region, limit, createdAt }) {
  const { data } = await axios.get("http://localhost:10000/api/v1/post/", {
    params: { region, limit, createdAt },
  });
  setPopularList(data?.data?.postList?.data[0]?.popularList);
  return { data };
}

export async function deletePost({ postsId }) {
  const { data } = await axios.delete(
    `http://localhost:10000/api/v1/post/${postsId}`
  );

  return { data };
}
