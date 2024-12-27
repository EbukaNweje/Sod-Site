import React, { useState } from 'react'
import './pagesCss/product.css'
import singlet_black from '../assets/singlet_black.png'

const Product = () => {

    const [quantity, setQuantity] = useState(1)
    const [selectedSize, setSelectedSize] = useState("")
    const [stockAvailability, setStockAvailability] = useState(false)

  return (
    <>
        <div className='product_details_body'>
            <div className='product_details_container'>
                <div className='product_details_image_container'>
                    <img src={singlet_black} alt=''/>
                </div>
                <div className='product_details_information_container'>
                    <h1>ISBx Center Logo Tank Top / Black</h1>
                    <h3>201,025.00₦ VAT</h3>
                    <p>Sizes</p>
                    <select value={selectedSize} onChange={(e)=>setSelectedSize(e.target.value)}>
                        <option value="">Choose an option</option>
                        <option value="s">S</option>
                        <option value="m">M</option>
                        <option value="l">l</option>
                        <option value="xl">Xl</option>
                        <option value="2xl">2Xl</option>
                        <option value="3xl">3Xl</option>
                        <option value="4xl">4Xl</option>
                    </select>
                    {
                        selectedSize != "" ? 
                            <div className='availability_container'>
                                <h4>Availability: <span>1 in stock</span></h4>
                            </div>
                        : null
                    }
                    <div className='product_details_quantity_button_container'>
                        <input
                            type = 'number'
                            min = '1'
                            value = {quantity}
                            onChange={(e)=>setQuantity(e.target.value)}
                        />
                        <button>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Product