import React, { useEffect, useState } from 'react'
import './onboarding.css'
import sodlogo_white from '../assets/sodlogo-white.jpg'
import { useNavigate } from 'react-router-dom';
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import axios from 'axios';
import { toast } from 'react-toastify';
import {useDispatch} from 'react-redux'
import { UserId } from '../components/global/features';

const Register = () => {
const dispatch = useDispatch()
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isdisabled, setIsdisabled]=useState(true)
  const [values, setValues] = useState({
    username: '',
    fullName : '',
    email : '',
    password : ''
  })
  const [loading, setLoading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [myerror, setMyError] = useState({err: false, 
    userNameError: '',
    fullNameError : '',
    EmailError : '',
    passwordError : ''
  })
  console.log(myerror)

  const handleChangeUserName = (e)=>{
      const newUserName = e.target.value
      setValues({...values, username: newUserName})
      
      if(newUserName.trim() === ""){
        setMyError({...myerror, err:true, userNameError:"Enter your username"})
      
      }else{
        setMyError({...myerror, err: false, userNameError: ""})
      }
  }

  const handleChangeFullname = (e)=>{
      const newFullname = e.target.value
      setValues({...values, fullName: newFullname})
      
      if(newFullname.trim() === ""){
        setMyError({...myerror, err:true, fullNameError:"Enter your Fullname"})
      }else{
        setMyError({...myerror, err: false, fullNameError: ""})
      }
  }

  const handleChangePassword = (e)=>{
      const newPassword = e.target.value
      setValues({...values, password: newPassword})
      
      if(newPassword.trim() === ""){
        setMyError({...myerror, err:true, passwordError:"Enter your PassWord"})
      }else{
        setMyError({...myerror, err: false, passwordError: ""})
      }
  }

  const validateEmail = (input) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };
  

  const handleChangeEmail = (e)=>{
      const newEmail= e.target.value
      setValues({...values, email: newEmail})
      
      if(newEmail.trim()=== ""){
        setMyError({...myerror, err:true, EmailError:"Enter your Email Address"})
      } else if(!validateEmail(newEmail)){
        setMyError({...myerror, err:true, EmailError: "Invalid email format"}) 
      }
      else{
        setMyError({...myerror, err: false, EmailError: ""})
      }
  }

  useEffect(()=>{
    if(values.username.trim() === "" || 
    values.fullName.trim() === "" 
    || values.email.trim() === "" 
    || values.password.trim() === "") {
      setIsdisabled(true)
    }else {
      setIsdisabled(false)
    }
  },[values])



// console.log(values);

  const url = "https://sod-back-end.vercel.app/api/register"

  async function submitRegister (e) {
    e.preventDefault();
    setLoading(true)

    try{
      const res = await axios.post(url, values)
      toast.success(res.data.message)
      dispatch(UserId(res?.data?.data?._id))
      navigate(`/${res?.data?.data?.username}`)


      console.log(res)

    }catch(error){
      console.log(error)
      setLoading(false)
      if(error.message == "Network Error"){
        console.log("oops! Network error")
        toast.error("oops! Network error")
      }else{
        toast.error(error.response.data)
      }
      setLoading(false)
    }
  
  }

  return (
    <>
      <div className='onboarding_body'>
        <form onSubmit={submitRegister} className='onboarding_item_container'>
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
                name = 'username'
                value={values.username}
                onChange={handleChangeUserName}
              />
              <label htmlFor="userName">Username</label>
              <small style={{
                color: "red",
                fontSize:" 12px"
              }}>{myerror.userNameError}</small>
            </div>
            <div className='onboarding_input'>
              <input
                type="text"
                id="fullName"
                placeholder=" "
                name = 'fullName'
                value={values.fullName}
                onChange={handleChangeFullname}
              />
              <label htmlFor="fullName">Full name</label>
              <small style={{
                color: "red",
                fontSize:" 12px"
              }}> {myerror.fullNameError}</small>
            </div>
            <div className='onboarding_input'>
              <input
                type="email"
                id="email"
                placeholder=" "
                name = 'email'
                value={values.email}
                onChange={handleChangeEmail}
              />
              <label htmlFor="email">Email</label>
              <small style={{
                color: "red",
                fontSize:" 12px"
              }}> {myerror.EmailError}</small>
            </div>
            <div className='onboarding_password_input' style={isFocused == true ? {borderColor: "#007BFF"} : {borderColor: "lightgrey"} }>
              <div className='onboarding_password_left_input'>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder=" "
                  name = 'password'
                  value={values.password}
                  onChange={handleChangePassword}
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
                <small style={{
                  // marginTop: "px",
                  color: "red",
                  fontSize:" 12px"
                }}>
                {myerror.passwordError}
                </small>
          </div>
          <button type='submit' className='onboarding_item_button' 
            disabled={isdisabled}
            style={{
              background: isdisabled ? "lightgray" : "black"
            }}
          >{loading ? "loading..." : "Sign Up"}</button>
          <p className='onboarding_item_link'>Already have an account? <span onClick={()=>navigate("/login")}>Login</span></p>
        </form>
      </div>
    </>
  )
}

export default Register