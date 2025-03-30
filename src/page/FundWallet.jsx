import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./Admin/AdminCss/Adminland.css";

const FundWallet = () => {
  const user = useSelector((state) => state?.user);
  const [amount, setAmount] = useState("");

  const handleFundWallet = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://sod-back-end.vercel.app/api/fundWallet", {
        userId: user?.data?.id,
        amount: parseFloat(amount),
      });
      console.log(res.data);
      alert("Wallet funded successfully!");
      setAmount(""); 
    } catch (error) {
      console.error("Error funding wallet:", error);
    }
  };

  return (
    <div className="Edit">
      <h2>Fund Wallet</h2>
      <form className="wallet-form" onSubmit={handleFundWallet}>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          placeholder="Enter amount"
        />

        <button type="submit">Add Funds</button>
      </form>
    </div>
  );
};

export default FundWallet;
