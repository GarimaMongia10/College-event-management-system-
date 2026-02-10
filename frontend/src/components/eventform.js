import React, { useState } from "react";
import API from "../api";

function EventForm() {
  const [form, setForm] = useState({ title: "", description: "", date: "", location: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/event", form);
      alert("Event created successfully!");
    } catch (err) {
      alert("Error creating event");
    }
  };

  return (
    <div className="page-container">
      <div className="card">
      <form onSubmit={handleSubmit}>
      <h2>Add Event</h2>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <input name="date" type="date" value={form.date} onChange={handleChange} />
      <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
      <button type="submit">Create Event</button>
      </form>
      </div>
    </div>

  );
}

export default EventForm;