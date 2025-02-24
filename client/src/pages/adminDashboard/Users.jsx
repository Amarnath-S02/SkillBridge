import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Users.scss";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users");
      const filteredUsers = response.data.filter((user) => !user.isAdmin); // Exclude admins
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`);
      fetchUsers(); // Fetch updated list after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="users">
      <h2>Manage Users</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="users-list">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.isSeller ? "Seller" : "Buyer"}</td>
                  <td>
                    <button className="remove-btn" onClick={() => removeUser(user._id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;