import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/auth/login", { email, password });

    // Save token
    localStorage.setItem("token", res.data.token);

    // Decode token to get role
    const payload = JSON.parse(
      atob(res.data.token.split(".")[1])
    );
     console.log("Decoded payload:", payload);

    localStorage.setItem("role", payload.role);

    // Redirect to Events Dashboard
    navigate("/events");

  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};



  return (
  <div className="page-container">
    <div className="card">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p style={{ marginTop: "15px" }}>
        Don't have an account? <Link to="/register">Register</Link>

      </p>
    </div>
  </div>
);

}

export default Login;
