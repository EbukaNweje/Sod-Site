import React, { useState } from 'react'
import './componentCss/productCard.css'
import singlet_black from '../assets/singlet_black.png'
import { IoCart } from "react-icons/io5";

const ProductCard = ({limit}) => {

    const [products, setProducts] = useState([
        {
            id : 1,
            image : singlet_black,
            desc : "ISBx Center Logo Tank Top / Black",
            amount : "129,000.00₦ VAT"
        },
        {
            id : 2,
            image : singlet_black,
            desc : "ISBx Center Logo Tank Top / Black",
            amount : "129,000.00₦ VAT"
        },
        {
            id : 3,
            image : singlet_black,
            desc : "ISBx Center Logo Tank Top / Black",
            amount : "129,000.00₦ VAT"
        },
        {
            id : 4,
            image : singlet_black,
            desc : "ISBx Center Logo Tank Top / Black",
            amount : "129,000.00₦ VAT"
        },
        {
            id : 5,
            image : singlet_black,
            desc : "ISBx Center Logo Tank Top / Black",
            amount : "129,000.00₦ VAT"
        },
        {
            id : 6,
            image : singlet_black,
            desc : "ISBx Center Logo Tank Top / Black",
            amount : "129,000.00₦ VAT"
        },
        {
            id : 6,
            image : singlet_black,
            desc : "ISBx Center Logo Tank Top / Black",
            amount : "129,000.00₦ VAT"
        },
        {
            id : 6,
            image : singlet_black,
            desc : "ISBx Center Logo Tank Top / Black",
            amount : "129,000.00₦ VAT"
        },
        {
            id : 6,
            image : singlet_black,
            desc : "ISBx Center Logo Tank Top / Black",
            amount : "129,000.00₦ VAT"
        },
        {
            id : 6,
            image : singlet_black,
            desc : "ISBx Center Logo Tank Top / Black",
            amount : "129,000.00₦ VAT"
        },
        {
            id : 6,
            image : singlet_black,
            desc : "ISBx Center Logo Tank Top / Black",
            amount : "129,000.00₦ VAT"
        },
        {
            id : 6,
            image : singlet_black,
            desc : "ISBx Center Logo Tank Top / Black",
            amount : "129,000.00₦ VAT"
        },
        {
            id : 6,
            image : singlet_black,
            desc : "ISBx Center Logo Tank Top / Black",
            amount : "129,000.00₦ VAT"
        },
        {
            id : 6,
            image : singlet_black,
            desc : "ISBx Center Logo Tank Top / Black",
            amount : "129,000.00₦ VAT"
        },
        {
            id : 6,
            image : singlet_black,
            desc : "ISBx Center Logo Tank Top / Black",
            amount : "129,000.00₦ VAT"
        },
        {
            id : 6,
            image : singlet_black,
            desc : "ISBx Center Logo Tank Top / Black",
            amount : "129,000.00₦ VAT"
        },
        {
            id : 6,
            image : singlet_black,
            desc : "ISBx Center Logo Tank Top / Black",
            amount : "129,000.00₦ VAT"
        },
        {
            id : 6,
            image : singlet_black,
            desc : "ISBx Center Logo Tank Top / Black",
            amount : "129,000.00₦ VAT"
        },
    ])

    const productsToDisplay = limit ? products.slice(0,limit) : products;

  return (
    <>
        <div className='product_card_body'>
            {
                productsToDisplay.map((e)=>(
                    <div key={e.id} className='product_card'>
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