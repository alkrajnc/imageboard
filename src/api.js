import axios from "axios";
//const token = sessionStorage.getItem("token");
function setToken(userToken) {
  sessionStorage.setItem("token", JSON.stringify(userToken));
}
const url = "http://localhost:3000";

export const handleLogin = async (username, password, navigate, notify) => {
  axios
    .post(`${url}/api/auth/signin`, {
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
      } else {
        notify("An error ocurred.");
      }
    });
};
export const handleRegister = async (userDetails, navigate) => {
  axios
    .post(`${url}/api/auth/signup`, userDetails, {
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

export function getUserData(username) {
  return axios.get(`${url}/api/user/${username}/query`);
}
export function getUserName() {}
export function handlePostUpload(newPostData, notify, handleClose, retrigger) {
  console.log(newPostData);
  axios
    .post(`${url}/api/posts/create`, newPostData, {
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
export const getComments = async (postId) => {
  return axios.get(`${url}/api/posts/comments/${postId}`);
};
export const getUserComments = async (username) => {
  return axios.get(`${url}/api/user/${username}/comments`);
};
export const getPost = async (postId) => {
  return axios.get(`${url}/api/posts/query/${postId}`);
};
export const postComment = (post, newComment, notify, retrigger) => {
  axios
    .post(`${url}/api/posts/${post._id}/comments/add`, newComment)
    .then((res) => {
      if (res.status === 200) {
        notify("Comment submited");
        retrigger("fssdf");
      } else {
        notify("Comment not posted. Error");
      }
    });
};
export const getBoards = async () => {
  return axios.get(`${url}/api/boards`);
};
