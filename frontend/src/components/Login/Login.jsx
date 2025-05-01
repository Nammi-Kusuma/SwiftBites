import React, { useContext, useState } from 'react'
import './Login.css'
import { assets } from '../../assets/assets';
import { ContextStorage } from '../../context/ContextStorage';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = ({ setShowLogin }) => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { url, setToken } = useContext(ContextStorage)
    const [currState, setCurrState] = useState("Sign Up");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [forgotPass, setForgotPass] = useState(false)

    const onChangaHandler = (event) => {
        const name = event.target.name
        const value = event.target.value

        setData(data => ({ ...data, [name]: value }))
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        try {
            let newUrl = url;
            if (forgotPass) {
                newUrl += "/user/forgot-password";
            } else if (currState === "Login") {
                newUrl += "/user/login";
            } else {
                newUrl += "/user/register";
            }

            const response = await axios.post(newUrl, data);

            if (response.data.success) {
                if (forgotPass) {
                    toast.success(response.data.message); 
                    setShowLogin(false);
                    navigate('/');
                } else {
                    setToken(response.data.token);
                    localStorage.setItem("token", response.data.token);
                    setShowLogin(false);
                    toast.success(response.data.message);
                    navigate('/');
                }
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false); 
        }
    }

    return (
        <div className='login'>
            <form onSubmit={onSubmit} className="login-container">
                <div className="login-title">
                    <h2>{forgotPass ? "Forgot Password" : currState}</h2>
                    <img src={assets.cross_icon} onClick={() => { setShowLogin(false) }} alt="" />
                </div>
                <div className="login-inputs">
                    {currState === "Login" ? <></> : <input type="text" name='name' onChange={onChangaHandler} value={data.name} placeholder='Enter username' required />}

                    <input type="email" name='email' onChange={onChangaHandler} value={data.email} placeholder='Enter email' required />
                    {!forgotPass ? <input type="password" name='password' onChange={onChangaHandler} value={data.password} placeholder='Enter password' required /> : <></>}
                </div>

                {currState === "Login" ?
                    (!forgotPass ?
                        <p onClick={() => { setForgotPass(true) }} className='forgot-password'>Forgot Password?</p> : <></>)
                    : <div className="login-condition">
                        <input type="checkbox" required />
                        <p>By continuing, I agree to the terms of use & privacy policy.</p>
                    </div>}
                <button type='submit' disabled={isSubmitting} className={`${isSubmitting ? "submit" : ""}`}>
                    {isSubmitting ? "Submitting..." : currState === "Login" ? (forgotPass ? "Send Link" : "Login") : "Create account"}
                </button>


                {currState === "Login" ? <p>Create a new account? <span onClick={() => { setCurrState("Sign Up"); setForgotPass(false) }}>Click here!</span></p> : <p>Already have an account? <span onClick={() => { setCurrState("Login"); setForgotPass(false) }}>Login here!</span></p>}
            </form>
        </div>
    )
}

export default Login