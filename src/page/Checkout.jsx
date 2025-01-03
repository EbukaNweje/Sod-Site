import React from 'react'
import './pagesCss/checkout.css'

const Checkout = () => {
  return (
    <>
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
                        />
                        <input
                            type='text'
                            placeholder='Last name *'
                        />
                    </div>
                    <div className='delivery_details_input_container'>
                        <input
                            type='text'
                            placeholder='Phone number *'
                        />
                    </div>
                    <div className='delivery_details_input_container'>
                        <input
                            type='email'
                            placeholder='Email *'
                        />
                    </div>
                    <div className='delivery_details_input_container'>
                        <select>
                            <option>Nigeria</option>
                            {/* <option>Ghana</option> */}
                        </select>
                    </div>
                    <div className='delivery_details_input_container'>
                        <select>
                            <option>Lagos</option>
                            {/* <option>Ghana</option> */}
                        </select>
                        <input
                            type='text'
                            placeholder='Town / City *'
                        />
                    </div>
                    <div className='delivery_details_input_container'>
                        <input
                            type='text'
                            placeholder='House number and street name'
                        />
                    </div>
                    <div className='delivery_details_input_container'>
                        <input
                            type='text'
                            placeholder='Apartment,suite,unit,etc.(optional)'
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
                        <p>Item's total (1)</p>
                        <h3>129,000.00₦ VAT</h3>
                    </div>
                    <div className='cart_summary_middle'>
                        <p>Total</p>
                        <h3>129,000.00₦ VAT</h3>
                    </div>
                    <div className='cart_summary_btn_container'>
                        <button>Confirm order</button>
                    </div>
                </section>
            </article>
        </main>
    </>
  )
}

export default Checkout
