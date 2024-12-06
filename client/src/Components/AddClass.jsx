import React, { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import axios from 'axios'; 

const AddClass = ({ code }) => {
    const { user, setUser } = useContext(UserContext); // Get user and setUser from UserContext

    const handleClick = () => {
        // Add the new class code to the user's classes
        const updatedClasses = [...user.classes, code];
        const updatedUser = { ...user, classes: updatedClasses };

        setUser(updatedUser); // Update the user context with the new class

        // Send a PUT request to update the user's classes in the backend
        axios.put(`http://localhost:3001/api/user/${user._id}`, { classes: updatedClasses })
            .then(response => {
                console.log('Class added successfully');
            })
            .catch(error => {
                console.error('Error adding class:', error);
                setUser(user); // Revert the user context if the request fails
            });
    };

    return (
        <div onClick={handleClick} style={addClassStyle}>
            <h3>Add Class</h3>
        </div>
    );
};

// Styling for the AddClass component
const addClassStyle = {
    padding: '20px',
    margin: '10px',
    backgroundColor: '#98FB98',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
};

export default AddClass;