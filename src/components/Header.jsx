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
import { Link } from 'react-router-dom';

const Header = () => {
    const [drop, setDrop] = useState(false)
    const [search, setSearch] = useState(false)
    const [changeScale, setChangeScale] = useState(false)

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
                    <li>New Arrivals</li>
                    <li>Collections</li>
                    
                    { drop ? 
                        <div className='DropList' onMouseLeave={ShowDrop} >
                            <Link className='dropList_link'>Clothing</Link>
                            <Link className='dropList_link'>Denim</Link>
                            <Link className='dropList_link'>Shirts</Link>
                            <Link className='dropList_link'>Caps</Link>
                            <Link className='dropList_link'>Pants</Link>
                            <Link className='dropList_link'>Hoodies</Link>
                            <Link className='dropList_link'>Slides</Link>
                            <Link className='dropList_link'>Men</Link>
                            <Link className='dropList_link'>Women</Link>
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
            }}>
                <img src={SodLogo} alt="Sod Orginal" />
            </div>
            <div className='cartContainer'>
                <div className='AmountContainer'>
                    <div className='Naira'>0.00<TbCurrencyNaira/></div>
                    <div className='dollar'>0.00<FaDollarSign/></div>
                </div>

                <div className='CartBag'>
                    <IoCart className='myCartIcon'/>
                    <div className='CartBagNum'>0</div>
                </div>

                <div className='UserIcon'>
                        <FaUser/>
                </div>
            </div>
        </article>
    </main>
  )
}

export default Header