import React from 'react'
import "./pagesCss/LandingPage.css"
import ProductCard from '../components/ProductCard'
import { MdKeyboardArrowRight } from "react-icons/md";
import hero_section_image from '../assets/hero_section_image.avif'
import { useNavigate } from 'react-router-dom';

const MyLandingPage = () => {

  const navigate = useNavigate()

  return (
    <>
      <main className='landing_page_body'>
        <section className='hero_section_body'>
          <div className='hero_section_left_container'>
            <h1>Discover. Shop. Delight.</h1>
            <h3>Explore exclusive collections curated just for you. From everyday essentials to premium indulgences, find what you love all in one place.</h3>
            <button onClick={()=> navigate(`/product-category/Shop`)}>Shop now</button>
          </div>
          <div className='hero_section_right_container'>
            <img src={hero_section_image} alt=''/>
          </div>
        </section>
        <section className='landing_page_latest_collection_body'>
          <div className='landing_page_latest_collection_top_container'>
            <h3>LATEST COLLECTION</h3>
            <button>View All <MdKeyboardArrowRight size={20}/></button>
          </div>
          <div className='landing_page_latest_collection_bottom_container'>
            <ProductCard/>
          </div>
        </section>
        <section className='landing_page_new_arrivals_body'>
          <div className='landing_page_new_arrivals_top_container'>
            <h3>New Arrivals</h3>
            <button onClick={()=> navigate("/new-arrivals")}>View All <MdKeyboardArrowRight size={20}/></button>
          </div>
          <div className='landing_page_new_arrivals_bottom_container'>
            <ProductCard limit={4}/>
          </div>
        </section>
        <section className='landing_page_special_offer_body'>
          <p>SPECIAL OFFER</p>
          <h2>Up to 30% OFF</h2>
          <button onClick={()=> navigate(`/product-category/Shop`)}>SHOP NOW</button>
        </section>
      </main>
    </>
  )
}

export default MyLandingPage