import React from 'react'
import './componentCss/footer.css'
import { FaParachuteBox } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import sodlogo_white from '../assets/sodlogo-white.jpg'
import { LiaCcVisa } from "react-icons/lia";
import { LiaCcDiscover } from "react-icons/lia";
import { LiaCcApplePay } from "react-icons/lia";
import { LiaCcMastercard } from "react-icons/lia";

const Footer = () => {
  return (
    <>
      <main className='footer_main_body'>
        <section className='footer_top_body'>
          <div className='footer_top_left_container'>
            <div className='footer_top_card_container'>
              <FaParachuteBox size={20} color='#727272'/>
              <h3>60 Days Return</h3>
              <p>Allow 7-14 business days to process your return</p>
            </div>
            <div className='footer_top_card_container'>
              <FaTruck size={20} color='#727272'/>
              <h3>Free Shipping</h3>
              <p>Not available at this time</p>
            </div>
          </div>
          <div className='footer_top_right_container'>
            <h2>Newsletter Sign Up</h2>
            <div className='footer_news_letter_input_container'>
              <input
                type='text'
                placeholder='Your email please'
              />
              <button>SUBSCRIBE</button>
            </div>
          </div>
        </section>
        <section className='footer_bottom_body'>
          <div className='footer_bottom_links_holder'>
            <div className='footer_bottom_logo_link_container'>
              <div className='footer_bottom_logo'>
                <img src={sodlogo_white} alt='image'/>
              </div>
              <p>Protecting the world.</p>
              <span>
                <FaInstagram/>
                <FaTwitter/>
              </span>
            </div>
            <div className='footer_links_container'>
              <h2>Information</h2>
              <a href=''>About</a>
              <a href=''>Our story</a>
              <a href=''>Awards & achievement</a>
              <a href=''>Contact</a>
            </div>
            <div className='footer_links_container'>
              <h2>Discover</h2>
              <a href=''>Shirts</a>
              <a href=''>Hoodies</a>
              <a href=''>Caps</a>
              <a href=''>Slides</a>
            </div>
            <div className='footer_links_container'>
              <h2>Locate Us</h2>
              <a href=''>ISB Originals Store B11, Capital Mall,</a>
              <a href=''>Orchid Road Lekki Lagos, Nigeria.</a>
              <a href=''>+2348123947939</a>
              <a href=''>12@isb.ng</a>
            </div>
          </div>
          <div className='footer_bottom_end'>
            <p>© 2024 ISB Originals. Powered by ISB Originals</p>
            <span>
              <LiaCcVisa/>
              <LiaCcMastercard/>
              <LiaCcDiscover/>
              <LiaCcApplePay/>
            </span>
          </div>
        </section>
      </main>
    </>
  )
}

export default Footer
