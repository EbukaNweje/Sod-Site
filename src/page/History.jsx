import React, { useEffect, useState } from "react";
import axios from "axios";
import "./pagesCss/History.css";

const History = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrderHistory = async () => {
    const token = localStorage.getItem("authToken");
    console.log('userToken',token);
    
    try {
      const response = await axios.get("https://sod-back-end.vercel.app/api/userHistory", {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("res",response)
      setOrders(response.data);
    } catch (err) {
      setError("Failed to load order history. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  return (
    <div className="history_details_body">
      <h2>Order History</h2>

      <div className="history_details_container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order Date</th>
                <th>Total Products</th>
                <th>Total Price</th>
                <th>Product Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders?.length > 0 ? (
                orders?.map((order, index) => (
                  <tr key={index}>
                    <td>{order.orderDate}</td>
                    <td>{order.totalProducts}</td>
                    <td>${order.totalPrice}</td>
                    <td>{order.productName}</td>
                    <td>
                      <button
                        className={`status-button ${
                          order.status === "pending" ? "pending" : "completed"
                        }`}
                        disabled
                      >
                        {order.status}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No order history available.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default History;
