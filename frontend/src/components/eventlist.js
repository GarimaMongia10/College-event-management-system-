import React, { useEffect, useState } from "react";
import API from "../api";

function EventList() {
  const [events, setEvents] = useState([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/event");
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();

    // allow refresh from EventForm
    window.refreshEvents = fetchEvents;
  }, []);

  return (
    <div>
      <h2>Events Dashboard</h2>

      {events.length === 0 ? (
        <p>No events available</p>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <div className="event-card" key={event._id}>
              {event.image && (
                <img
                  src={event.image}
                  alt={event.title}
                  className="event-image"
                />
              )}

              <h3>{event.title}</h3>
              <p><strong>Date:</strong> {event.date}</p>
              {event.location && <p>{event.location}</p>}

              {/* Admin only button */}
              {role === "admin" && (
                <button className="delete-btn">
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EventList;
