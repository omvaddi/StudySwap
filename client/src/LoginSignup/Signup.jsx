import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginSignup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

function Signup() {
    const [name, setName] = useState(); // State to store the name
    const [email, setEmail] = useState(); // State to store the email
    const [password, setPassword] = useState(); // State to store the password
    const navigate = useNavigate(); // Hook to navigate programmatically

    const handleSignup = (e) => {
        e.preventDefault(); // Prevent the default form submission
        axios.post('http://localhost:3001/register', {name, email, password, friends: [], dateCreated: new Date()})
            .then(result => {
                console.log(result);
                navigate('/login'); // Navigate to the login page
            })
        .catch(err => console.log(err));
    };

    return (
        <div className='container'>
            <div className="header">
                <div className="text">Signup</div>
                <div className="underline"></div>
            </div>
            <form onSubmit={handleSignup} className="inputs">
                <div className="input">
                    <img src={user_icon} alt="" />
                    <input 
                        type="text" 
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)} // Update the name state
                    />    
                </div>
                <div className="input">
                    <img src={email_icon} alt="" />
                    <input 
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)} // Update the email state
                    /> 
                </div>
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input 
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)} // Update the password state
                    /> 
                </div>
                <button type="submit">Signup</button> {/* Button to submit the form */}
                <div className="already-have">
                    Already have an account? <span><Link to="/login">Login here</Link></span> {/* Link to the login page */}
                </div>
            </form>
        </div>
    );
}

export default Signup; 