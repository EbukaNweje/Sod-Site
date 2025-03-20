import React, { useState, useEffect } from "react";
import axios from "axios";
import "./pagesCss/product.css";
import { useParams } from "react-router-dom";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://sod-back-end.vercel.app/api/oneProduct/${id}`
        );

        if (response.status === 200) {
          setProduct(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    if (!selectedSize) {
      setMessage("Please select a size before adding to cart.");
      return;
    }

    setLoading(true);
    setMessage("");

    const cartItem = {
      productId: product?._id,
      quantity: quantity,
    };

    try {
      const response = await axios.post(
        "https://sod-back-end.vercel.app/api/addCart",
        cartItem
      );
      setMessage("Product added to cart successfully!");
      console.log(response);
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
      } else {
        console.error("Error:", error);
      }
      setMessage("Error adding to cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="product_details_body">
      <div className="product_details_container">
        <div className="product_details_image_container">
          <img src={product.image} alt="" />
        </div>

        <div className="product_details_information_container">
          <h1>{product.desc}</h1>
          <h3>{product.amount}</h3>

          <p>Sizes</p>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
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
  );
};

export default Product;
