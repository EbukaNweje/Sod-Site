import React, { useState } from 'react'
import './pagesCss/checkout.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Button, Modal, message } from 'antd';
import { toast } from 'react-toastify';
import { RemoveCart } from '../components/global/features'
import { useDispatch } from 'react-redux';
import { CopyOutlined } from "@ant-design/icons";
import {ToastContainer} from 'react-toastify'


const Checkout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state?.User);
    const getCart = useSelector((state) => state?.cart);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [orderId, setOrderId] = useState("");

    console.log("cart",getCart)
    const [order, setOrder] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        apartment: "",
        city: "",
        state: "",
        country: "",
        phone: "",
    })

    const [copyMessage, setCopyMessage] = useState("");
    const [copyMessage2, setCopyMessage2] = useState("");

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopyMessage("Copied!");
        message.success("Copied to clipboard!");
        setTimeout(() => setCopyMessage(""), 2000); // Hide message after 2s
    };
    const handleCopy2 = (text) => {
        navigator.clipboard.writeText(text);
        setCopyMessage2("Copied!");
        message.success("Copied to clipboard!");
        setTimeout(() => setCopyMessage2(""), 2000); // Hide message after 2s
    };

    

    const handleChange = (e) => {
        setOrder({...order, [e.target.name]: e.target.value})
    }

    const handleOk = () => {
        setIsModalOpen(false);
        toast.success("Order Placed Successfully")
        dispatch(RemoveCart())
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };

    const handleSubmit = async (e) => {
        if(!order.firstName || !order.lastName || !order.email || !order.address || !order.city || !order.state || !order.country || !order.phone){
            alert("All fields are required")
            return
        }

        const url = "https://sod-back-end.vercel.app/api/placeOrder"
         e.preventDefault()
         setLoading(true)
      try {
        const res = await axios.post(url, order,{
            headers: {
                Authorization: `header ${user.token}`
            }
        })
        setOrderId(res?.data?.order?._id)
        setIsModalOpen(true);
        setLoading(false)
        navigate(`/${userdata.username}`)
        console.log(res)

      } catch (error) {
        console.log(error)
        setLoading(false)
      }
       

    }
    

  return (
    <>
    <ToastContainer />

        <main className='checkout_main_body'>
            <article className='checkout_delivery_details'>
                <section className='delivery_details_top'>
                    <h3>Delivery details</h3>
                </section>
                <section className='delivery_details_bottom'>
                    <div className='delivery_details_input_container'>
                        <input
                            type='text'
                            placeholder='First name *'
                            name='firstName'
                            value={order.firstName}
                            onChange={handleChange}
                        />
                        <input
                            type='text'
                            placeholder='Last name *'
                            name='lastName'
                            value={order.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='delivery_details_input_container'>
                        <input
                            type='text'
                            placeholder='Phone number *'
                            name='phone'
                            value={order.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='delivery_details_input_container'>
                        <input
                            type='email'
                            placeholder='Email *'
                            name='email'
                            value={order.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='delivery_details_input_container'>
                        <select 
                        name='country'
                        value={order.country}
                        onChange={handleChange}
                        >
                            <option>Choose Country</option>
                            <option>Nigeria</option>
                            <option>United States</option>
                            <option>Ghana</option>
                            <option>United Kingdom</option>
                            <option>South Africa</option>
                            <option>Kenya</option>
                            <option>Uganda</option>
                            <option>Tanzania</option>
                            <option>Cameroon</option>
                            <option>South Sudan</option>
                            <option>Malawi</option>
                            <option>Mozambique</option>
                            <option>Mauritius</option>
                            <option>Maldives</option>
                            <option>Comoros</option>
                        </select>
                    </div>
                    <div className='delivery_details_input_container'>
                        <select
                            name='state'
                            value={order.state}
                            onChange={handleChange}
                        >
                            <option>Choose State</option>
                            <option>Lagos</option>
                            <option>Abuja</option>
                            <option>Port Harcourt</option>
                            <option>Abia</option>
                            <option>Adamawa</option>
                            <option>Akwa Ibom</option>
                            <option>Anambra</option>
                            <option>Bayelsa</option>
                            <option>Benue</option>
                            <option>Borno</option>
                            <option>Cross River</option>
                            <option>Delta</option>
                            <option>Edo</option>
                        </select>
                        <input
                            type='text'
                            placeholder='Town / City *'
                            name='city'
                            value={order.city}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='delivery_details_input_container'>
                        <input
                            type='text'
                            placeholder='House number and street name'
                            name='address'
                            value={order.address}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='delivery_details_input_container'>
                        <input
                            type='text'
                            placeholder='Apartment,suite,unit,etc.(optional)'
                            name='apartment'
                            value={order.apartment}
                            onChange={handleChange}
                        />
                    </div>
                </section>
            </article>
            <article className='checkout_order_message_area'>
                <section className='checkout_order_summary_container'>
                    <div className='cart_summary_top'>
                        <h3>ORDER SUMMARY</h3>
                    </div>
                    <div className='cart_summary_middle'>
                        <p>Item's total ({getCart?.length <= 0 ? "0" : getCart?.cart?.length})</p>
                        <h3>{getCart?.subtotal}₦ VAT</h3>
                    </div>
                    <div className='cart_summary_middle'>
                        <p>Shipping Fee</p>
                        <h3>Pay on delivery</h3>
                    </div>
                    <div className='cart_summary_middle'>
                        <p>Subtotal</p>
                        <h3>{getCart?.subtotal}₦ VAT</h3>
                    </div>
                    <div className='cart_summary_middle'
                        style={{
                            flexDirection: "column",
                            alignItems: "flex-start",
                            padding: "0"
                        }}
                    >
                        <h3 style={{marginTop: "8px", paddingLeft: "10px"}}>Payment Method</h3>
                        <div className='Payment_method'>
                            <div className='check'>
                                <input type='radio' name='payment' />
                            </div>
                            <p> Manual payment</p>
                        </div>
                    </div>
                    <div className='cart_summary_btn_container'>
                        <button onClick={handleSubmit}>{loading ? "Processing..." : "Checkout"}</button>
                    </div>
                </section>
            </article>
        </main>

        <Modal title="Payment Info" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} style={{
            marginTop: "100px"
        }}>

            <div style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                margin: "20px 0"
            }}>
                <p>Total Amount: {getCart?.subtotal}₦</p>
            </div>

            <p>Bank Name: SOD EMPORIUM DESIGN LTD </p>
            <p>
                <strong>Account Number:</strong> 6521937628{" "}
                <CopyOutlined onClick={() => handleCopy("6521937628")} style={{ cursor: "pointer", color: "#014711", marginLeft: "5px" }} />
                {copyMessage === "Copied!" && <span style={{ color: "green", marginLeft: "5px" }}>✔ Copied!</span>}
            </p>
            <p>Account Number: Moniepoint MFB </p>
            
            <div style={{
                marginTop: "20px"
            }} >
                <h3>Send Proof of Payment</h3>
                    <p>Order ID: {orderId} {" "}
                    <CopyOutlined onClick={() => handleCopy2({orderId})} style={{ cursor: "pointer", color: "#014711", marginLeft: "5px" }} />
                    {copyMessage2 === "Copied!" && <span style={{ color: "green", marginLeft: "5px" }}>✔ Copied!</span>}
                    </p>
                <p>Please send your Proof of payment and Order id to</p>
                  <button style={{
                    marginTop: "10px",
                    padding: "10px",
                    backgroundColor: "#014711",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}><a href="https://wa.me/message/CL4Z4FLG3LMTO1" target="_blank" rel="noopener noreferrer" style={{color: "#fff"}}> Send Proof of payment</a></button>
            </div>
            
            
      </Modal>
    </>
  )
}

export default Checkout
