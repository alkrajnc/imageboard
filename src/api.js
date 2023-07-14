import axios from "axios";
import { func } from "prop-types";
const token = sessionStorage.getItem("token");
function setToken(userToken) {
  sessionStorage.setItem("token", JSON.stringify(userToken));
}

export const handleLogin = async (username, password, navigate, notify) => {
  axios
    .post(`http://localhost:3000/api/auth/signin`, {
      username: username,
      password: password,
    })
    .then((res) => {
      setToken(res.data.token);
      sessionStorage.setItem("username", username);
      navigate("/posts");
    })
    .catch((err) => {
      if (err.response.status === 403) {
        notify(err.response.data.msg);
      }
    });
};
export const handleRegister = async (userDetails, navigate) => {
  axios
    .post(`http://localhost:3000/api/auth/signup`, userDetails, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.status === 200) {
        navigate("/login");
      }
    });
};

export function getUserData(username, notify) {
  return axios.get(`http://localhost:3000/api/user/${username}/query`);
}
export function getUserName() {}
export function handlePostUpload(newPostData, notify, handleClose, retrigger) {
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
        notify("Error creating post");
      }
    });
}
