import { useState } from "react";
import { ControlledInput, ControlledFileInput } from "./posts";
import { handlePostUpload } from "../api";
//import { notify } from "./navbar";
const NewPost = () => {
  const [newPostData, setNewPostData] = useState({
    postTitle: "",
    postAuthor: sessionStorage.getItem("username"),
    postVotes: 1,
    postTimestamp: new Date(),
    postComments: [],
    postImage: "",
  });

  return (
    <>
      <div className="">
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-emerald-800 rounded-b-xl w-3/4 p-1">
            <h1 className="text-3xl text-center">Create a post</h1>
          </div>
          <div className="bg-white/10 mt-6 saturate-200 backdrop-blur-sm flex flex-col gap-6 p-3 rounded-xl">
            <ControlledInput
              value={newPostData.postTitle}
              onValueChange={(value) =>
                setNewPostData({ ...newPostData, postTitle: value })
              }
              placeholder="Post title"
              className="bg-black/50 focus:border-0 focus:scale-105 transition-all"
            />
            <ControlledFileInput
              accept="image/png, image/jpeg"
              onValueChange={(file) =>
                setNewPostData({ ...newPostData, postImage: file })
              }
              className="bg-black/50 focus:border-0 focus:scale-105 transition-all"
            />
            <button onClick={() => handlePostUpload(newPostData, notify)}>
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPost;
