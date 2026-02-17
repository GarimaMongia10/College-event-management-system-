import React, { useEffect, useState } from "react";
import API from "../api";

function AdminSettings() {
  const [settings, setSettings] = useState({
    registrationEnabled: true,
    maxEventsPerUser: 5
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const res = await API.get("/setting");
    setSettings(res.data);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const saveSettings = async () => {
    await API.put("/setting", settings);
    alert("Settings updated");
  };

  return (
    <div className="card">
      <h2>Admin Settings</h2>

      <label>
        <input
          type="checkbox"
          name="registrationEnabled"
          checked={settings.registrationEnabled}
          onChange={handleChange}
        />
        Enable Event Registration
      </label>

      <input
        type="number"
        name="maxEventsPerUser"
        value={settings.maxEventsPerUser}
        onChange={handleChange}
      />

      <button onClick={saveSettings}>Save</button>
    </div>
  );
}

export default AdminSettings;
