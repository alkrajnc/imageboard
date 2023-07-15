import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Posts } from "./routes/posts";
import Login from "./routes/Login";
import SignUp from "./routes/singUp";
import ProtectedRoute from "./routes/protectedRoute";
import { Navbar } from "./routes/navbar";
import { User } from "./routes/user";
import PostDetails from "./routes/PostDetails";
import { postLoader, userLoader } from "./loaders";
import NewPost from "./routes/NewPost";
export const url = "http://localhost:3000";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "posts",
        element: (
          <ProtectedRoute>
            <Posts />
          </ProtectedRoute>
        ),
      },
      {
        path: "post/:postId",
        element: <PostDetails />,
        loader: postLoader,
      },
      {
        path: "user/:username",
        element: <User />,
        loader: userLoader,
      },
      {
        path: "new",
        element: <NewPost />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <ProtectedRoute>
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    path: "/register",
    element: <SignUp />,
  },
]);
// export const url = "https://shimmering-cookie-mercury.glitch.me";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
