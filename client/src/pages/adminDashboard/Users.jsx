import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Users.scss";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmDialog, setConfirmDialog] = useState({ show: false, userId: null });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users");
      const nonAdminUsers = response.data.filter((user) => !user.isAdmin);
      setUsers(nonAdminUsers);
      setFilteredUsers(nonAdminUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeUser = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        console.error("No access token found!");
        return;
      }

      await axios.delete(`http://localhost:3000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      setFilteredUsers((prevFilteredUsers) =>
        prevFilteredUsers.filter((user) => user._id !== id)
      );

      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        (user.isSeller ? "freelancer" : "client").includes(query)
    );
    setFilteredUsers(filtered);
  };

  const confirmDelete = (id) => {
    setConfirmDialog({ show: true, userId: id });
  };

  const handleConfirm = () => {
    if (confirmDialog.userId) {
      removeUser(confirmDialog.userId);
    }
    setConfirmDialog({ show: false, userId: null });
  };

  const handleCancel = () => {
    setConfirmDialog({ show: false, userId: null });
  };

  return (
    <div className="users">
      <h2>Manage Users</h2>
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearch}
        className="search-input"
      />
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
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.isSeller ? "Freelancer" : "Client"}</td>
                  <td>
                    <button
                      className="remove-btn"
                      onClick={() => confirmDelete(user._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {confirmDialog.show && (
        <div className="dialog-box">
          <p>Are you sure you want to delete this user?</p>
          <button className="confirm-btn" onClick={handleConfirm}>Yes</button>
          <button className="cancel-btn" onClick={handleCancel}>No</button>
        </div>
      )}
    </div>
  );
};

export default Users;
