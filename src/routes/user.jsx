import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getUserData } from "../api";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faImage,
  faMinus,
  faPlus,
  faXmarkCircle,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
export const userLoader = ({ params }) => {
  return params.username;
};
import { Post } from "./posts";

export const User = () => {
  const [username] = useState(useLoaderData());
  const [userData, setUserData] = useState([]);
  const [detailedPost, setDetailedPost] = useState({
    post: {},
    isShown: false,
  });
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

  return (
    <div className="flex justify-center">
      <div className="lg:w-1/2">
        <div className="bg-emerald-800 p-4 rounded-b-xl">
          <img
            src={`http://localhost:3000/${userData?.profilePicture}`}
            alt=""
            className="rounded-full shadow-lg aspect-square w-1/4"
          />
          <h1>
            {userData.username}{" "}
            <ReactCountryFlag
              countryCode={userData.country}
              style={{
                fontSize: "0.5em",
                lineHeight: "0.5em",
              }}
            />
          </h1>
          <p>
            Account created{" "}
            <span className="text-emerald-400">
              {calculateAccountAge(userData.timestamp)}
            </span>{" "}
            days ago
          </p>
        </div>
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
      </div>
    </div>
  );
};
