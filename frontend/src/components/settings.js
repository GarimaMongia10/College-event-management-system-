import React, { useEffect, useState } from "react";
import API from "../api";

function Settings() {
  const [registrationEnabled, setRegistrationEnabled] = useState(true);
  const [maxUsersPerEvent, setMaxUsersPerEvent] = useState(50);

  // Load settings from backend
  useEffect(() => {
    API.get("/setting")
      .then(res => {
        setRegistrationEnabled(res.data.registrationEnabled);
        setMaxUsersPerEvent(res.data.maxUsersPerEvent);
      })
      .catch(err => console.error("Error loading settings", err));
  }, []);

  const handleSave = () => {
    API.put("/setting", {
      registrationEnabled,
      maxUsersPerEvent
    })
      .then(() => {
        alert("Settings saved successfully");
      })
      .catch(err => console.error("Save error", err));
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2>Admin Settings</h2>

        <label>
          <input
            type="checkbox"
            checked={registrationEnabled}
            onChange={e => setRegistrationEnabled(e.target.checked)}
          />
          Enable Event Registration
        </label>

        <br /><br />

        <label>
          Max Users per Event:
          <input
            type="number"
            value={maxUsersPerEvent}
            onChange={e => setMaxUsersPerEvent(e.target.value)}
          />
        </label>

        <br /><br />

        <button onClick={handleSave}>Save Settings</button>
      </div>
    </div>
  );
}

export default Settings;
