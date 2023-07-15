/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faImage,
  faMinus,
  faPlus,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { getComments } from "../api";
const notify = (text) => toast(text);
import { url } from "../main";

export const ControlledInput = ({ value, onValueChange, ...rest }) => {
  return (
    <input
      value={value}
      onChange={({ target: { value } }) => onValueChange(value)}
      {...rest}
    />
  );
};
export const ControlledFileInput = ({ onValueChange, ...rest }) => {
  return (
    <input
      onChange={({ target: { files } }) => onValueChange(files[0])}
      {...rest}
      type="file"
    />
  );
};
export const VotingSystem = ({ voting, handleVoting, index }) => {
  return (
    <div className="flex flex-row gap-2 items-center justify-center">
      <FontAwesomeIcon
        className={
          (voting.hadVotedPlus ? "text-green-500" : "") +
          " cursor-pointer p-1 hover:bg-indigo-800 rounded-full"
        }
        onClick={() => handleVoting("plus", index)}
        icon={faPlus}
      />
      {voting.votes}
      <FontAwesomeIcon
        className={
          (voting.hadVotedMinus ? "text-green-500" : "") +
          " cursor-pointer p-1 hover:bg-indigo-800 rounded-full"
        }
        onClick={() => handleVoting("minus", index)}
        icon={faMinus}
      />
    </div>
  );
};
export const PostDetails = ({ post, handleClose }) => {
  return (
    <div className="absolute top-1/2 left-1/2 bg-slate-700 translate-x-[-50%] z-40 translate-y-[-50%] p-2 m-4 backdrop-blur-2xl">
      <FontAwesomeIcon icon={faXmarkCircle} onClick={handleClose} />
      <div className="flex flex-row">
        <div>
          <p className="text-gray-500 text-sm text-center">{post.postAuthor}</p>
          <h2 className="text-xl text-center">{post.postTitle}</h2>
          <a
            href={`${url}/${post.postImage}`}
            target="_blank"
            rel="noreffer noreferrer"
          >
            <img
              src={`${url}/${post.postImage}`}
              className=" max-w-[400px] max-h-[400px] self-center"
              alt=""
            />
          </a>
          {/* <VotingSystem voting={voting} handleVoting={handleVoting} /> */}
        </div>
        <div>
          <h2>Comments</h2>
          {post.comments?.map((comment) => {
            <div>{comment.content}</div>;
          })}
        </div>
      </div>
    </div>
  );
};
export const Comments = ({ post, retrigger, comments }) => {
  const [newComment, setNewComment] = useState({
    content: "",
    author: sessionStorage.getItem("username"),
    timestamp: new Date(),
  });
  const parentRef = useRef();

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, [parentRef]);
  /* const [voting, setVoting] = useState({
    votes: post.postVotes,
    hadVotedPlus: false,
    hadVotedMinus: false,
  }); */

  /*  const handleVoting = (action, index) => {
    if (action === "plus") {
      if (!voting.hadVotedPlus) {
        setVoting({
          ...voting,
          hadVotedPlus: true,
          hadVotedMinus: false,
          votes: post.postVotes + 1,
        });
        axios.put(
          `${url}/api/posts/${post._id}/comments/${index}/changeVote?action=plus`
        );
        retrigger("sad");
      }
    } else {
      if ((!voting.hadVotedMinus, index)) {
        setVoting({
          ...voting,
          hadVotedPlus: false,
          hadVotedMinus: true,
          votes: post.postVotes - 1,
        });
        axios.put(
          `${url}/api/posts/${post._id}/comments//changeVote?action=minus`
        );
        retrigger("nis");
      }
    }
  }; */

  const postComment = () => {
    axios
      .post(`${url}/api/posts/${post._id}/comments/add`, newComment)
      .then((res) => {
        if (res.status === 200) {
          notify("Comment submited");
          retrigger("fsdf");
        }
      });
  };

  return (
    <div className="w-[350px] h-[350px] w-max-[400px] h-max-[400px] overflow-auto">
      <h2 className="text-xl p-4">Comments </h2>
      <div className="flex flex-col gap-4 items-center p-4 animate">
        <div className="bg-[#242424] w-full p-2 rounded-lg flex flex-row justify-between items-center gap-2 ">
          <ControlledInput
            value={newComment.content}
            onValueChange={(text) =>
              setNewComment({ ...newComment, content: text })
            }
            placeholder="Comment"
          />
          <FontAwesomeIcon
            onClick={postComment}
            className="ml-4 bg-stone-900 text-white rounded-lg px-4 py-2"
            icon={faArrowRight}
          />
        </div>
        {comments?.map((comment, index) => (
          <div className="bg-[#242424] w-full p-3 rounded-lg" key={index}>
            <p className="text-sm text-emerald-700">
              <Link to={`/user/${comment.author}`}>{comment.author}</Link>
            </p>
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
  );
};
export const Post = ({ postInfo, retrigger }) => {
  const [voting, setVoting] = useState({
    votes: postInfo.postVotes,
    hadVotedPlus: false,
    hadVotedMinus: false,
  });
  const [commentsShown, setCommentsShown] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(postInfo._id).then((comments) => setComments(comments.data));
  }, [postInfo]);

  const handleVoting = (action) => {
    if (action === "plus") {
      if (!voting.hadVotedPlus) {
        setVoting({
          ...voting,
          hadVotedPlus: true,
          hadVotedMinus: false,
          votes: postInfo.postVotes + 1,
        });
        axios.put(
          `${url}/api/posts/modify/${postInfo._id}/changeVote?action=plus`
        );
        retrigger("sad");
      }
    } else {
      if (!voting.hadVotedMinus) {
        setVoting({
          ...voting,
          hadVotedPlus: false,
          hadVotedMinus: true,
          votes: postInfo.postVotes - 1,
        });
        axios.put(
          `${url}/api/posts/modify/${postInfo._id}/changeVote?action=minus`
        );
        retrigger("nis");
      }
    }
  };
  return (
    <div className=" flex flex-col rounded-xl bg-emerald-700">
      {!commentsShown ? (
        <div className="relative">
          <img
            src={`${url}/${postInfo.postImage}`}
            className={
              "w-full aspect-square bg-no-repeat bg-center bg-cover rounded-t-xl "
            }
          />
          <p className="absolute bottom-2 left-1/2 translate-x-[-50%] bg-stone-800 opacity-70 text-white rounded-lg px-2 py-1">
            <Link
              to={`/post/${postInfo._id}`}
              className="text-white hover:text-white"
            >
              See full image
            </Link>
          </p>
        </div>
      ) : (
        <Comments comments={comments} retrigger={retrigger} post={postInfo} />
      )}
      <p className=""></p>
      <h2 className="text-xl text-center">
        {postInfo.postTitle}{" "}
        <span className="text-gray-300 text-sm">
          {" "}
          by{" "}
          <Link className="" to={`/user/${postInfo.postAuthor}`}>
            {postInfo.postAuthor}
          </Link>
        </span>
      </h2>
      <div className="flex flex-row justify-between gap-2 mx-6 pb-2">
        <VotingSystem voting={voting} handleVoting={handleVoting} />

        {commentsShown ? (
          <p
            onClick={() => setCommentsShown(!commentsShown)}
            className="text-center cursor-pointer transition-all hover:text-black rounded-lg px-2"
          >
            <FontAwesomeIcon className="mr-2" icon={faImage} />
            Post
          </p>
        ) : (
          <p
            onClick={() => setCommentsShown(!commentsShown)}
            className="text-center cursor-pointer transition-all hover:text-black rounded-lg px-2"
          >
            <FontAwesomeIcon className="mr-2" icon={faComment} />
            Comments({comments.length})
          </p>
        )}
      </div>
    </div>
  );
};

