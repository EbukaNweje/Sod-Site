import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import MainLanding from './page/MainLanding'
import MyLandingPage from './page/MyLandingPage'
import NewArrivals from './page/NewArrivals'
import ScrollToTop from './ScrollToTop'
import Product from './page/Product'
import ProductCategory from './page/ProductCategory'
import Login from './onBoarding/Login'
import Register from './onBoarding/Register'
import Cart from './page/Cart'
import Checkout from './page/Checkout'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import History from './page/History'
import Adminlogin from './onBoarding/Adminlogin'
import Adminpage from './page/Admin/Adminpage'
import Adminland from './page/Admin/Adminland'
import AddProduct from './page/Admin/AddProduct'
import Allproduct from './page/Admin/Allproduct'
import Order from './page/Admin/Order'
import PrivateRoute from './components/PrivateRoute'
import UserPrivateRoute from './components/UserPrivateRoute'
import User from './page/User'
import Useracct from './page/Useracct'
import UserEdit from './page/UserEdit'
import FundWallet from './page/FundWallet'
import AdminEdit from './page/Admin/AdminEdit'


const App = () => {
  return (
    <>
      <ToastContainer />
      <HashRouter>
        <ScrollToTop/>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/admin-login' element={<Adminlogin/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route element={<MainLanding/>}>
            <Route path='/' element={<MyLandingPage/>}/>
            <Route path='/:username' element={<MyLandingPage/>}/>
            <Route path='/new-arrivals' element={<NewArrivals/>}/>
            <Route path='/product/:id' element={<Product/>}/>
            <Route path='/product-category/:category' element={<ProductCategory/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/history' element={<History/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            
          </Route>
        <Route element={<PrivateRoute/>}>
        <Route path='/adminpage' element={<Adminland />}>
          <Route index element={<Adminpage />} />
          <Route path="Admin-edit" element={<AdminEdit />} />  
          <Route path='add-product' element={<AddProduct/>} />
          <Route path='all-products' element={<Allproduct/>}/>
          <Route path='all-orders' element={<Order/>}/>
        </Route>
          </Route>
          <Route element={<UserPrivateRoute />}>
          <Route path="/user-dashboard" element={<User />}>
          <Route index element={<Useracct />} />
          <Route path="edit-profile" element={<UserEdit />} />  
          <Route path="fund-wallet" element={<FundWallet />} />  
        </Route>
        </Route>


        </Routes>
      </HashRouter>
    </>

  )
}

export default App