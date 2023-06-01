import { Link } from "react-router-dom";

function Post({ name, description, condition, picture, id }) {
  const imageSrc = "data:image/png;base64," + picture;
  return (
    <li className="border border-blue-300 rounded-md p-4 bg-blue-100">
      <Link to={id} className="text-blue-700 hover:underline">
        <p className="font-bold text-lg">{description}</p>
        <p>{condition}</p>
        <img className="h-64" src={imageSrc} alt="Base64 encoded image" />
        <p className="mt-2">{name}</p>
      </Link>
    </li>
  );
}

export default Post;
