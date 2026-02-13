import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Layout({ children }) {
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="layout">
      <div className="sidebar">
        <h3>CampusConnect</h3>

        <Link to="/events">Events</Link>
        {role === "admin" && <Link to="/add-event">Add Event</Link>}
        <Link to="/reports">Reports</Link>
        <Link to="/settings">Settings</Link>

        <span onClick={logout} className="logout">
          Logout
        </span>
      </div>

      <div className="content">{children}</div>
    </div>
  );
}

export default Layout;
