import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/login";
import Register from "./components/register";
import EventList from "./components/eventlist";
import AddEvent from "./components/eventform";
import Reports from "./components/reports";
import Settings from "./components/settings";
import Layout from "./components/layout";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const role = localStorage.getItem("role");

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        {/* Events Page (All logged users) */}
        <Route
          path="/events"
          element={
            isLoggedIn ? (
              <Layout>
                <EventList />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Add Event (Admin + Faculty) */}
        <Route
          path="/add-event"
          element={
            isLoggedIn && (role === "admin" || role === "faculty") ? (
              <Layout>
                <AddEvent />
              </Layout>
            ) : (
              <Navigate to="/events" />
            )
          }
        />

        

        {/* Reports (Admin only) */}
        <Route
          path="/reports"
          element={
            isLoggedIn && role === "admin" ? (
              <Layout>
                <Reports />
              </Layout>
            ) : (
              <Navigate to="/events" />
            )
          }
        />

        {/* Settings (Admin only) */}
        <Route
          path="/settings"
          element={
            isLoggedIn && role === "admin" ? (
              <Layout>
                <Settings />
              </Layout>
            ) : (
              <Navigate to="/events" />
            )
          }
        />

        {/* Default */}
        <Route path="/" element={<Navigate to="/login" />} />

      </Routes>
    </Router>
  );
}

export default App;
