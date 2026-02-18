import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Layout({ children }) {
  const role = localStorage.getItem("role");

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo">CampusConnect</h2>

        <Link to="/events">Events</Link>

        {(role === "admin" || role === "faculty") && (
          <Link to="/add-event">Add Event</Link>
        )}

        {/* Reports visible to all logged users */}
        <Link to="/reports">Reports</Link>

        {/* Settings only for admin */}
        {role === "admin" && (
          <Link to="/settings">Settings</Link>
        )}

        <Link to="/login">Logout</Link>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-center">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
