/* eslint-disable react/prop-types */
import {
  faClipboard,
  faFile,
  faGears,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, redirect, useOutlet } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// const notify = (text) => toast(text);

const UserDropdown = ({ user }) => {
  const logout = () => {
    sessionStorage.clear();
    return redirect("/login");
  };
  return (
    <div className="absolute rounded-b-lg border-b divide-y-2 border-x top-11 z-50 right-0 bg-stone-800 p-2 flex flex-col space-y-2">
      <Link
        className="flex items-center justify-between gap-2 p-1 text-emerald-400"
        to={`/user/${user.username}`}
      >
        <FontAwesomeIcon icon={faUser} />
        Profile
      </Link>
      <Link
        className="flex items-center justify-between gap-2 p-1 text-emerald-400"
        to={"/settings"}
      >
        <FontAwesomeIcon icon={faGears} />
        Settings
      </Link>
      <div
        onClick={logout}
        className="text-emerald-400 cursor-pointer justify-between flex p-1 flex-row items-center"
      >
        <FontAwesomeIcon icon={faRightFromBracket} />
        Logout
      </div>
    </div>
  );
};
const NavBox = ({ data }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseOver={setHover}
      onMouseLeave={() => setHover(false)}
      className="rounded-xl p-4 w-1/2 md:w-1/3 aspect-square bg-white/40 saturate-200 backdrop-blur-sm shadow-lg "
    >
      <Link
        className="w-full h-full flex justify-center items-center"
        to={data.link}
      >
        {!hover ? (
          <h2 className="text-3xl font-semibold">{data.heading}</h2>
        ) : (
          <FontAwesomeIcon className="animIn scale-[500%]" icon={data.icon} />
        )}
      </Link>
    </div>
  );
};
const Home = () => {
  const navInfo = [
    {
      link: "/posts",
      heading: "Posts",
      icon: faFile,
    },
    {
      link: "/boards",
      heading: "Boards",
      icon: faClipboard,
    },
    {
      link: "/posts",
      heading: "Someth",
    },
  ];
  return (
    <div className="grid">
      <div className="place-self-center w-full md:w-1/2 flex flex-col md:flex-row gap-6 justify-center items-center min-h-screen">
        {navInfo.map((box, index) => (
          <NavBox key={index} data={box} />
        ))}
      </div>
    </div>
  );
};
export const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const outlet = useOutlet();
  return (
    <div>
      <div className="bg-emerald-800 text-black p-4 flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <Link to={"/"}>
            <h1 className="text-3xl text-white">PixBoard</h1>
          </Link>
        </div>
        <div className="relative flex justify-center items-center">
          <FontAwesomeIcon
            className="text-2xl text-white cursor-pointer"
            onClick={() => setDropdownVisible(!dropdownVisible)}
            icon={faUser}
          />
          {dropdownVisible && (
            <UserDropdown
              user={{ username: sessionStorage.getItem("username") }}
            />
          )}
        </div>
      </div>
      <div className="textured-bg bg-cover min-h-screen">
        {outlet || <Home />}
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
};
