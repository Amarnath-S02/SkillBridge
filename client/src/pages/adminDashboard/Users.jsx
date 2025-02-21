import React, { useEffect } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { usersAtom, usersSelector } from "../../atom/usersAtom";
import "./Users.scss";

const Users = () => {
  const [users, setUsers] = useRecoilState(usersAtom);
  const usersLoadable = useRecoilValueLoadable(usersSelector);

  useEffect(() => {
    if (usersLoadable.state === "hasValue" && Array.isArray(usersLoadable.contents)) {
      setUsers(usersLoadable.contents);
    }
  }, [usersLoadable.state, usersLoadable.contents, setUsers]);

  const removeUser = async (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
    try {
      await fetch(`http://localhost:3000/api/users/${id}`, { method: "DELETE" }); // No auth
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="users">
      <h2>Manage Users</h2>
      <div className="users-list">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id || user._id}> {/* Ensure unique key */}
                  <td>{user.name}</td>
                  <td>
                    <button className="remove-btn" onClick={() => removeUser(user.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
