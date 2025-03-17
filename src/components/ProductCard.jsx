import React, { useEffect, useState } from 'react'
import './componentCss/productCard.css'
import { IoCart } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { products } from './Theproduct'

const ProductCard = ({limit, categoryCard}) => {

    const navigate = useNavigate()
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); 
    const productsToDisplay = limit ? products.slice(0,limit) : products;

 
  const getAllProducts = async () => {
    try {
      setLoading(true); 
      const response = await axios.get("https://sod-back-end.vercel.app/api/allProduct");

      if (response.status === 200) {
        setProducts(response.data.products || []); 
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
        

  return (
    <>
            <div className='product_card_body'>
            {loading ? (
            <p>Loading products...</p>
        ) : products.length === 0 ? (
            <p>No products available.</p>
        ) : (
            products.map((e)=>(
                    <div onClick={()=> navigate(`/product/${e.id}`)} key={e.id} className={`product_card ${categoryCard}`}>
                        <div className='product_card_cart_btn'>
                            <IoCart/>
                        </div>
                        <div className='product_card_image_container'>
                            <img src={e.image} alt='image'/>
                        </div>
                        <div className='product_card_text_container'>
                            <h3>{e.desc}</h3>
                            <p>{e.amount}</p>
                        </div>
                    </div>
                )))
            }

        </div>
    </>
  )
}

export default ProductCard