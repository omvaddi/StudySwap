import React from 'react'
import './LoginSignup.css'
<<<<<<< HEAD:client/src/LoginSignup/Login.jsx
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
=======

import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';


>>>>>>> ba54a334b4f2aa65faece0a71055b94196d7f1c8:client/src/Components/LoginSignup/Login.jsx
function Login() {
    return(
        <div className='container'>
            <div className="header">
                <div className="text">Login</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={email_icon} alt="" />
                    <input type="email" placeholder="Email"/>
                </div>
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder="Password"/>
                </div>
                <div className="Register">
                    Don't Have an account? <span>Click Here!</span></div>
                <div className="submit-container">
                    <div className="submit">Login</div>
                </div>
            </div>
        </div>
    );
}
<<<<<<< HEAD:client/src/LoginSignup/Login.jsx
=======

>>>>>>> ba54a334b4f2aa65faece0a71055b94196d7f1c8:client/src/Components/LoginSignup/Login.jsx
export default Login;