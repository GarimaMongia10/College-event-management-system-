import React, { useState } from "react";
import API from "../api";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      onLogin();
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="page-container">
  <div className="card">


    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email}
             onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password}
             onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
     </div>
</div>

  );
}

export default Login;