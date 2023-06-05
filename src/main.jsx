import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./routes/RootLayout.jsx";
import Posts, { loader as postsLoader } from "./routes/Posts.jsx";
import NewPost from "./routes/NewPost";
import PostDetails, { loader as postDetailsLoader } from "./routes/PostDetails";
import UserProvider from "./providers/UserProvider.jsx";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
  authDomain: "giftgo-app.firebaseapp.com",
  projectId: "giftgo-app",
  storageBucket: "giftgo-app.appspot.com",
  messagingSenderId: "687778475490",
  appId: "1:687778475490:web:4510a2550a1ebd362a1dbb",
  measurementId: "G-TNHDHN3VPY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Posts />,
        loader: postsLoader,
        children: [
          { path: "/create-post", element: <NewPost /> },
          {
            path: "/:postId",
            element: <PostDetails />,
            loader: postDetailsLoader,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="687778475490-04u2qfde8ijahleo9va1e77gh8f967rr.apps.googleusercontent.com">
    <React.StrictMode>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
