import React, { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import axios from 'axios'; 

const RemoveClass = ({ code }) => {
    const { user, setUser } = useContext(UserContext); // Get user and setUser from UserContext

    const handleClick = () => {
        // Remove the class code from the user's classes
        const updatedClasses = user.classes.filter((classCode) => classCode !== code);
        const updatedUser = { ...user, classes: updatedClasses };

        setUser(updatedUser); // Update the user context with the new class list

        // Send a PUT request to update the user's classes in the backend
        axios.put(`http://localhost:3001/api/user/${user._id}`, { classes: updatedClasses })
            .then(response => {
                console.log('Class removed successfully');
            })
            .catch(error => {
                console.error('Error removing class:', error);
                setUser(user); // Revert the user context if the request fails
            });
    };

    return (
        <div onClick={handleClick} style={removeClassStyle}>
            <h3>Remove Class</h3>
        </div>
    );
};

// Styling for the RemoveClass component
const removeClassStyle = {
    padding: '20px',
    margin: '10px',
    backgroundColor: '#FA8072',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
};

export default RemoveClass;