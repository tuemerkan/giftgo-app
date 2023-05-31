import { Link, Form, redirect } from 'react-router-dom';
import Modal from '../components/Modal';


function NewPost() {
  return (
      <Modal>
        <Form method='post' className="w-full max-w-lg rounded-lg shadow-xl p-6">
          <div>
            <label htmlFor="body" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Text:</label>
            <input id="body" name="body" required rows={3} placeholder="What's on your mind?" className="appearance-none block w-full text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"></input>
          </div>
          <div>
            <label htmlFor="name" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Your name:</label>
            <input type="text" id="name" name="author" required placeholder="Your name" className="appearance-none block w-full text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" />
          </div>
          <div className="flex items-center justify-end border-b border-teal-500 py-2">
            <Link to=".." className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button">
              Cancel
            </Link>
            <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
              Submit
            </button>
          </div>
        </Form>
      </Modal>
  );
}


export default NewPost;

export async function action({request}) {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData); // { body: '...', author: '...' }
  await fetch('http://localhost:4000/posts', {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return redirect('/');
}
