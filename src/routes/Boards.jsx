/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getBoards } from "../api";
import { ControlledInput } from "./posts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Search = ({ search, setSearch }) => {
  return (
    <div className="bg-white/40 backdrop-blur-sm saturate-200  px-2 p-1 rounded-lg self-center flex flex-row items-center">
      <FontAwesomeIcon icon={faSearch} />
      <ControlledInput
        placeholder="Search..."
        value={search}
        onValueChange={setSearch}
        className="bg-transparent w-[95%] focus:border-0"
      />
    </div>
  );
};
const CreateBoard = () => {
  return (
    <Link to={"/boards/new"}>
      <button className="">
        <FontAwesomeIcon className="mr-3" icon={faPlus} />
        Board
      </button>
    </Link>
  );
};
const BoardList = ({ boards }) => {
  return (
    <div className="self-center mt-6 w-full">
      {boards?.map((board, index) => (
        <div
          className="bg-stone-900 cursor-pointer hover:shadow-md hover:shadow-emerald-600 rounded-xl p-4 "
          key={index}
        >
          <Link
            to={`/boards/${board.name.replace(" ", "").toLowerCase()}`}
            className="flex flex-row items-center justify-between"
          >
            <div className="flex flex-row">
              <img src="/vite.svg" className="rounded-full inline" alt="" />
              <div className="ml-4">
                <h2 className="text-emerald-600 text-2xl">{board.name}</h2>
                <p className="text-stone-500">{board.description}</p>
              </div>
            </div>
            <button className="bg-emerald-700 p-2">Subscribe</button>
          </Link>
        </div>
      ))}
    </div>
  );
};
const Boards = () => {
  const [boards, setBoards] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    getBoards().then((res) => setBoards(res.data));
  }, []);

  return (
    <div className="lg:w-7/12 mx-auto p-6 flex flex-col">
      <div className="flex gap-4 w-full self-center items-center justify-center flex-row">
        <Search search={search} className="" setSearch={setSearch} />
        <CreateBoard />
      </div>
      <BoardList boards={boards} />
    </div>
  );
};

export default Boards;
