import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLanding from './page/MainLanding'
import MyLandingPage from './page/MyLandingPage'



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLanding/>}>
          <Route path='/' element={<MyLandingPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App