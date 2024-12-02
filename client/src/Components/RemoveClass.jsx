import React, { useContext } from 'react'
import { UserContext } from '../Context/UserContext';
import axios from 'axios'; 

const RemoveClass = ({code}) => {
    const { user, setUser } = useContext(UserContext);

    const handleClick = () => {
        const updatedClasses = user.classes.filter((classCode) => classCode !== code);
        const updatedUser = { ...user, classes: updatedClasses };

        setUser(updatedUser);

        axios.put(`http://localhost:3001/api/user/${user._id}`, { classes: updatedClasses })
            .then(response => {
                console.log('Class removed successfully');
            })
            .catch(error => {
                console.error('Error adding class:', error);
                setUser(user);
            });
    };

    return (
        <div onClick={handleClick} style={removeClassStyle}>
            <h3>Remove Class</h3>
        </div>
    );
};

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