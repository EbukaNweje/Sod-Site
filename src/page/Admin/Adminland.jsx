import React from 'react'
import { Outlet } from 'react-router-dom'
import './AdminCss/Adminland.css'
import Sidebar from './Sidebar'
import Header from '../../components/Header'
import { LiaCcVisa } from "react-icons/lia";
import { LiaCcDiscover } from "react-icons/lia";
import { LiaCcApplePay } from "react-icons/lia";
import { LiaCcMastercard } from "react-icons/lia";

const Adminland = () => {
  return (
    <div className='Adminland'>
      <Header/>
      <aside><Sidebar/></aside>
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
}
export default Adminland