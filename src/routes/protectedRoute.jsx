import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  //const token = getToken();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:3000/api/auth/checkToken`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            navigate("/posts");
          }
        })
        .catch((err) => {
          if (err.response.status === 403) {
            sessionStorage.clear();
            navigate("/login");
          }
        });
    }
  }, [navigate]);

  return <div>{children}</div>;
};

export default ProtectedRoute;
