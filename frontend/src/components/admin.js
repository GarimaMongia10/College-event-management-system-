import React from "react";
import EventList from "./eventlist";
import EventForm from "./eventform";
import Reports from "./reports";
import Settings from "./settings";
import UsersList from "./users";

function AdminDashboard() {
  return (
    <div className="page-container">
      <div className="card">
        <h2>Admin Dashboard</h2>
        <p>Manage events, users, reports, and system settings here.</p>

        <section style={{ marginTop: "20px" }}>
          <h3>Events</h3>
          <EventForm />
          <EventList />
        </section>

        <section style={{ marginTop: "20px" }}>
          <h3>Reports</h3>
          <Reports />
        </section>

        <section style={{ marginTop: "20px" }}>
          <h3>Settings</h3>
          <Settings />
        </section>

        <section style={{ marginTop: "20px" }}>
          <h3>Users</h3>
          <UsersList />
        </section>

      </div>
    </div>
  );
}

export default AdminDashboard;