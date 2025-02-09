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

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [values, setValues] = useState({
        email : '',
        password : ''
    })
  const [isdisabled, setIsdisabled]=useState(true)


    const [myerror, setMyError] = useState({err: false, 
        EmailError : '',
        passwordError : ''
      })
    const [loading, setLoading] = useState(false)
    const [isFocused, setIsFocused] = useState(false)


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
      if(values.email.trim() === "" 
      || values.password.trim() === "") {
        setIsdisabled(true)
      }else {
        setIsdisabled(false)
      }
    },[values])


    const url = "https://sod-back-end.vercel.app/api/login"

    async function submitLogin (e) {
      e.preventDefault();
      setLoading(true)
        // console.log(values)
      try{
        const res = await axios.post(url, values)
        toast.success(res.data.message)
        dispatch(UserId(res?.data?.data?._id))
        navigate(`/${res?.data?.data?.username}`)
        // console.log(res)
  
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
            <form onSubmit={submitLogin} className='onboarding_item_container'>
                <div className='onboarding_item_top'>
                    <div className='onboarding_logo_container' onClick={()=>navigate("/")}>
                        <img src={sodlogo_white} alt='logo'/>
                    </div>
                    <h3>Welcome back!</h3>
                    <p>Log back into your Jumia account.</p>
                </div>
                <div className='onboarding_item_inputs_container'>
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
                >{loading == true ? "loading..." : "Login"}</button>
                <p className='onboarding_item_link'>Don't have an account? <span onClick={()=>navigate("/register")}>Signup</span></p>
            </form>
        </div>
    </>
  )
}

export default Login