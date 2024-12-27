import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLanding from './page/MainLanding'
import MyLandingPage from './page/MyLandingPage'
import NewArrivals from './page/NewArrivals'
import ScrollToTop from './ScrollToTop'
import Product from './page/Product'
import ProductCategory from './page/ProductCategory'



const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        <Route element={<MainLanding/>}>
          <Route path='/' element={<MyLandingPage/>}/>
          <Route path='/new-arrivals' element={<NewArrivals/>}/>
          <Route path='/product/:id' element={<Product/>}/>
          <Route path='/product-category' element={<ProductCategory/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App