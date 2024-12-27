import React, { useState } from 'react'
import './pagesCss/productCategory.css'
import ProductCard from '../components/ProductCard'
import { useNavigate, useParams } from 'react-router-dom'
import product_category_shop from "../assets/product_category_shop.jpeg"
import clothing_category_hero_image from "../assets/clothing_category_hero_image.jpg"

const ProductCategory = () => {

    const navigate = useNavigate()
    const {category} = useParams()

    const [categories, SetCategories] = useState([
        { category: 'Accessories', no: '18' },
        { category: 'Bags', no: '18' },
        { category: 'Beanies', no: '18' },
        { category: 'Belts', no: '18' },
        { category: 'Caps', no: '18' },
        { category: 'Clothing', no: '18' },
        { category: 'Denim', no: '18' },
        { category: 'Footwear', no: '18' },
        { category: 'Hoodies', no: '18' },
        { category: 'Jackets', no: '18' },
        { category: 'Jersey', no: '18' },
        { category: 'Joggers', no: '18' },
        { category: 'Men', no: '18' },
        { category: 'Pants', no: '18' },
        { category: 'Shirts', no: '18' },
        { category: 'Shorts', no: '18' },
        { category: 'Socks', no: '18' },
        { category: 'Underwear', no: '18' },
        { category: 'Women', no: '18' },
    ])

    const backgroundImages = {
        Shop: product_category_shop,
        Accessories: clothing_category_hero_image,
        Bags: clothing_category_hero_image,
        Beanies: clothing_category_hero_image,
        Belts: clothing_category_hero_image,
        Caps: clothing_category_hero_image,
        Clothing: clothing_category_hero_image,
        Denim: clothing_category_hero_image,
        Footwear: clothing_category_hero_image,
        Hoodies: clothing_category_hero_image,
        Jackets: clothing_category_hero_image,
        Jersey: clothing_category_hero_image,
        Joggers: clothing_category_hero_image,
        Men: clothing_category_hero_image,
        Pants: clothing_category_hero_image,
        Shirts: clothing_category_hero_image,
        Shorts: clothing_category_hero_image,
        Socks: clothing_category_hero_image,
        Underwear: clothing_category_hero_image,
        Women: clothing_category_hero_image,
    };

    const heroBackgroundImage =
        backgroundImages[category];

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
                <section 
                    className='category_article_hero_section' 
                    style={{
                        backgroundImage: `linear-gradient(to right, #000000dd, #000000cd), url(${heroBackgroundImage})`,
                    }}
                >
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
