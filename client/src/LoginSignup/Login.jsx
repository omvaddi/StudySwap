import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './LoginSignup.css'
import { useNavigate } from 'react-router-dom';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';


function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/login', {email, password})
            .then(result => {
                console.log(result);
                if(result.data === "Success"){
                    navigate('/home');
                }
                
            })
        .catch(err => console.log(err));
    };


    return(
        <div className='container'>
            <div className="header">
                <div className="text">Login</div>
                <div className="underline"></div>
            </div>
            <form onSubmit={handleLogin} div className="inputs">
                <div className="input">
                    <img src={email_icon} alt="" />
                    <input 
                        type="email" 
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input 
                        type="password" 
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="already-have">
                    Don't Have an account? <span><Link to="/signup">Click Here!</Link></span>
                </div>
                <button type = "submit" className="submit-container submit">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;