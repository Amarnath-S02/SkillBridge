import { useState } from "react";
import upload from "../../utils/upload";
import newRequest from "../../utils/newRequest";
import "./BecomeSeller.scss";

const BecomeSeller = () => {
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [seller, setSeller] = useState({
    username: "",
    phone: "",
    description: "",
    img: "",
  });

  const handleChange = (e) => {
    setSeller((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = file ? await upload(file) : "";
    const token = localStorage.getItem("token"); // Ensure user is authenticated
  
    try {
      const response = await newRequest.put(
        "/users/become-seller",
        { ...seller, img: url }, // Correct field name
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Success:", response.data);
      setSuccess(true);
    } catch (err) {
      console.error("Error updating seller profile:", err.response?.data || err);
    }
  };
  
  
  

  return (
    <div className="become-seller">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Become a Freelancer</h1>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" placeholder="Enter Username" value={seller.username} onChange={handleChange} required />
          
          <label htmlFor="profilePicture">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />

          <label htmlFor="phone">Phone Number</label>
          <input type="tel" name="phone" placeholder="Phone Number" value={seller.phone} onChange={handleChange} required />

          <button type="submit">Submit</button>
          {success && <p className="success-msg">✅ Profile updated successfully!</p>}
        </div>

        <div className="right">
          <label htmlFor="description">Brief Description</label>
          <textarea name="description" placeholder="Describe your services" value={seller.desc} onChange={handleChange} />
        </div>
      </form>
    </div>
  );
};

export default BecomeSeller;
