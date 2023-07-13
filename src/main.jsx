import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Posts from "./routes/posts";
import Login from "./routes/login";
import SignUp from "./routes/singUp";
import ProtectedRoute from "./routes/protectedRoute";
import Navbar from "./routes/navbar";
import { User, userLoader } from "./routes/user";
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
        path: "user/:username",
        element: <User />,
        loader: userLoader,
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
    path: "/signup",
    element: <SignUp />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
