/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleLogin } from "../api";

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

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /* const register = () => {
    axios
      .post(`http://localhost:3000/api/auth/signin`, {
        username: username,
        password: password,
      })
      .then((res) => {
        setToken(res.data.token);
        navigate("/posts");
      })
      .catch((err) => {
        if (err.response.status === 403) {
          notify(err.response.data.msg);
        }
      });
  }; */

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin(username, password, navigate, notify);
    }
  };

  return (
    <>
      <div
        onKeyDown={handleKeyDown}
        className="flex items-center justify-center loginPage h-screen"
      >
        <div className="flex flex-col gap-3 p-4 py-6 test rounded-lg">
          <ControlledInput
            value={username}
            type="text"
            placeholder="Username"
            onValueChange={setUsername}
          />
          <ControlledInput
            value={password}
            type="password"
            placeholder="Password"
            onValueChange={setPassword}
          />
          <button
            onClick={() => handleLogin(username, password, navigate, notify)}
          >
            Sign in
          </button>
          <p className="text-blue-500 text-lg text-center font-semibold">
            <Link to={"/register"}>Register</Link>
          </p>
        </div>
      </div>
      <ToastContainer theme="dark" />
    </>
  );
};

export default Login;
