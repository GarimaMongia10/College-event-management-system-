import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      console.error("Registration Error:",err.response?.data || err.message);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* ROLE DROPDOWN */}
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="admin">Administrator</option>
          </select>

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
