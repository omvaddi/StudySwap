import React from 'react'
import { useNavigate } from 'react-router-dom'
import AddClass from './AddClass';

const CourseBlock = ({ courseName, courseId }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if(location.pathname === '/home') {
            navigate(`/courses/${courseId}`);
        }
    };

    return (
        <div className="course-block" onClick={handleClick} style={blockStyle}>
            <h2>{`${courseName} (${courseId})`}</h2>
            {(location.pathname === '/upload') && <AddClass code={courseId} />}
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
        height: '200px'
    };

export default CourseBlock;