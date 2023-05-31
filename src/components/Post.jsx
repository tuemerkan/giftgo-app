import { Link } from "react-router-dom";

function Post({ id, author, body }) {
  return (
    <li className="border border-blue-300 rounded-md p-4 bg-blue-100">
      <Link to={id} className="text-blue-700 hover:underline">
        <p className="font-bold text-lg">{body}</p>
        <p className="mt-2">{author}</p>
      </Link>
    </li>
  );
}

export default Post;
