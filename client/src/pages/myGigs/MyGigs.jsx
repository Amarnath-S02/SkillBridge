import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MyGigs.scss";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function MyGigs() {
  const currentUser = getCurrentUser();

  // ✅ Ensure user is logged in
  if (!currentUser || !currentUser._id) {
    return <p>Error: User not logged in.</p>;
  }

  const queryClient = useQueryClient();
  
  // ✅ State for modal
  const [showModal, setShowModal] = useState(false);
  const [gigToDelete, setGigToDelete] = useState(null);

  // ✅ Fetch gigs for the current user
  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs", currentUser._id],
    queryFn: async () => {
      const response = await newRequest.get(`/gigs?freelancerId=${currentUser._id}`);
      return response.data.filter(gig => gig.userId === currentUser._id);
    },
    enabled: !!currentUser._id,
  });
  

  // ✅ Mutation to delete a gig
  const mutation = useMutation({
    mutationFn: async (id) => {
      await newRequest.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]); // Refresh list
      setShowModal(false); // Close modal after deletion
    },
  });

  // ✅ Show Modal when delete is clicked
  const handleDeleteClick = (id) => {
    setGigToDelete(id);
    setShowModal(true);
  };

  // ✅ Confirm deletion
  const confirmDelete = () => {
    if (gigToDelete) {
      mutation.mutate(gigToDelete);
    }
  };

  // ✅ Close Modal
  const closeModal = () => {
    setShowModal(false);
    setGigToDelete(null);
  };

  return (
    <div className="myGigs">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching Services.</p>
      ) : (
        <div className="container">
          <div className="title">
            <h1>My Services</h1>
            {currentUser.isSeller && (
              <Link to="/add">
                <button>Add New Service</button>
              </Link>
            )}
          </div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.length > 0 ? (
                data.map((gig) => (
                  <tr key={gig._id}>
                    <td>
                      <img
                        className="image"
                        src={gig.cover || "/img/default.jpg"}
                        alt="Gig"
                      />
                    </td>
                    <td>{gig.title}</td>
                    <td>Rs {gig.price}</td>
                    <td>
                      <img
                        className="delete"
                        src="/img/delete.png"
                        alt="Delete"
                        onClick={() => handleDeleteClick(gig._id)}
                        style={{ cursor: "pointer" }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No Services found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Delete Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this service?</p>
            <div className="modal-actions">
              <button className="confirm-btn" onClick={confirmDelete}>
                Yes, Delete
              </button>
              <button className="cancel-btn" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyGigs;
