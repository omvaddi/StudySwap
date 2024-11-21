import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../Context/UserContext';

const SignOut = () => {
    const { setUser } = useContext(UserContext)
    const navigate = useNavigate();

    const handleClick = () => {
        setUser(null);
        navigate('/login');
    }
    return (
        <div>
            <div onClick={handleClick} style={signOutStyle}>
                <h3>Sign Out  </h3>
            </div>
        </div>
    );
};

const signOutStyle = {
    padding: '20px',
    margin: '10px',
    backgroundColor: '#C2C5CC',
    height: '20px',
    width: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

export default SignOut;