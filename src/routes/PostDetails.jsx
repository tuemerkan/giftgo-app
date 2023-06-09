import { useLoaderData, Link } from "react-router-dom";
import Modal from "../components/Modal";

function PostDetails() {
  const post = useLoaderData();

  if (!post) {
    return (
      <Modal>
        <main>
          <h1>Could not find post</h1>
          <p>Unfortunately, the requested post could not be found.</p>
          <p>
            <Link to="..">Okay</Link>
          </p>
        </main>
      </Modal>
    );
  }
  return (
    <Modal>
      <main>
        <p>{post.author}</p>
        <p>{post.body}</p>
      </main>
    </Modal>
  );
}

export default PostDetails;

export async function loader({ params }) {
  const response = await fetch(
    `https://blooming-reaches-75512.herokuapp.com/posts/${params.postId}`
  );
  const resData = await response.json();
  return resData.post;
}
