import { useLoaderData } from 'react-router-dom';

import Post from './Post';

function PostsList() {
  const posts = useLoaderData();

  return (
      <div className="flex flex-col h-full overflow-auto">
        {posts.length > 0 && (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {posts.map((post) => (
                  <Post key={post.id} id={post.id} author={post.author} body={post.body} />
              ))}
            </ul>
        )}
        {posts.length === 0 && (
            <div className="text-center text-white">
              <h2 className="text-2xl font-bold">There are no posts yet.</h2>
              <p className="text-xl">Start adding some!</p>
            </div>
        )}
      </div>
  );
}



export default PostsList;
