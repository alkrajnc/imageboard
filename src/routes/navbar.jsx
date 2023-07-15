/* eslint-disable react/prop-types */
import {
  faGears,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notify = (text) => toast(text);
const logout = () => {
  sessionStorage.clear();
  location.replace("/login");
};

const UserDropdown = ({ user }) => {
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

export const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  return (
    <div>
      <div className="bg-emerald-800 text-black p-4 flex flex-row justify-between">
        <div>
          <Link
            className="text-white text-xl bg-stone-800 rounded-lg py-1 px-2"
            to={"/posts"}
          >
            Posts
          </Link>
        </div>
        <div className="relative">
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
      <div className="textured-bg bg-cover min-h-screen lg:bg-cover">
        <Outlet />
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
};
