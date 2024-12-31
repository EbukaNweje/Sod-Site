import React, { useEffect, useState } from 'react'
import "./componentCss/Header.css"
import TopHeader from './TopHeader'
import { IoSearch,IoMenu } from "react-icons/io5";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { IoCart } from "react-icons/io5";
import { TbCurrencyNaira } from "react-icons/tb";
import { FaDollarSign } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import 'animate.css';
import SodLogo from "../assets/sodlogo.png"
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa6";
import { BsShopWindow } from "react-icons/bs";

const Header = () => {

    const navigate = useNavigate()

    const [drop, setDrop] = useState(false)
    const [search, setSearch] = useState(false)
    const [changeScale, setChangeScale] = useState(false)
    const [showAccountListing, setShowAccountListing] = useState(false)

    const ShowDrop = () => {
        setDrop(!drop)
    }
    const ShowSearchInput = () => {
        setSearch(!search)
    }

   
    useEffect(()=>{
        const interval = setTimeout(() => {
            setChangeScale(true);  
        }, 2000);

        const timeout = setTimeout(() => {
            setChangeScale(false); 
        }, 3000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        }
    }, [changeScale])



  return (
    <main className='MainBody'>
        <TopHeader/>
        <article className='HeaderWrapper'>
            <div className='NavsContainer'>
                <div className='MobileToggle'><IoMenu/></div>

                <div className='Search' onClick={ShowSearchInput}><IoSearch/></div>
               {
                !search ? 
                <nav>
                    <ul>
                    <li onMouseEnter={ShowDrop}>Shop By Category {drop ? <IoMdArrowDropdown/> : <IoMdArrowDropup/>} </li>
                    <li onClick={()=> navigate("/new-arrivals")}>New Arrivals</li>
                    <li>Collections</li>
                    
                    { drop ? 
                        <div className='DropList' onMouseLeave={ShowDrop} >
                            <Link to = {`/product-category/Clothing`} className='dropList_link'>Clothing</Link>
                            <Link to = {`/product-category/Denim`} className='dropList_link'>Denim</Link>
                            <Link to = {`/product-category/Shirts`} className='dropList_link'>Shirts</Link>
                            <Link to = {`/product-category/Caps`} className='dropList_link'>Caps</Link>
                            <Link to = {`/product-category/Pants`} className='dropList_link'>Pants</Link>
                            <Link to = {`/product-category/Hoodies`} className='dropList_link'>Hoodies</Link>
                            <Link to = {`/product-category/Slides`} className='dropList_link'>Slides</Link>
                            <Link to = {`/product-category/Men`} className='dropList_link'>Men</Link>
                            <Link to = {`/product-category/Women`} className='dropList_link'>Women</Link>
                        </div> 
                        : 
                        null
                    }
                 </ul>
                </nav> : null
               }
                
                {
                    search ? <input type="text" placeholder='Search Product....' className='SearchInput' /> : null
                }
            </div>
            <div className='SodLogo' style={{
                transform: changeScale ? "scale(1)" : "scale(1.2)",
                transition: 'transform 0.2s ease-in-out'
            }} onClick={()=> navigate("/")}>
                <img src={SodLogo} alt="Sod Orginal" />
            </div>
            <div className='cartContainer'>
                <div className='AmountContainer'>
                    <div className='Naira'>0.00<TbCurrencyNaira/></div>
                    <div className='dollar'>0.00<FaDollarSign/></div>
                </div>

                <div className='CartBag' onClick={()=> navigate("/cart")}>
                    <IoCart className='myCartIcon'/>
                    <div className='CartBagNum'>0</div>
                </div>

                <div className='UserIcon'>
                    <FaUser style={{cursor: "pointer"}} onClick={()=>setShowAccountListing(!showAccountListing)}/>
                    {
                        showAccountListing == true ?

                            <div className='account_listing_container'>
                                <div className='header_signin_btn'><button onClick={()=>navigate("/login")}>Sign In</button></div>
                                <div className='account_listing_link'>
                                    <FaRegUser size={16}/>
                                    <p>My Account</p>
                                </div>
                                <div className='account_listing_link'>
                                    <BsShopWindow size={16}/>
                                    <p>Orders</p>
                                </div>
                            </div>
                        : null
                    }
                </div>
            </div>
        </article>
        <div className='mobile_search_body'>
            <div className='mobile_search_container'>
                <div className='mobile_search_icon_container'>
                    <IoSearch/> 
                </div>
                <input
                    type='text'
                />
            </div>
        </div>
    </main>
  )
}

export default Header