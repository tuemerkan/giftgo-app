import { Link, Form } from "react-router-dom";
import Modal from "../components/Modal";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext.jsx";
import Dropzone from "../components/Dropzone.jsx";

function NewPost() {
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("new");
  const [picture, setPicture] = useState("");
  const { profile } = useContext(UserContext);
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Need a FormData type object to send files to server
    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("description", description);
    formData.append("condition", condition);
    formData.append("picture", picture);
    const postData = Object.fromEntries(formData);

    try {
      console.log(postData);
      await fetch("http://localhost:4000/posts", {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      window.location.href = "/";
    } catch (error) {
      console.log(postData);
    }
  };

  if (profile) {
    return (
      <Modal>
        <Form className="w-full max-w-lg rounded-lg shadow-xl p-6">
          <div>
            <label
              name="author"
              id="author"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Giver: {profile.name}
            </label>
          </div>
          <div>
            <label
              htmlFor="body"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Description:
            </label>
            <textarea
              required
              id="description"
              name="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={3}
              placeholder="Write a few words :)"
              className="appearance-none block w-full text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            ></textarea>
          </div>
          <div>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Image:
            </label>
            <Dropzone setPicture={setPicture} />
          </div>
          <div>
            <label
              htmlFor="condition"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Condition:
            </label>
            <ConditionDropdown setConditionHandler={setCondition} />
          </div>
          <br />
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
              type="button"
              onClick={handleSubmit}
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

const ConditionDropdown = ({ setConditionHandler }) => {
  return (
    <div className="inline-block relative w-64">
      <select
        onChange={(event) => setConditionHandler(event.target.value)}
        name="condition"
        id="condition"
        className="block appearance-none w-full bg-white border border-gray-200 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        <option defaultValue="Brand new">Brand new</option>
        <option value="Really good">Really good</option>
        <option value="Quite good">Quite good</option>
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
