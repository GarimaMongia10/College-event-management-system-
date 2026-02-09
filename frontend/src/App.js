import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import EventList from "./components/eventlist";
import EventForm from "./components/eventform";
import Reports from "./components/reports";
import Settings from "./components/settings";

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    <Router>
      <div>
        <h1>College Event Management System</h1>
        <nav>
          <Link to="/">Events</Link> |{" "}
          <Link to="/event/new">Add Event</Link> |{" "}
          <Link to="/reports">Reports</Link> |{" "}
          <Link to="/settings">Settings</Link> |{" "}
          {!loggedIn && <Link to="/login">Login</Link>} |{" "}
          {!loggedIn && <Link to="/register">Register</Link>}
        </nav>

        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/event/new" element={<EventForm />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login onLogin={() => setLoggedIn(true)} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;