import React, { useContext } from 'react'
import { UserContext } from '../Context/UserContext';
import axios from 'axios'; 

const AddClass = ({code}) => {
    const { user, setUser } = useContext(UserContext);

    const handleClick = () => {
        const updatedClasses = [...user.classes, code];
        const updatedUser = { ...user, classes: updatedClasses };

        setUser(updatedUser);

        axios.put(`http://localhost:3001/api/user/${user._id}`, { classes: updatedClasses })
            .then(response => {
                console.log('Class added successfully');
            })
            .catch(error => {
                console.error('Error adding class:', error);
                setUser(user);
            });
    };

    return (
        <div onClick={handleClick} style={addClassStyle}>
            <h3>Add Class</h3>
        </div>
    );
};

const addClassStyle = {
    padding: '20px',
    margin: '10px',
    backgroundColor: '#98FB98',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

export default AddClass;