import React from 'react'
import './LoginSignup.css'

import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';


function Signup() {
    
    return(
        <div className='container'>
            <div className="header">
                <div className="text">Signup</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={user_icon} alt="" />
                    <input type="text" placeholder="Name"/>
                </div>
                <div className="input">
                    <img src={email_icon} alt="" />
                    <input type="email" placeholder="Email"/>
                </div>
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder="Password"/>
                </div>
                <div className="submit-container">
                    <div className="submit">Signup</div>
                </div>
            </div>
        </div>
    );
}

export default Signup;