import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminCss/Order.css";
import { toast } from "react-toastify";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getAllOrders = async () => {
    const Token = localStorage.getItem("authToken");
    const url = "https://sod-back-end.vercel.app/api/getAllOrders";
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `header ${Token}`,
        },
      });
      console.log(response);
      
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const toggleStatus = (id) => {
    setOrders((prev) =>
      prev.map((order) =>
        order._id === id
          ? { ...order, status: order.status === "Pending" ? "Success" : "Pending" }
          : order
      )
    );
  };

  const deleteOrder = async (id) => {
    const Token = localStorage.getItem("authToken");
    const url = `https://sod-back-end.vercel.app/api/deleteOrder/${id}`;
    try {
    const res =  await axios.delete(url, {
        headers: { Authorization: `header ${Token}` },
      });
      
    if (res.data && res.data.message) {
      toast.success(res.data.message); 
    } else {
      toast.success("Order deleted successfully!");
    }
      setOrders((prev) => prev.filter((order) => order._id !== id));
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const showOrderModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className="orderContainer">
      <h2 className="title">Orders</h2>
      <table className="orderTable">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Total Products</th>
            <th>Total Price (₦)</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <tr key={order._id} onClick={() => showOrderModal(order)}>
                <td>{index + 1}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>{order?.products.length}</td>
                <td>₦{order.total ? order.total.toLocaleString() : "N/A"}</td>
                <td>
                  <button
                    className={`statusButton ${order.status === "Pending" ? "pending" : "success"}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStatus(order._id);
                    }}
                  >
                    {order.status}
                  </button>
                </td>
                <td>
                  <button
                    className="deleteButton"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteOrder(order._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && selectedOrder && (
        <div className="modal">
          <div className="modalContent">
            <h3>Order Details</h3>
            <p><strong>Name:</strong> {selectedOrder.firstName} {selectedOrder.lastName}</p>
            <p><strong>Email:</strong> {selectedOrder.email}</p>
            <p><strong>Phone:</strong> {selectedOrder.phone}</p>
            <p><strong>Address:</strong> {selectedOrder.address}, {selectedOrder.city}, {selectedOrder.state}, {selectedOrder.country}</p>
            <p><strong>Total Price:</strong> ₦{selectedOrder.total.toLocaleString()}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Quantity:</strong>{selectedOrder.quantity}</p>
            <p><strong>Sizes:</strong>{selectedOrder.size}</p>
            {/* <ul>
              {selectedOrder.size.map((product, index) => (
                <li key={index}>{product}</li>
              ))}
            </ul> */}
            <p><strong>Proucts:</strong></p>
            <ul>
              {selectedOrder.products.map((product, index) => (
                <li key={index}>{product.productId.name} - ₦{product.price.toLocaleString()}</li>
              ))}
            </ul>
            {/* <p><strong>Image: <img src={selectedOrder.image} alt="productImage" /></strong></p> */}
            <button onClick={closeModal} className="closeButton">Close</button>
            <button onClick={() => deleteOrder(selectedOrder._id)} className="deleteButton">Delete Order</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
