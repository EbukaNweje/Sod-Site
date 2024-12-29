import React from 'react'
import './pagesCss/newArrivals.css'
import ProductCard from '../components/ProductCard'

const NewArrivals = () => {
  return (
    <>
        <main className='new_arrivals_body'>
            <section className='new_arrivals_hero_section'>
              <h1>New Arrivals</h1>
              <p>Discover the New Arrivals  Sod orginals at Sod orginals</p>
            </section>
            <section className='new_arrivals_items_container'>
              <ProductCard/>
            </section>
        </main>
    </>
  )
}

export default NewArrivals
