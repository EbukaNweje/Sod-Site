import React from 'react'
import './pagesCss/cart.css'
import sod_orginal_snake_design_logo_pair_t_shirt_and_shorts from '../assets/sod_orginal_snake_design_logo_pair_t_shirt_and_shorts.png';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FiMinus } from "react-icons/fi";
import { MdAdd } from "react-icons/md";

const Cart = () => {
  return (
    <>
        <main className='cart_page_main_body'>
            <article className='cart_item_container'>
                <section className='cart_item_container_top'>
                    <h3>Cart (1)</h3>
                </section>
                <section className='cart_item_container_bottom'>
                    <div className='cart_item_card'>
                        <div className='cart_item_card_top'>
                            <div className='cart_item_product_details'>
                                <div className='cart_item_product_image'>
                                    <img src={sod_orginal_snake_design_logo_pair_t_shirt_and_shorts} alt='image'/>
                                </div>
                                <div className='cart_item_product_text'>
                                    <p>Sod Orginal Snake-design-logo pair T-shirt and Shorts</p>
                                </div>
                            </div>
                            <div className='cart_item_product_amount'>
                                <h3>129,000.00₦ VAT</h3>
                            </div>
                        </div>
                        <div className='cart_item_card_bottom'>
                            <div className='remove_cart_item'>
                                <MdOutlineDeleteOutline size={20}/>
                                <p>Remove</p>
                            </div>
                            <div className='cart_item_quantity_container'>
                                <button><FiMinus/></button>
                                <p>1</p>
                                <button><MdAdd/></button>
                            </div>
                        </div>
                    </div>
                </section>
            </article>
            <article className='cart_message_area'>
                <section className='cart_summary_container'>
                    <div className='cart_summary_top'>
                        <h3>CART SUMMARY</h3>
                    </div>
                    <div className='cart_summary_middle'>
                        <p>Subtotal</p>
                        <h3>129,000.00₦ VAT</h3>
                    </div>
                    <div className='cart_summary_btn_container'>
                        <button>Checkout</button>
                    </div>
                </section>
            </article>
        </main>
    </>
  )
}

export default Cart