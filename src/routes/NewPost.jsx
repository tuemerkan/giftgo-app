import { Link, Form, redirect } from "react-router-dom";
import Modal from "../components/Modal";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext.jsx";

function NewPost() {
  const { profile } = useContext(UserContext);
  if (profile) {
    return (
      <Modal>
        <Form
          method="post"
          className="w-full max-w-lg rounded-lg shadow-xl p-6"
        >
          <div>
            <label
              htmlFor="name"
              name="author"
              id="author"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Giver: {profile.name}
            </label>
            <input
              hidden
              type="text"
              id="name"
              name="author"
              value={profile.name}
              required
              placeholder="Your name"
            />
          </div>
          <div>
            <label
              htmlFor="body"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Description:
            </label>
            <input
              id="body"
              name="body"
              required
              rows={3}
              placeholder="Write a few words :)"
              className="appearance-none block w-full text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            ></input>
          </div>
          <ConditionDropdown />
          <div className="flex items-center justify-end border-b border-teal-500 py-2">
            <Link
              to=".."
              className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
              type="button"
            >
              Cancel
            </Link>
            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="submit"
            >
              Submit
            </button>
          </div>
        </Form>
      </Modal>
    );
  } else {
    return (
      <Modal>
        <h1>Please login :)</h1>
      </Modal>
    );
  }
}

const ConditionDropdown = () => {
  return (
    <div className="inline-block relative w-64">
      <select className="block appearance-none w-full bg-white border border-gray-200 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
        <option value="" disabled selected>
          Select condition
        </option>
        <option>Brand new</option>
        <option>Really good</option>
        <option>Quite good</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 12l-6-6h12l-6 6z" />
        </svg>
      </div>
    </div>
  );
};

export default NewPost;

export async function action({ request }) {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData); // { body: '...', author: '...' }
  await fetch("http://localhost:4000/posts", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return redirect("/");
}
