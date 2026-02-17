import React, { useEffect, useState } from "react";
import API from "../api";

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await API.get("/event");
      console.log("Events from API:", res.data); // check in console
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2>Events Dashboard</h2>

        {events.length === 0 ? (
          <p>No events available</p>
        ) : (
          <div className="events-grid">
            {events.map((event) => (
              <div className="event-card" key={event._id}>
                <h3>{event.title}</h3>
                <p><b>Date:</b> {new Date(event.date).toLocaleDateString()}</p>
                <p><b>Location:</b> {event.location}</p>
                <p>{event.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EventList;

