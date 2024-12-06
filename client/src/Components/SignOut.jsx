import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../Context/UserContext';

const SignOut = () => {
    const { setUser } = useContext(UserContext); // Get setUser from UserContext
    const navigate = useNavigate(); // Hook to navigate programmatically

    const handleClick = () => {
        setUser(null); // Clear the user context
        navigate('/login'); // Navigate to the login page
    }
    return (
        <div>
            <div onClick={handleClick} style={signOutStyle}>
                <h3>Sign Out  </h3>
            </div>
        </div>
    );
};

// Styling for the SignOut component
const signOutStyle = {
    padding: '20px',
    margin: '10px',
    backgroundColor: '#C2C5CC',
    height: '20px',
    width: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
};

export default SignOut;