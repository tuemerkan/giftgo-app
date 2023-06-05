import { Outlet } from "react-router-dom";

import PostsList from "../components/PostsList";

function Posts() {
  return (
    <>
      <Outlet />
      <main>
        <PostsList />
      </main>
    </>
  );
}

export default Posts;

export async function loader() {
  const response = await fetch(
    `https://blooming-reaches-75512.herokuapp.com/posts`
  );
  const resData = await response.json();
  return resData.posts;
}
