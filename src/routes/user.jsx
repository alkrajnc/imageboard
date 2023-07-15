import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { getUserData, getUserComments } from "../api";
import ReactCountryFlag from "react-country-flag";

import { Post } from "./posts";
import { url } from "../main";

export const User = () => {
  const [username] = useState(useLoaderData());
  const [userData, setUserData] = useState([]);
  const [detailedPost, setDetailedPost] = useState({
    post: {},
    isShown: false,
  });
  const [userComments, setUserComments] = useState([]);
  const [view, setView] = useState("posts");

  useEffect(() => {
    getUserComments(username).then((res) => setUserComments(res.data));
  }, [username]);

  const [trigger, setTrigger] = useState("");
  useEffect(() => {
    getUserData(username).then((res) => {
      console.log(res);
      setUserData(res.data);
    });
  }, [username, trigger]);

  const calculateAccountAge = (timestamp) => {
    const accountCreationDate = new Date(timestamp);
    const ageInMilliseconds = new Date() - accountCreationDate;
    const ageInDays = ageInMilliseconds / (1000 * 60 * 60 * 24);
    return (Math.round(ageInDays * 10) / 10).toString(); // treba v string drugace se react pritozuje zaradi NaN vrednosti
  };

  const UserPosts = () => {
    return (
      <div className="grid mt-6 grid-cols-1 md:grid-cols-2 gap-6">
        {userData.posts?.map((post, index) => (
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
    );
  };
  const UserComments = () => {
    return (
      <div className="flex flex-col gap-4 p-2 m-2">
        {userComments?.map((comment, index) => (
          <div
            className="bg-[#242424] w-full p-3 rounded-lg hover:shadow-emerald-500 hover:shadow-lg transition-shadow"
            key={index}
          >
            <Link to={`/post/${comment.postId}`}>
              <p className="text-sm text-emerald-700">{comment.author}</p>
              <p className="text-left">{comment.content}</p>
              {/* <VotingSystem
                  voting={voting}
                  index={index}
                  handleVoting={handleVoting}
                /> */}
            </Link>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex justify-center backdrop-blur-[2px]">
      <div className="lg:w-1/2">
        <div className="bg-emerald-800 p-4 rounded-b-xl">
          <img
            src={`${url}/${userData?.profilePicture}`}
            alt=""
            className="rounded-full shadow-lg aspect-square w-1/4"
          />
          <h2 className="text-2xl">
            {userData.username}{" "}
            <ReactCountryFlag
              countryCode={userData.country}
              style={{
                fontSize: "1em",
                lineHeight: "1em",
              }}
            />
          </h2>
          <p>
            Account created{" "}
            <span className="text-emerald-400">
              {calculateAccountAge(userData.timestamp)}
            </span>{" "}
            days ago
          </p>
        </div>
        <div className="mt-6 flex flex-row gap-4">
          <button className="bg-emerald-700" onClick={() => setView("posts")}>
            Posts
          </button>
          <button
            className="bg-emerald-700"
            onClick={() => setView("comments")}
          >
            Comments
          </button>
        </div>
        {view === "posts" ? <UserPosts /> : <UserComments />}
      </div>
    </div>
  );
};
