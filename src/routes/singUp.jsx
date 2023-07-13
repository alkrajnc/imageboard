import axios from "axios";
import { useState } from "react";
// eslint-disable-next-line react/prop-types
const ControlledInput = ({ value, onValueChange, ...rest }) => {
  return (
    <input
      value={value}
      onChange={({ target: { value } }) => onValueChange(value)}
      {...rest}
    />
  );
};

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSingup = () => {
    axios
      .post(`http://localhost:3000/api/auth/signup`, {
        username: username,
        password: password,
      })
      .then((res) => console.log(res));
  };

  return (
    <div className="grid h-screen gap-4 place-items-center place-content-center">
      <div className="flex flex-col">
        <ControlledInput
          placeholder="Username"
          value={username}
          onValueChange={setUsername}
        />
        <ControlledInput
          placeholder="Password"
          value={password}
          onValueChange={setPassword}
          type="password"
        />
        <button onClick={handleSingup}>Create account</button>
      </div>
    </div>
  );
};

export default SignUp;
