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

        {/* Auth Pages */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
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

        <Route
          path="/add-event"
          element={
            isLoggedIn && role === "admin" ? (
              <Layout>
                <AddEvent />
              </Layout>
            ) : (
              <Navigate to="/events" />
            )
          }
        />

        <Route
          path="/reports"
          element={
            isLoggedIn ? (
              <Layout>
                <Reports />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/settings"
          element={
            isLoggedIn ? (
              <Layout>
                <Settings />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="/" element={<Navigate to="/login" />} />

      </Routes>
    </Router>
  );
}

export default App;
