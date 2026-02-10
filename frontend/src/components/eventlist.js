import React, { useEffect, useState } from "react";
import API from "../api";

function EventList() {
  const [events, setEvents] = useState([]);

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
  }, []);

  return (
    <div className="page-container">
      <div className="card">


    <div>
      <h2>Events</h2>
      {events.length === 0 ? (
        <p>No events available</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event._id}>
              <strong>{event.title}</strong> <br />
              {event.description} <br />
              📅 {new Date(event.date).toLocaleDateString()} <br />
              📍 {event.location}
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
</div>

  );
}

export default EventList;