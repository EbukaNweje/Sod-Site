import React, { useEffect } from 'react'
import './pagesCss/cart.css'
import sod_orginal_snake_design_logo_pair_t_shirt_and_shorts from '../assets/sod_orginal_snake_design_logo_pair_t_shirt_and_shorts.png';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FiMinus } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Cart = () => {

    const navigate = useNavigate()
    const userData = useSelector((state) => state?.User);
    const id = useSelector((state) => state?.id);
    const cartUrl = "https://sod-back-end.vercel.app/api/getCart"
    const [cart, setCart] = React.useState([]);
    const [subtotal, setSubtotal] = React.useState(0);
    
    const getUserCart = () => {
        axios.get(cartUrl, {
            headers: { Authorization: `header ${userData.token}` }
        })
        .then(res => {
            // console.log(res)
            setCart(res.data.cart);
            setSubtotal(res.data.subtotal); // Store subtotal
        })
        .catch(err => console.error("Error fetching cart:", err));
    };
    
 

    const handleDeleteCart = (productId)=>{
         const cartUrl2 = `https://sod-back-end.vercel.app/api/deleteoneCart/${productId}`

         axios.delete(cartUrl2,{
            headers: {
                Authorization: `header ${userData.token}`
            }
        })
        .then(res => {
            console.log(res)
            // setCart(res?.data)
        })
        .catch(err => {
            console.log(err)
        })
        

    } 

    useEffect(() => {
        getUserCart();
    }, [cart]);

  return (
    <>
        <main className='cart_page_main_body'>
            <article className='cart_item_container'>
                <section className='cart_item_container_top'>
                    <h3>Cart ({id ? cart?.length : "0"})</h3>
                </section>

              <>
                    {
                        id  && cart <= 0 ? <p style={{
                            color: "gray",
                            marginLeft: "10px"
                        }}>No Cart Item</p> : 
                        cart?.map((props, index)=>(
                            <section className='cart_item_container_bottom' key={index}>
                     <div className='cart_item_card'>
                        <div className='cart_item_card_top'>
                            <div className='cart_item_product_details'>
                                <div className='cart_item_product_image'>
                                    <img src={props?.productId?.image} alt='image'/>
                                </div>
                                <div className='cart_item_product_text'>
                                    <p>{props?.productId?.name}</p>
                                </div>
                            </div>
                            <div className='cart_item_product_amount'>
                                <h3>{Number(props?.productId?.price).toLocaleString()}₦ VAT</h3>
                            </div>
                        </div>
                        <div className='cart_item_card_bottom'>
                            <div className='remove_cart_item'>
                                <MdOutlineDeleteOutline size={20}/>
                                <p onClick={()=>handleDeleteCart(props?.productId?._id)}>Remove</p>
                            </div>
                            <div className='cart_item_quantity_container'>
                                {/* <button><FiMinus/></button> */}
                                <p>size: {props.size}</p>
                                <p>quantity: {props.quantity}</p>
                                {/* <button><MdAdd/></button> */}
                            </div>
                        </div>
                    </div>
                    </section>
                        ))
                 }
              </>
                    
            </article>
            <article className='cart_message_area'>
                <section className='cart_summary_container'>
                    <div className='cart_summary_top'>
                        <h3>CART SUMMARY</h3>
                    </div>
                    {/* <div className='cart_summary_middle'>
                        <p>Item's total (1)</p>
                        <h3>129,000.00₦ VAT</h3>
                    </div> */}
                    <div className='cart_summary_middle'>
                        <p>Subtotal</p>
                        <h3> {subtotal}₦ VAT</h3>
                    </div>
                    <div className='cart_summary_btn_container'>
                        <button onClick={()=>navigate("/checkout")}>Checkout</button>
                    </div>
                </section>
            </article>
        </main>
    </>
  )
}

export default Cart