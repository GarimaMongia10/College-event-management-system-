import React, { useState } from "react";
import API from "../api";

function EventForm() {
  const [form, setForm] = useState({ title: "", description: "", date: "", location: "", image: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.date) {
      alert("Please fill in title and date");
      return;
    }
    
    try {
      setLoading(true);
      await API.post("/event", form);
      alert("Event created successfully!");
      setForm({ title: "", description: "", date: "", location: "", image: "" });
      // Refresh event list if callback provided
      if (window.refreshEvents) {
        window.refreshEvents();
      }
    } catch (err) {
      console.error(err);
      alert("Error creating event: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };
return (
  <div className="card">
    <h2>Create New Event</h2>

    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Event Title"
        value={form.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
      />

      <input
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Event"}
      </button>
    </form>
  </div>
);

}

export default EventForm;
 