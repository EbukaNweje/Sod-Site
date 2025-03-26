import React from "react";
import './Admin/AdminCss/Adminland.css'
import { useSelector } from "react-redux";
import UserDashHead from "./UserDashHead";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { LiaCcApplePay, LiaCcDiscover, LiaCcMastercard, LiaCcVisa } from "react-icons/lia";

const User = () => {
  // const user = useSelector((state) => state?.id);

  return (
    <div className='Adminland'>
      <Header/>
      <aside><UserDashHead/></aside>
      <main><Outlet/></main>

       <div className='footer_bottom_end'>
                  <p>© 2024 Sod Orginal. Powered by Sod Orginal</p>
                  <span>
                    <LiaCcVisa/>
                    <LiaCcMastercard/>
                    <LiaCcDiscover/>
                    <LiaCcApplePay/>
                  </span>
                </div>
      </div>
      
  )
};

export default User;
