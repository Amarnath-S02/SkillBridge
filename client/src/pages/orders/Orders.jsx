import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import "./Orders.scss";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch orders
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await newRequest.get(`/orders`);
      return res.data;
    },
  });

  // Mutation to update order status
  const updateOrderStatus = useMutation({
    mutationFn: async (orderId) => {
      await newRequest.put(`/orders/${orderId}/complete`);
    },
    onMutate: async (orderId) => {
      await queryClient.cancelQueries({ queryKey: ["orders"] });

      const previousOrders = queryClient.getQueryData(["orders"]);

      // Optimistically update UI
      queryClient.setQueryData(["orders"], (oldData) =>
        oldData
          ? oldData.map((order) =>
              order._id === orderId ? { ...order, status: "completed" } : order
            )
          : []
      );

      return { previousOrders };
    },
    onError: (err, orderId, context) => {
      queryClient.setQueryData(["orders"], context.previousOrders);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const handleComplete = (orderId) => {
    updateOrderStatus.mutate(orderId);
  };

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        const res = await newRequest.post(`/conversations/`, {
          to: currentUser.isSeller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };

  // Filter orders properly to remove duplicates
  const filteredOrders = data
    ? data.filter((order, index, self) => {
        if (currentUser.isSeller) {
          // Sellers see only "pending" and "completed"
          return order.status === "pending" || order.status === "completed";
        } else {
          // Buyers see only "in-progress" until completed
          return (
            order.status === "in-progress" ||
            (order.status === "completed" &&
              !self.some(
                (o) => o._id === order._id && o.status === "in-progress"
              ))
          );
        }
      })
    : [];

  return (
    <div className="orders">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Error fetching orders."
      ) : (
        <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Status</th>
                {currentUser.isSeller && <th className="is-seller">Action</th>}
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td>
                    <img className="image" src={order.img} alt="" />
                  </td>
                  <td>{order.title}</td>
                  <td>₹{order.price}</td>
                  <td
                    className={order.status === "completed" ? "completed" : "pending"}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </td>
                  <td className={currentUser.isSeller ? "is-seller" : "action-column"}>
                    {currentUser.isSeller && order.status !== "completed" && (
                      <button
                        className="complete-btn"
                        onClick={() => handleComplete(order._id)}
                      >
                        Mark as Completed
                      </button>
                    )}
                  </td>
                  <td>
                    <img
                      className="message-m"
                      src="./img/message.png"
                      alt="Message"
                      onClick={() => handleContact(order)}
                    />
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

export default Orders;
