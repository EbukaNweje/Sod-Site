import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaBoxOpen, FaShoppingCart, FaPlus, FaList, FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./AdminCss/Adminland.css";

const Sidebar = () => {
  const [productDropdown, setProductDropdown] = useState(false);
  const [orderDropdown, setOrderDropdown] = useState(false);

  return (
    <div className="Sidebar">
      <nav className="nav-links">
        <NavLink to="/adminpage" className="nav-item">
          <FaTachometerAlt className="icon" />
          <span>Account settings</span>
        </NavLink>
              <NavLink to="add-product" className="nav-item">
                <FaPlus className="icon" />
                <span>Add Product</span>
              </NavLink>
              <NavLink to="all-products" className="nav-item">
                <FaList className="icon" />
                <span>See All Products</span>
              </NavLink>
              <NavLink to="all-orders" className="nav-item">
                <FaList className="icon" />
                <span>See All Orders</span>
              </NavLink>
              </nav>
      {/* <button className="side-button">Log out</button> */}
        
    </div>
  );
};

export default Sidebar;
