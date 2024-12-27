import React, { useState } from 'react'
import './pagesCss/productCategory.css'
import ProductCard from '../components/ProductCard'
import { useNavigate, useParams } from 'react-router-dom'

const ProductCategory = () => {

    const navigate = useNavigate()
    const {category} = useParams()

    const [categories, SetCategories] = useState([
        {
            category: 'Accessories',
            no: '18'
        },
        {
            category: 'Bags',
            no: '18'
        },
        {
            category: 'Beanies',
            no: '18'
        },
        {
            category: 'Belts',
            no: '18'
        },
        {
            category: 'Caps',
            no: '18'
        },
        {
            category: 'Clothing',
            no: '18'
        },
        {
            category: 'Denim',
            no: '18'
        },
        {
            category: 'Footwear',
            no: '18'
        },
        {
            category: 'Hoodies',
            no: '18'
        },
        {
            category: 'Jackets',
            no: '18'
        },
        {
            category: 'Jersey',
            no: '18'
        },
        {
            category: 'Joggers',
            no: '18'
        },
        {
            category: 'Men',
            no: '18'
        },
        {
            category: 'Pants',
            no: '18'
        },
        {
            category: 'Shirts',
            no: '18'
        },
        {
            category: 'Shorts',
            no: '18'
        },
        {
            category: 'Socks',
            no: '18'
        },
        {
            category: 'Underwear',
            no: '18'
        },
        {
            category: 'Women',
            no: '18'
        },
    ])

  return (
    <>
        <main className='product_category_body'>
            <aside className='product_category_aside'>
                <section className='aside_category_container'>
                    <h2>Categories</h2>
                    {
                        categories.map((item)=>(
                            <div className='aside_category_link' onClick={()=> navigate(`/product-category/${item.category}`)}>
                                <p>{item.category}</p>
                                <p>({item.no})</p>
                            </div>
                        ))
                    }
                </section>
            </aside>
            <article className='product_category_article'>
                <section className='category_article_hero_section'>
                    <h1>{category}</h1>
                </section>
                <section className='category_article_text_section'>
                    <p>Discover the latest trends and timeless pieces for every season.</p>
                </section>
                <section className='category_article_product_container'>
                    <ProductCard categoryCard="categoryCard"/>
                </section>
            </article>
        </main>
    </>
  )
}

export default ProductCategory
