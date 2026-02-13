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
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // Save token
      localStorage.setItem("token", res.data.token);
      const payload = JSON.parse(atob(res.data.token.split(".")[1]));
localStorage.setItem("role", payload.role);
      // Decode token to get role
      try {
        const payload = JSON.parse(
          atob(res.data.token.split(".")[1])
        );
        if (payload.role) {
          localStorage.setItem("role", payload.role);
        }
      } catch (err) {
        console.log("Role decode failed");
      }

      // Update app state if function provided
      if (onLogin) {
        onLogin();
      }

      // Redirect to Events page
      navigate("/events");

      // Reload to refresh navbar
      window.location.reload();

    } catch (error) {
      alert("Invalid email or password");
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
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  </div>
);

}

export default Login;
