import React from "react";
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

  // ✅ Fetch gigs for the current user
  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs", currentUser._id], // Ensure query key is user-specific
    queryFn: async () => {
      const response = await newRequest.get(`/gigs?userId=${currentUser._id}`);
      return response.data;
    },
    enabled: !!currentUser._id, // ✅ Prevent fetching if no user is logged in
  });
  

  // ✅ Mutation to delete a gig
  const mutation = useMutation({
    mutationFn: async (id) => {
      try {
        const response = await newRequest.delete(`/gigs/${id}`);
        console.log(`Deleted gig ${id}:`, response.data);
        return response.data;
      } catch (err) {
        console.error(`Error deleting gig ${id}:`, err);
        throw err;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]); // Refresh list
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this gig?")) {
      mutation.mutate(id);
    }
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
                <th>Sales</th>
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
                    <td>{gig.sales}</td>
                    <td>
                      <img
                        className="delete"
                        src="/img/delete.png"
                        alt="Delete"
                        onClick={() => handleDelete(gig._id)}
                        style={{ cursor: "pointer" }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No Services found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyGigs;
