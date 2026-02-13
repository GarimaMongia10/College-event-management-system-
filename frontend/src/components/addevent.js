import React, { useState } from "react";
import API from "../api";

function AddEvent() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/event",
        { title, date },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      alert("Event Added");
      setTitle("");
      setDate("");
    } catch (err) {
      alert("Only admin allowed");
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2>Add Event (Admin)</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Event Title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="date"
            value={date}
            required
            onChange={(e) => setDate(e.target.value)}
          />

          <button type="submit">Add Event</button>
        </form>
      </div>
    </div>
  );
}

export default AddEvent;
