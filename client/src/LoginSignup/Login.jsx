import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

import './LoginSignup.css';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';


function Login() {
    const { setUser } = useContext(UserContext); // Get setUser from UserContext
    
    const [email, setEmail] = useState(); // State to store the email
    const [password, setPassword] = useState(); // State to store the password
    const [errorMessage, setErrorMessage] = useState(); // State to store the error message
    const navigate = useNavigate(); // Hook to navigate programmatically

    const handleLogin = (e) => {
        e.preventDefault(); // Prevent the default form submission
        axios.post('http://localhost:3001/login', { email, password })
            .then(result => {
                console.log(result);
                if (result.data.message === "Success"){
                    console.log(result.data.user);
                    setUser(result.data.user); // Set the user context
                    navigate('/home'); // Navigate to the home page
                }
                else {
                    setErrorMessage(result.data.message); // Set error message
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='container'>
            <div className="header">
                <div className="text">Login</div>
                <div className="underline"></div>
            </div>
            <form onSubmit={handleLogin} className="inputs">
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
                {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message if it exists */}
                <div className="already-have">
                    Don't Have an account? <span><Link to="/signup">Click Here!</Link></span> {/* Link to the signup page */}
                </div>
                {/* Button to submit the form */}
                <button type = "submit" className="submit-container submit"> 
                    Login 
                </button>
            </form>
        </div>
    );
}

export default Login;