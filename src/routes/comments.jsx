import { useLoaderData } from "react-router-dom";
import { useState } from "react";
export const CommentsLoader = ({ params }) => {
  return params.postId;
};

export const Comments = () => {
  // eslint-disable-next-line no-unused-vars
  const [postId, setPostId] = useState(useLoaderData());
  return <div>{postId}</div>;
};
