import React, { useReducer, useState } from "react";
import "./Add.scss";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [singleFile, setSingleFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleFeature = (e) => {
    e.preventDefault();
    const feature = e.target.feature.value.trim();
    if (feature) {
      dispatch({ type: "ADD_FEATURE", payload: feature });
    }
    e.target.reset();
  };

  const handleUpload = async () => {
    if (!singleFile && files.length === 0) {
      alert("Please select files to upload.");
      return;
    }

    setUploading(true);
    try {
      const cover = singleFile ? await upload(singleFile) : "";
      const images = await Promise.all(files.map((file) => upload(file)));

      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.error("File upload failed:", err);
      alert("File upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (gig) => newRequest.post("/gigs", gig),
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
      navigate("/mygigs");
    },
    onError: (error) => {
      console.error("Failed to create gig:", error);
      alert("Failed to create gig. Please try again.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.title || !state.cat || !state.price) {
      alert("Title, Category, and Price are required!");
      return;
    }
  
    mutation.mutate(state); // Send state as-is if backend checks `req.isSeller`
  };
  

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Service</h1>
        <div className="sections">
          <div className="info">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
              required
            />

            <label>Category</label>
            <select name="cat" id="cat" onChange={handleChange} required>
              <option value="">Select a category</option>

              <option value="graphic & Design">Graphic & Design</option>

              <option value="Video & Animation">Video & Animation</option>
              <option value="Writing-Translation">Writing & Translation</option>
              <option value="Ai-Services">AI Services</option>
              <option value="Digital-Marketing">Digital Marketing</option>
              <option value="Music-Audio">Music & Audio</option>
              <option value="Programming-Tech">Programming & Tech</option>
              <option value="Business">Business</option>
              <option value="Lifestyle">Lifestyle</option>
            </select>

            <div className="images">
              <div className="imagesInputs">
                <label>Cover Image</label>
                <input type="file" onChange={(e) => setSingleFile(e.target.files[0])} />

                <label>Upload Images</label>
                <input type="file" multiple onChange={(e) => setFiles([...e.target.files])} />
              </div>
              <button onClick={handleUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>

            <label>Description</label>
            <textarea
              name="desc"
              placeholder="Brief description to introduce your service to customers"
              onChange={handleChange}
              required
            ></textarea>

            <button onClick={handleSubmit} disabled={mutation.isLoading}>
              {mutation.isLoading ? "Creating..." : "Create"}
            </button>
          </div>

          <div className="details">
            <label>Service Title</label>
            <input
              type="text"
              name="shortTitle"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />

            <label>Short Description</label>
            <textarea
              name="shortDesc"
              placeholder="Short description of your service"
              onChange={handleChange}
            ></textarea>

            <label>Delivery Time (e.g. 3 days)</label>
            <input type="number" name="deliveryTime" onChange={handleChange} min="1" />

            <label>Revision Number</label>
            <input type="number" name="revisionNumber" onChange={handleChange} min="0" />

            <label>Add Features</label>
            <form onSubmit={handleFeature}>
              <input type="text" name="feature" placeholder="e.g. page design" />
              <button type="submit">Add</button>
            </form>

            <div className="addedFeatures">
              {state.features?.map((f) => (
                <div className="item" key={f}>
                  <button onClick={() => dispatch({ type: "REMOVE_FEATURE", payload: f })}>
                    {f} <span>X</span>
                  </button>
                </div>
              ))}
            </div>

            <label>Price</label>
            <input type="number" name="price" onChange={handleChange} min="1" required />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
