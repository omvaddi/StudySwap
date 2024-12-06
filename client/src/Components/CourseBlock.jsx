import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AddClass from './AddClass';
import RemoveClass from './RemoveClass';

const CourseBlock = ({ courseName, courseId }) => {
    const navigate = useNavigate(); // Hook to navigate programmatically
    const location = useLocation(); // Hook to get the current location

    const handleClick = () => {
        navigate(`/courses/${courseId}`); // Navigate to the course details page
    };

    return (
        <div className="course-block" style={blockStyle}>
            <h2>{`${courseName} (${courseId})`}</h2>
            {/* Show AddClass component if the current path is '/find' */}
            {location.pathname === '/find' && <AddClass code={courseId} />}
            {/* Show RemoveClass component if the current path is '/home' */}
            {location.pathname === '/home' && <RemoveClass code={courseId} />}
            <div onClick={handleClick} style={viewClassStyle}>
                <h3>View Class</h3>
            </div>
        </div>
    );
};

// Styling for the CourseBlock component
const blockStyle = {
    padding: '20px',
    margin: '10px',
    backgroundColor: '#f0f0f0',
    borderRadius: '15px',
    textAlign: 'center',
    height: '200px'
};

// Styling for the View Class button
const viewClassStyle = {
    padding: '20px',
    margin: '10px',
    backgroundColor: '#C2C5CC',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
};

export default CourseBlock;