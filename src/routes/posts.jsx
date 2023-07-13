/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";

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
const notify = (text) => toast(text);

const ControlledInput = ({ value, onValueChange, ...rest }) => {
  return (
    <input
      value={value}
      onChange={({ target: { value } }) => onValueChange(value)}
      {...rest}
    />
  );
};
const ControlledFileInput = ({ onValueChange, ...rest }) => {
  return (
    <input
      onChange={({ target: { files } }) => onValueChange(files[0])}
      {...rest}
      type="file"
    />
  );
};
const VotingSystem = ({ voting, handleVoting }) => {
  return (
    <div className="flex flex-row gap-2 items-center justify-center">
      <FontAwesomeIcon
        className={
          (voting.hadVotedPlus ? "text-green-500" : "") +
          " cursor-pointer p-1 hover:bg-indigo-800 rounded-full"
        }
        onClick={() => handleVoting("plus")}
        icon={faPlus}
      />
      {voting.votes}
      <FontAwesomeIcon
        className={
          (voting.hadVotedMinus ? "text-green-500" : "") +
          " cursor-pointer p-1 hover:bg-indigo-800 rounded-full"
        }
        onClick={() => handleVoting("minus")}
        icon={faMinus}
      />
    </div>
  );
};
const PostDetails = ({ post, handleClose }) => {
  return (
    <div className="absolute top-1/2 left-1/2 bg-slate-700 translate-x-[-50%] z-40 translate-y-[-50%] p-2 m-4 backdrop-blur-2xl">
      <FontAwesomeIcon icon={faXmarkCircle} onClick={handleClose} />
      <div className="flex flex-row">
        <div>
          <p className="text-gray-500 text-sm text-center">{post.postAuthor}</p>
          <h2 className="text-xl text-center">{post.postTitle}</h2>
          <a
            href={`http://localhost:3000/${post.postImage}`}
            target="_blank"
            rel="noreffer noreferrer"
          >
            <img
              src={`http://localhost:3000/${post.postImage}`}
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
const Comments = ({ post, retrigger }) => {
  const [newComment, setNewComment] = useState({
    content: "",
    author: "admin",
    timestamp: new Date(),
  });
  const [voting, setVoting] = useState({
    votes: post.postVotes,
    hadVotedPlus: false,
    hadVotedMinus: false,
  });

  const handleVoting = (action) => {
    if (action === "plus") {
      if (!voting.hadVotedPlus) {
        setVoting({
          ...voting,
          hadVotedPlus: true,
          hadVotedMinus: false,
          votes: post.postVotes + 1,
        });
        axios.put(
          `http://localhost:3000/api/posts/${post._id}/comments/changeVote?action=plus`
        );
        retrigger("sad");
      }
    } else {
      if (!voting.hadVotedMinus) {
        setVoting({
          ...voting,
          hadVotedPlus: false,
          hadVotedMinus: true,
          votes: post.postVotes - 1,
        });
        axios.put(
          `http://localhost:3000/api/posts/${post._id}/comments/changeVote?action=minus`
        );
        retrigger("nis");
      }
    }
  };

  const postComment = () => {
    axios
      .post(
        `http://localhost:3000/api/posts/${post._id}/comments/add`,
        newComment
      )
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
      <div className="flex flex-col gap-4 items-center p-4 ">
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
        {post.postComments?.map((comment, index) => (
          <div className="bg-[#242424] w-full p-3 rounded-lg" key={index}>
            <p className="text-sm text-emerald-700">{comment.author}</p>
            <p className="text-left">{comment.content}</p>
            <VotingSystem voting={voting} handleVoting={handleVoting} />
          </div>
        ))}
      </div>
    </div>
  );
};
const Post = ({ postInfo, retrigger }) => {
  const [voting, setVoting] = useState({
    votes: postInfo.postVotes,
    hadVotedPlus: false,
    hadVotedMinus: false,
  });
  const [commentsShown, setCommentsShown] = useState(false);

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
          `http://localhost:3000/api/posts/modify/${postInfo._id}/changeVote?action=plus`
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
          `http://localhost:3000/api/posts/modify/${postInfo._id}/changeVote?action=minus`
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
            src={`http://localhost:3000/${postInfo.postImage}`}
            className={
              "w-[350px] h-[350px] w-max-[400px] h-max-[400px] bg-no-repeat bg-center bg-cover rounded-t-xl "
            }
          />
          <p className="absolute bottom-2 left-1/2 translate-x-[-50%] bg-stone-800 opacity-70 text-white rounded-lg px-2 py-1">
            <a
              href={`http://localhost:3000/${postInfo.postImage}`}
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-white"
            >
              See full image
            </a>
          </p>
        </div>
      ) : (
        <Comments retrigger={retrigger} post={postInfo} />
      )}
      <p className=""></p>
      <h2 className="text-xl text-center">
        {postInfo.postTitle}{" "}
        <span className="text-gray-300 text-sm">
          {" "}
          by{" "}
          <Link className="" to={`/user/${postInfo.postAuthor}`}>{postInfo.postAuthor}</Link>
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
            Comments({postInfo.postComments.length})
          </p>
        )}
      </div>
    </div>
  );
};
const Modal = ({ handleClose, retrigger }) => {
  const [newPostData, setNewPostData] = useState({
    postTitle: "",
    postAuthor: "admin",
    postVotes: 1,
    postTimestamp: new Date(),
    postComments: [],
    postImage: "",
  });

  function handlePostUpload() {
    console.log(newPostData);
    axios
      .post(`http://localhost:3000/api/posts/create`, newPostData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          notify("Post created");
          handleClose();
          retrigger("sdad");
        } else {
          console.log("Not ok");
        }
      });
  }

  return (
    <>
      <div className="absolute top-1/2 left-1/2 bg-slate-700 translate-x-[-50%] z-30 translate-y-[-50%] p-2 m-4 backdrop-blur-2xl">
        <h1>Create a post</h1>
        <ControlledInput
          value={newPostData.postTitle}
          onValueChange={(value) =>
            setNewPostData({ ...newPostData, postTitle: value })
          }
          placeholder="Post title"
        />
        <ControlledFileInput
          accept="image/png, image/jpeg"
          onValueChange={(file) =>
            setNewPostData({ ...newPostData, postImage: file })
          }
        />
        <button onClick={handlePostUpload}>Create</button>
      </div>
      <div className="absolute w-full h-full top-0 left-0 z-20 bg-black/50"></div>
    </>
  );
};

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [modalShown, setModalShown] = useState(false);
  const [detailedPost, setDetailedPost] = useState({
    post: {},
    isShown: false,
  });
  const [trigger, setTrigger] = useState("");
  const [query, setQuery] = useState("latest");
  //const [msg, setMsg] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/posts/query?sort=${query}`)
      .then((res) => {
        setPosts(res.data);
      });
    console.log(query);
  }, [trigger, query]);

  const handleModalClose = () => {
    setModalShown(false);
  };
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
    <div className="flex flex-row justify-center">
      <div className="flex flex-col">
        <div className="flex flex-row items-center">
          <button className="m-4" onClick={() => setModalShown(true)}>
            Create a new post
          </button>
          <Select
            defaultValue={query}
            onChange={(value) => setQuery(value.value)}
            className="text-black bg-stone-600"
            options={queryOptions}
            defaultInputValue={query}
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
      {modalShown && (
        <Modal handleClose={handleModalClose} retrigger={setTrigger} />
      )}
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

export default Posts;
