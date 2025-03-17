import React, { useEffect, useState } from "react";
import "./AdminCss/Order.css"; 
import axios from "axios";

const Order = () => {
  const [orders, setOrders] = useState([
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
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id
          ? { ...order, status: order.status === "Pending" ? "Success" : "Pending" }
          : order
      )
    );
  };

const getAllOrders = async () => {
  try {
    const response = await axios.get("https://sod-back-end.vercel.app/api/getallproducts");
    
    if (response.status === 200) {
      console.log("Products fetched successfully:", response.data.data);
      return response.data.data; 
    } else {
      throw new Error("Failed to fetch products");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; 
  }
};

useEffect(() => {
  getAllOrders()
}, [])


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
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td>{order.totalProducts}</td>
              <td>₦{order.totalPrice.toLocaleString()}</td>
              <td>
                <button
                  className={`statusButton ${
                    order.status === "Pending" ? "pending" : "success"
                  }`}
                  onClick={() => toggleStatus(order.id)}
                >
                  {order.status}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
