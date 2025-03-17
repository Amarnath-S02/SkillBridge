import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Profile.scss"; // Assuming you have a Profile.scss file

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    country: "",
    phone: "",
    desc: "",
    img: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/users/${id}`, {
          withCredentials: true,
        });
        setUser(res.data);
        setFormData({
          username: res.data.username || "",
          email: res.data.email || "",
          country: res.data.country || "",
          phone: res.data.phone || "",
          desc: res.data.desc || "",
          img: res.data.img || "",
        });
      } catch (err) {
        setError("Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImage(file);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("http://localhost:3000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      setFormData((prev) => ({ ...prev, img: res.data.imageUrl }));
    } catch (err) {
      setError("Failed to upload image");
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:3000/api/users/${id}`, formData, {
        withCredentials: true,
      });
      setUser(res.data);
      setEditMode(false);
    } catch (err) {
      setError("Failed to update user");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={user.img || "default-avatar.png"}
            alt="User Avatar"
            className="profile-avatar"
          />
          <h2>{user.username}</h2>
        </div>

        {!editMode ? (
          <div className="profile-info">
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Country:</strong> {user.country || "Not specified"}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone || "Not available"}
            </p>
            <p>
              <strong>Bio:</strong>   {user.desc || "No description provided"}
            </p>
            <button className="edit-button" onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
          </div>
        ) : (
          <div className="edit-profile">
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Country:</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Bio:</label>
              <textarea
                name="desc"
                value={formData.desc}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Profile Image:</label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              
            </div>
            <div className="edit-buttons">
              <button className="save-button" onClick={handleUpdate}>
                Save
              </button>
              <button className="cancel-button" onClick={() => setEditMode(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;