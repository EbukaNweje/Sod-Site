import React from 'react'
import "./pagesCss/LandingPage.css"
import ProductCard from '../components/ProductCard'
import { MdKeyboardArrowRight } from "react-icons/md";

const MyLandingPage = () => {
  return (
    <>
      <main className='landing_page_body'>
        <section className='hero_section_body'></section>
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
            <button>View All <MdKeyboardArrowRight size={20}/></button>
          </div>
          <div className='landing_page_new_arrivals_bottom_container'>
            <ProductCard limit={4}/>
          </div>
        </section>
        <section className='landing_page_special_offer_body'>
          <p>SPECIAL OFFER</p>
          <h2>Up to 30% OFF</h2>
          <button>SHOP NOW</button>
        </section>
      </main>
    </>
  )
}

export default MyLandingPage