import React from 'react'
import "./pagesCss/mainLanding.css"
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const MainLanding = () => {
  return (
    <>
      <div className='main_landing_body'>
        <Header/>
        <Outlet/>
        <Footer/>
      </div>
    </>
  )
}

export default MainLanding
