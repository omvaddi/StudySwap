import React from 'react'
import { useNavigate } from 'react-router-dom'

const CourseBlock = ({ courseName, courseId }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/courses/${courseId}`);
    };

    return (
        <div className="course-block" onClick={handleClick} style={blockStyle}>
            <h2>{`${courseName} (${courseId})`}</h2>
        </div>
    );
};

    const blockStyle = {
        padding: '20px',
        margin: '10px',
        backgroundColor: '#f0f0f0',
        cursor: 'pointer',
        borderRadius: '15px',
        textAlign: 'center',
        width: '1500px',
        height: '200px'
    };

export default CourseBlock;