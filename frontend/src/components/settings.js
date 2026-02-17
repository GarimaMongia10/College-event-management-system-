import React, { useState } from "react";

function Settings() {
  const [registrationEnabled, setRegistrationEnabled] = useState(true);
  const [maxEventsPerUser, setMaxEventsPerUser] = useState(5);

  const handleSave = () => {
    alert("Settings saved (frontend only)");
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2>Admin Settings</h2>

        <label>
          <input
            type="checkbox"
            checked={registrationEnabled}
            onChange={(e) => setRegistrationEnabled(e.target.checked)}
          />
          Enable Event Registration
        </label>

        <br /><br />

        <label>Max Users per Event:</label>
        <input
          type="number"
          value={maxEventsPerUser}
          onChange={(e) => setMaxEventsPerUser(e.target.value)}
        />

        <br /><br />

        <button onClick={handleSave}>
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default Settings;
