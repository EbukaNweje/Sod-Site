import React, { useEffect, useState } from "react";
import "./AdminCss/Order.css"; 
import axios from "axios";

const Order = () => {
  const [order, setOrder] = useState([
    // {
    //   id: 1,
    //   date: "2025-02-28",
    //   totalProducts: 3,
    //   totalPrice: 15000,
    //   status: "Pending",
    // },
    // {
    //   id: 2,
    //   date: "2025-02-27",
    //   totalProducts: 2,
    //   totalPrice: 10000,
    //   status: "Pending",
    // },
  ]);

  const toggleStatus = (id) => {
    setOrder((prev) =>
      prev.map((order) =>
        order.id === id
          ? { ...order, status: order.status === "Pending" ? "Success" : "Pending" }
          : order
      )
    );
  };

  const getAllOrders = async () => {
    try {
      const response = await axios.get("https://sod-back-end.vercel.app/api/getAllOrders");
      console.log("Orders fetched successfully:", response.data);
      setOrder(response.data.orders || response.data); 
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);


  return (
    <div className='orderContainer'>
      <h2 className="title">Orders</h2>
      <table className="orderTable">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Total Products</th>
            <th>Total Price (₦)</th>
            <th>Status</th>
          </tr>
        </thead>
        {/* <tbody>
        {order.length > 0 ? (
            order.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.date}</td>
                <td>{order.totalProducts}</td>
                <td>₦{order.totalPrice ? order.totalPrice.toLocaleString() : "N/A"}</td>
                <td>
                  <button
                    className={`statusButton ${
                      order.status === "Pending" ? "pending" : "success"
                    }`}
                    onClick={() => toggleStatus(order._id)}
                  >
                    {order.status}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No orders found</td>
            </tr>
          )}
        </tbody> */}
      </table>
    </div>
  );
};

export default Order;
