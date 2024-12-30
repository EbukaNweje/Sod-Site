import React, { useState } from 'react'
import './componentCss/productCard.css'
import { IoCart } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { products } from './Theproduct'

const ProductCard = ({limit, categoryCard}) => {

    const navigate = useNavigate()

    const productsToDisplay = limit ? products.slice(0,limit) : products;

  return (
    <>
        <div className='product_card_body'>
            {
                productsToDisplay.map((e)=>(
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
                ))
            }
        </div>
    </>
  )
}

export default ProductCard