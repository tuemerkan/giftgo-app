import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {GoogleOAuthProvider} from "@react-oauth/google";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from "./routes/RootLayout.jsx";
import Posts, {loader as postsLoader} from "./routes/Posts.jsx";
import NewPost, { action as newPostAction } from './routes/NewPost';
import PostDetails, { loader as postDetailsLoader } from './routes/PostDetails';
import UserProvider from "./providers/UserProvider.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: <Posts />,
                loader: postsLoader,
                children: [
                    { path: '/create-post', element: <NewPost />, action: newPostAction },
                    { path: '/:postId', element: <PostDetails />, loader: postDetailsLoader }
                ],
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId="687778475490-04u2qfde8ijahleo9va1e77gh8f967rr.apps.googleusercontent.com">
        <React.StrictMode>
            <UserProvider>
                <RouterProvider router={router} />
            </UserProvider>
        </React.StrictMode>
    </GoogleOAuthProvider>
)
