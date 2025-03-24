import React, { useState, useEffect } from "react";
import axios from "axios";
import "./pagesCss/product.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const  userId = useSelector((state) => state?.id);
  const userData = useSelector((state) => state?.User);
  const navigate = useNavigate();
  console.log(userId)
  console.log(userData)

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

  console.log(selectedSize)

  const addToCart = async () => {
    if(!userId){
      return navigate("/login")
    }

    if (!selectedSize) {
      setMessage("Please select a size before adding to cart.");
      return;
    }

    setLoading(true);
    setMessage("");

    const cartItem = {
      productId: product?._id,
      quantity: quantity,
      size: selectedSize,
    };

    const Token =  userData.token

    try {

      console.log("this is the cart item",cartItem)
      const response = await axios.post(
        "https://sod-back-end.vercel.app/api/addCart",
        cartItem, {
          headers: {
            "Authorization": `header ${Token}`,
          }
        }
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
          <h1>{product.name}</h1>
          <h1>{product.description}</h1>
          <h3>{Number(product.price).toLocaleString()}K</h3>

          <p>Sizes Available : {product.size}</p>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option value="">Choose an option</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="xL">XL</option>
            <option value="XXL">XXL</option>
            <option value="2xL">2XL</option>
            <option value="3xL">3XL</option>
            <option value="4xL">4XL</option>
          </select>

          {selectedSize && (
  <div className="availability_container">
    {product.size.includes(selectedSize.toUpperCase()) ? (
      <h4>
        Availability: <span style={{ color: "green" }}>In Stock</span>
      </h4>
    ) : (
      <h4>
        Availability: <span style={{ color: "red" }}>Out of Stock</span>
      </h4>
    )}
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
