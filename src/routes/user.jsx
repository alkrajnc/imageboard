import { useState } from "react";
import { useLoaderData } from "react-router-dom";

export const userLoader = ({ params }) => {
  return params.username;
};

export const User = () => {
  const [username] = useState(useLoaderData());
  return <div>{username}</div>;
};
