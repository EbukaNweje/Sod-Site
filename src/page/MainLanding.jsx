import React, { useEffect, useState } from 'react'
import "./pagesCss/mainLanding.css"
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import mainsodLogo from "../assets/mainsodLogo.jpeg"

const MainLanding = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  
  return (
    <>
      {
        loading ? (
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
          }}>
            <img src={mainsodLogo} alt="loader"  
            style={{
              width: "200px",
              height: "200px"
            }}
            />
          </div>
        ) : (
          <>
            <Header />
            <Outlet />
            <Footer />
          </>
        )
      }
    </>
  )
}

export default MainLanding
