import React from "react";
import { IoCart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./componentCss/productCard.css";
import { TbCurrencyNaira } from "react-icons/tb";

const ProductC = ({ product = [], onEdit, loading, error, limit }) => {
  const navigate = useNavigate();

  return (
    <div className="product_card_body">
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : product.length === 0 ? (
        <p>No products available.</p>
      ) : (
        (limit ? product.slice(0, limit) : product).map((e) => (
          <div
            // onClick={() => navigate(`/product/${e?._id}`)} 
            key={e?._id}
            className="product_card"
          >
            <div className="product_card_cart_btn">
              <IoCart />
            </div>
            <div className="product_card_image_container">
              <img src={e.image} alt={e.name || "Product"} loading="lazy" />
            </div>
            <div className="product_card_text_container">
              <h3>{e.name}</h3>
              <p style={{display: "flex", alignItems: "center", gap: "2px", justifyContent: "center"}}>
                <TbCurrencyNaira />
                {Number(e.price).toLocaleString()}K
              </p>
              <p style={{color: "#b22222", fontSize: "12px"}}>
                 {e?.quantity} {e?.quantity === 1 ? "piece" : "pieces"} in stock
              </p>
              <button className="editButton" onClick={onEdit}>Edit</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductC;
