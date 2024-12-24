import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Заменили useHistory на useNavigate

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Заменили useHistory на useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/users/login", {
        login,
        password,
      });
      if (response.data.user_id) {
        localStorage.setItem("user_id", response.data.user_id);
        navigate("/"); // Используем navigate для перенаправления
      }
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        placeholder="Login"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
