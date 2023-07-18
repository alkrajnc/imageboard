import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getComments, getPost, postComment } from "../api";
import { url } from "../main";
    // import { notify } from "./navbar";
import { ControlledInput } from "./posts";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PostDetails = () => {
  const [postId] = useState(useLoaderData());
  const [postComments, setPostComments] = useState([]);
  const [postData, setPostData] = useState({});
  const [newComment, setNewComment] = useState({
    content: "",
    author: sessionStorage.getItem("username"),
    timestamp: new Date(),
  });
  const [trigger, setTrigger] = useState("");
  useEffect(() => {
    getComments(postId).then((res) => setPostComments(res.data));
    getPost(postId).then((res) => setPostData(res.data));
  }, [postId, trigger]);
  //console.log(postData);

  return (
    <div className="flex flex-col items-center">
      <div className="bg-emerald-800 rounded-b-xl w-3/4 p-2 mb-4">
        <h2 className="text-2xl text-center">{postData.postTitle}</h2>
      </div>
      <div className="lg:w-1/2">
        <img
          className="w-full rounded-xl"
          src={`${url}/${postData.postImage}`}
          alt=""
        />
      </div>
      <div className="lg:w-1/2 mt-6 w-3/4 mb-8">
        <div className="flex flex-col items-start gap-4">
          <div className="bg-[#242424] w-full p-2 rounded-lg flex flex-row justify-between items-center gap-2 ">
            <ControlledInput
              value={newComment.content}
              onValueChange={(text) =>
                setNewComment({ ...newComment, content: text })
              }
              placeholder="Comment"
            />
            <FontAwesomeIcon
              onClick={() => {
                postComment(postData, newComment, null, setTrigger);
                setNewComment({
                  content: "",
                  author: sessionStorage.getItem("username"),
                  timestamp: new Date(),
                });
              }}
              className="ml-4 bg-stone-900 text-white rounded-lg px-4 py-2"
              icon={faArrowRight}
            />
          </div>
          {postComments?.map((comment, index) => (
            <div className="bg-[#242424] w-full p-3 rounded-lg " key={index}>
              <p className="text-sm text-emerald-700">{comment.author}</p>
              <p className="text-left">{comment.content}</p>
              {/* <VotingSystem
                    voting={voting}
                    index={index}
                    handleVoting={handleVoting}
                  /> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
