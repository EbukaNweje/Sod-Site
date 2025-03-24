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
import { GiTopHat } from 'react-icons/gi';
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux'
import { signOut, UserId } from './global/features';
import axios from 'axios';
import { useCallback } from 'react';
import { MdPayment } from "react-icons/md";


const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const id = useSelector((state) => state?.id);
    const userData = useSelector((state) => state?.User);

    // console.log("this is id", {user})

    const [drop, setDrop] = useState(false)
    const [search, setSearch] = useState(false)
    const [changeScale, setChangeScale] = useState(false)
    const [showAccountListing, setShowAccountListing] = useState(false)
    const [cart, setCart] = useState()

    const ShowDrop = () => {
        setDrop(!drop)
    }
    const ShowSearchInput = () => {
        setSearch(!search)
    } 

    const cartUrl = "https://sod-back-end.vercel.app/api/getCart"

    const getuserCartitem = ()=>{
        axios.get(cartUrl,{
            headers: {
                Authorization: `header ${userData.token}`
            }
        })
        .then(res => {
            // console.log(res)
            setCart(res?.data?.cart)
        })
        .catch(err => {
            console.log(err)
        })
        
    }

    useEffect(()=>{
        getuserCartitem()
    },[cart])
   
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

    const logOut = () => {
        dispatch(signOut())
        navigate("/")
    }

    const [userdata, setUserdata] = useState()
    const url = `https://sod-back-end.vercel.app/api/`;

    const getUserInfo = useCallback(async () => {
        if (!id) return; 
        try {
            const res = await axios.get(`${`${url}oneuserdata/${id}`}`);
            setUserdata(res?.data?.data);
        } catch (error) {
            console.log(error);
        }
    }, [id]); 

    const [category, setCategory] = useState()

    const getAllCategory = async() => {
        try{
            
            const res = await axios.get(`${`${url}getallcartegory`}`)
            setCategory(res.data.data)

        }catch(err) {
            console.log(err)
        }
    }


    useEffect(() => {
        getAllCategory()
            // if (user.id) {
                getUserInfo();
            // }
    }, []); 

   

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
                            {
                                category.map((props)=>( 
                                <Link to = {`/product-category/${props.categoryName}`} className='dropList_link'>{props.categoryName}</Link>
                                ))
                            }
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
                <img src={SodLogo} alt="Sod Orginal" onClick={()=> navigate(`${id ? `/${userdata.username}` : "/"}`)}/>
            </div>
            <div className='cartContainer'>
                <div className='AmountContainer'>
                    <div className='Naira'>{id ? userdata?.balance : "0.00"}<TbCurrencyNaira/></div>
                    <div className='dollar'>{id ? userdata?.balance : "0.00"}<FaDollarSign/></div>
                </div>

                <div className='CartBag' onClick={()=> navigate("/cart")}>
                    <IoCart className='myCartIcon'/>
                    <div className='CartBagNum'>
                        {id ? cart?.length : "0"}
                    </div>
                </div>

                <div className='UserIcon'>
                    <FaUser style={{cursor: "pointer"}} onClick={()=>setShowAccountListing(!showAccountListing)}/>
                    {
                        showAccountListing == true ?

                            <div className='account_listing_container'>
                                {
                                    id ?  null : <div className='header_signin_btn'><button onClick={()=>navigate("/login")}>Sign In</button></div>
                                }
                               
                               {
                                id ?   <div className='account_listing_link'>
                                {/* <FaRegUser size={16}/> */}
                                <p 
                                style={{
                                    marginLeft: '20px'
                                }}
                                >Hello {userdata?.username}</p>
                            </div> : null
                               }
                               {

                               }
                             {
                                id?    <div className='account_listing_link'>
                                <FaRegUser size={16}/>
                                <p  onClick={()=>navigate('admin-login')}>My Account</p>
                             {/* {
                                id?.isLoggedIn ? <p onClick={()=> navigate(`/adminpage`)}> Back to dashboard </p> :
                                <p  onClick={()=>navigate('admin-login')}>My Account</p>
                             } */}
                            </div>: null
                             }
                                  
                                <div onClick={()=>navigate('history')} className='account_listing_link'>
                                    <BsShopWindow size={16}/>
                                    <p>History</p>
                                </div>
                                {
                                    id ? <div className='account_listing_link'>
                                    <p style={{
                                        color: "red",
                                        marginLeft: '20px'
                                    }} onClick={logOut}>Log out</p>
                                </div> : null
                                }
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