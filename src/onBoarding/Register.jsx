import React, { useState } from 'react'
import './onboarding.css'
import sodlogo_white from '../assets/sodlogo-white.jpg'
import { useNavigate } from 'react-router-dom';
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

const Register = () => {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [values, setValues] = useState({
      userName : '',
      fullName : '',
      email : '',
      password : ''
    })
    const [loading, setLoading] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    const handleChange = (e)=>{
      const {name, value} = e.target
      setValues({...values, [name]: value})
    }

  return (
    <>
      <div className='onboarding_body'>
        <form className='onboarding_item_container'>
          <div className='onboarding_item_top'>
            <div className='onboarding_logo_container' onClick={()=>navigate("/")}>
              <img src={sodlogo_white} alt='logo'/>
            </div>
            <h3>Welcome to Sod Orginal</h3>
            <p>Log back into your Jumia account.</p>
          </div>
          <div className='onboarding_item_inputs_container'>
            <div className='onboarding_input'>
              <input
                type="text"
                id="userName"
                placeholder=" "
                name = 'userName'
                value={values.userName}
                onChange={handleChange}
              />
              <label htmlFor="userName">User name</label>
            </div>
            <div className='onboarding_input'>
              <input
                type="text"
                id="fullName"
                placeholder=" "
                name = 'fullName'
                value={values.fullName}
                onChange={handleChange}
              />
              <label htmlFor="fullName">Full name</label>
            </div>
            <div className='onboarding_input'>
              <input
                type="email"
                id="email"
                placeholder=" "
                name = 'email'
                value={values.email}
                onChange={handleChange}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className='onboarding_password_input' style={isFocused == true ? {borderColor: "#007BFF"} : {borderColor: "lightgrey"} }>
              <div className='onboarding_password_left_input'>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder=" "
                  name = 'password'
                  value={values.password}
                  onChange={handleChange}
                  onFocus={() => setIsFocused(true)}
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className='eye_password_icon'>
                {
                  showPassword ? 
                  <IoEyeOff onClick={()=>setShowPassword(false)}/> : 
                  <IoEye onClick={()=>setShowPassword(true)}/>
                }
              </div>
            </div>
          </div>
          <button className='onboarding_item_button'>Sign Up</button>
          <p className='onboarding_item_link'>Already have an account? <span onClick={()=>navigate("/login")}>Login</span></p>
        </form>
      </div>
    </>
  )
}

export default Register