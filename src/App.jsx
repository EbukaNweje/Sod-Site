import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLanding from './page/MainLanding'
import MyLandingPage from './page/MyLandingPage'
import NewArrivals from './page/NewArrivals'
import ScrollToTop from './ScrollToTop'
import Product from './page/Product'
import ProductCategory from './page/ProductCategory'
import Login from './onBoarding/Login'
import Register from './onBoarding/Register'
import Cart from './page/Cart'


const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route element={<MainLanding/>}>
          <Route path='/' element={<MyLandingPage/>}/>
          <Route path='/new-arrivals' element={<NewArrivals/>}/>
          <Route path='/product/:id' element={<Product/>}/>
          <Route path='/product-category/:category' element={<ProductCategory/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App