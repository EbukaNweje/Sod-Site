import React from 'react'
import '../pagesCss/newArrivals.css'
import ProductCard from '../../components/ProductCard'

const Allproduct = () => {
  return (
    <main className='new_arrivals_body'>
    <section className='new_arrivals_hero_section'>
      <h1>Your products</h1>
      <p>See all that you've uploaded</p>
    </section>
    <section className='new_arrivals_items_container'>
      <ProductCard/>
    </section>
</main>
  )
}

export default Allproduct