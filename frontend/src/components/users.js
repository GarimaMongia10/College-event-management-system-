import React, { useEffect, useState } from "react";
import API from "../api";

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div style={{ marginTop: "10px" }}>
      <h4>Registered Users</h4>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {users.map((u) => (
            <li key={u._id}>
              <strong>{u.name}</strong> — {u.email} — {u.role}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UsersList;