export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [detailedPost, setDetailedPost] = useState({
    post: {},
    isShown: false,
  });
  const [trigger, setTrigger] = useState("");
  const [query, setQuery] = useState("latest");
  //const [msg, setMsg] = useState("");
  useEffect(() => {
    axios.get(`${url}/api/posts/query?sort=${query}`).then((res) => {
      setPosts(res.data);
    });
    console.log(query);
  }, [trigger, query]);

  const handleCloseDetails = () => {
    setDetailedPost({ ...detailedPost, isShown: false });
  };

  const queryOptions = [
    {
      value: "latest",
      label: "Latest",
    },
    {
      value: "oldest",
      label: "Oldest",
    },
    {
      value: "top",
      label: "Most voted",
    },
  ];

  return (
    <div className="flex flex-row justify-center backdrop-blur-sm bg-white/10">
      <div className="flex flex-col">
        <div className="flex flex-row items-center">
          <button className="m-4 bg-emerald-700 hover:border-white hover:border hover:scale-105 transition-transform">
            <Link to={"/new"}>Create a new post</Link>
          </button>
          <Select
            defaultValue={query}
            onChange={(value) => {
              setQuery(value.value), setTrigger("dsss");
            }}
            className="text-black bg-stone-600"
            options={queryOptions}
            placeholder="Filter"
          />
        </div>
        {posts.length !== 0 ? (
          <div className="grid grid-cols-1 mx-4 sm:grid-cols-2 md:grid-cols-3 gap-6 grid-rows-posts">
            {posts?.map((post, index) => (
              <Post
                onClick={() =>
                  setDetailedPost({
                    ...detailedPost,
                    isShown: true,
                    post: post,
                  })
                }
                key={index}
                postInfo={post}
                retrigger={setTrigger}
              />
            ))}
          </div>
        ) : (
          <h1 className="text-center text-2xl">Loading...</h1>
        )}
      </div>
      {detailedPost.isShown && (
        <PostDetails
          post={detailedPost.post}
          handleClose={handleCloseDetails}
        />
      )}
      <ToastContainer theme="dark" />
    </div>
  );
};
