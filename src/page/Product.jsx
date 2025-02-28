import React, { useState } from "react";
import axios from "axios";
import "./pagesCss/product.css";
import { products } from "../components/Theproduct";
import { useParams } from "react-router-dom";

const Product = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [loading, setLoading] = useState(false); 
  const [message, setMessage] = useState(""); 

  const selectedProduct = products.find((product) => product.id === Number(id));

  const addToCart = async () => {
    if (!selectedSize) {
      setMessage("Please select a size before adding to cart.");
      return;
    }

    setLoading(true);
    setMessage("");

    const cartItem = {
      productId: selectedProduct.id,
      name: selectedProduct.desc,
      price: selectedProduct.amount,
      image: selectedProduct.image,
      quantity: quantity,
      size: selectedSize,
    };

    try {
      const response = await axios.post("https://your-api-url.com/cart", cartItem);
      setMessage("Product added to cart successfully!");
    } catch (error) {
      setMessage("Error adding to cart. Please try again.");
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="product_details_body">
        <div className="product_details_container">
          <div className="product_details_image_container">
            <img src={selectedProduct.image} alt="" />
          </div>

          <div className="product_details_information_container">
            <h1>{selectedProduct.desc}</h1>
            <h3>{selectedProduct.amount}</h3>

            <p>Sizes</p>
            <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
              <option value="">Choose an option</option>
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
              <option value="xl">XL</option>
              <option value="2xl">2XL</option>
              <option value="3xl">3XL</option>
              <option value="4xl">4XL</option>
            </select>

            {selectedSize && (
              <div className="availability_container">
                <h4>
                  Availability: <span>1 in stock</span>
                </h4>
              </div>
            )}

            <div className="product_details_quantity_button_container">
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <button onClick={addToCart} disabled={loading}>
                {loading ? "Adding..." : "Add to Cart"}
              </button>
            </div>

            {message && <p className="message">{message}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
